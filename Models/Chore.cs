using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models;

public class Chore {
    public int Id { get; set; }
    [Required]
    [MaxLength(100, ErrorMessage = "Chore names must be 100 characters or less")]
    public string Name { get; set; }
    [Range(1,5, ErrorMessage = "Chore difficulty must not exceed 5")]
    public int Difficulty { get; set; }
    [Range(1,14, ErrorMessage = "Chore frequency must not exceed 14")]
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreAssignment>? ChoreAssignments { get; set; }
    public List<ChoreCompletion>? ChoreCompletions { get; set; }

    public bool? Overdue
    {
        get
        {
            if (ChoreCompletions == null || ChoreCompletions.Count == 0)
            {
                return true;
            }

            DateTime LatestChoreCompletionDate = ChoreCompletions.Max(cc => cc.CompletedOn);

            if (LatestChoreCompletionDate.AddDays(ChoreFrequencyDays) < DateTime.Now)
            {
                return true;
            }
            else 
            {
                return false;
            }
        }
    } 
}

