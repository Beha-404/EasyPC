using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class User
{
    public  int Id { get; set; }
    [MinLength(5)]
    public required string Username { get; set; }
    [MinLength(5)]
    public required byte[]  PasswordHash { get; set; }
    [MinLength(5)]
    public required byte[]  PasswordSalt { get; set; }
}

