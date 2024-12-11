using System;

namespace Backend.Dtos;

public class UserDto
{
    public  string? Username { get; set; }
    public  string? Token { get; set; }
    public  byte[]? PasswordHash { get; set; }
    public  byte[]? PasswordSalt { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? profilePicture { get; set; }
    public string? PostalCode { get; set; }
    public string? Address { get; set; }
}
