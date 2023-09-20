using HouseRules.Models;

namespace HouseRules;

public class ChoreCompletion {
    public int Id { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile userProfile { get; set; }
    public int ChoreId { get; set; }
    public Chore Chore { get; set; }
    public DateTime CompletedOn { get; set; }
}