using System;
using Backend.Models;

namespace Backend.Dtos;

public class UserDto
{
    public int? ID { get; set; }
    public string? Username { get; set; }
    public string? Token { get; set; }
    public UserRole Role { get; set; }
    public string? RoleName => Role.ToString();
}
