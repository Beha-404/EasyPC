using System;
using Backend.Models;

namespace Backend.Dtos;

public class UserDto
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Token { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? profilePicture { get; set; }
    public string? PostalCode { get; set; }
    public string? Address { get; set; }
    public UserRole? Role { get; set; }
}
