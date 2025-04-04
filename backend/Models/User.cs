using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public  string? FirstName { get; set; }
    public  string? Email { get; set; }
    public  string? LastName { get; set; }
    public  string? City { get; set; }
    public  string? State { get; set; }
    public  string? Country { get; set; }
    public  byte[]? profilePicture { get; set; }
    public  string? PostalCode { get; set; }
    public  string? Address { get; set; }
    public UserRole Role { get; set; } = UserRole.User;
}

public enum UserRole{
    User,
    Admin,
    Manager
}

