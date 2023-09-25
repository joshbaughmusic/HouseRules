using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using Microsoft.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public ChoreController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult GetAllChores()
    {
        return Ok(_dbContext.Chores.Include(c => c.ChoreCompletions).ToList());
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetChore(int id)
    {
        Chore chore = _dbContext.Chores
        .Include(c => c.ChoreCompletions)
        .ThenInclude(cc => cc.userProfile)
        .Include(c => c.ChoreAssignments)
        .ThenInclude(ca => ca.userProfile)
        .SingleOrDefault(c => c.Id == id);

        if (chore == null)
        {
            return NotFound();
        }

        return Ok(chore);
    }

    [HttpPost("{id}/complete")]
    // [Authorize]
    public IActionResult CompleteChore(int id, string userId)
    {
        Chore choreToComplete = _dbContext.Chores
        .SingleOrDefault(c => c.Id == id);

        if (choreToComplete == null)
        {
            return NotFound();
        }
        else if (int.Parse(userId) == null)
        {
            return BadRequest("Must include userId querey string");
        }
        ChoreCompletion completedChore = new ChoreCompletion {
            ChoreId = id,
            UserProfileId = int.Parse(userId),
            CompletedOn = DateTime.Now
        };

        _dbContext.ChoreCompletions.Add(completedChore);

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost]
    // [Authorize(Roles = "Admin")]
    public IActionResult NewChore(Chore incomingChore)
    {
        Chore choreToPost = new Chore()
        {
            Name = incomingChore.Name,
            Difficulty = incomingChore.Difficulty,
            ChoreFrequencyDays = incomingChore.ChoreFrequencyDays
        };

        _dbContext.Chores.Add(choreToPost);

        _dbContext.SaveChanges();

        return Created($"/api/chores/{choreToPost.Id}", choreToPost);
    }

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult UpdateChore(int id, Chore incomingChore)
    {
        Chore choreToUpdate = _dbContext.Chores
        .SingleOrDefault(c => c.Id == id);

        choreToUpdate.Name = incomingChore.Name;
        choreToUpdate.Difficulty = incomingChore.Difficulty;
        choreToUpdate.ChoreFrequencyDays = incomingChore.ChoreFrequencyDays;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult DeleteChore(int id)
    {
        Chore choreToDelete = _dbContext.Chores.SingleOrDefault(c => c.Id == id);

        if(choreToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Chores.Remove(choreToDelete);

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/assign")]
    // [Authorize(Roles = "Admin")]
    public IActionResult AssignChore(int id, string userId)
    {
        Chore choreToAssign = _dbContext.Chores.SingleOrDefault(c => c.Id == id);

        UserProfile userProfileToInclude = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == int.Parse(userId));

        if(choreToAssign == null)
        {
            return NotFound("Not a valid choreId");
        }
        else if (userProfileToInclude == null)
        {
            return NotFound("Not a valid userId, or one was not included");
        }


        ChoreAssignment choreAssignment = new ChoreAssignment()
        {
            UserProfileId = int.Parse(userId),
            userProfile = userProfileToInclude,
            ChoreId = id,
            Chore = choreToAssign
        };

        _dbContext.ChoreAssignments.Add(choreAssignment);

        _dbContext.SaveChanges();

        return NoContent();

    }

    [HttpPost("{id}/unassign")]
    [Authorize(Roles = "Admin")]
    public IActionResult unassignChore(int id, int? userId)
    {
        List<ChoreAssignment> choreAssignmentToRemove = _dbContext.ChoreAssignments.Where(ca => ca.ChoreId == id && ca.UserProfileId == userId).ToList();

        if(choreAssignmentToRemove.Count == 0)
        {
            return NotFound();
        }
        else if (userId == null)
        {
            return BadRequest("Must include userId querey string");
        }

        _dbContext.ChoreAssignments.RemoveRange(choreAssignmentToRemove);

        _dbContext.SaveChanges();

        return NoContent();

    }
}
