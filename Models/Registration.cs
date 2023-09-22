using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models;

public class Registration
{
    [Required]
    [EmailAddress(ErrorMessage = "Email address must be a valid email")]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    [MaxLength(100, ErrorMessage = "Username must not exceed 1-- characters")]
    public string UserName { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Address { get; set; }
}