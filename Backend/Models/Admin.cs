using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Admin
{
    public int Id { get; set; }
    [MinLength(3)]
    public required string Username { get; set; }
    [MinLength(8)]
    public required string Password { get; set; }
}
