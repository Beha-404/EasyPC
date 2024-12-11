using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class User
{
    public int Id { get; set; }
    [MinLength(5)]
    public required string Username { get; set; }
    [MinLength(5)]
    public  byte[]? PasswordHash { get; set; }
    [MinLength(5)]
    public  byte[]? PasswordSalt { get; set; }
    public  string? FirstName { get; set; }
    public  string? LastName { get; set; }
    public  string? City { get; set; }
    public  string? State { get; set; }
    public  string? Country { get; set; }
    public  string? profilePicture { get; set; }
    public  string? PostalCode { get; set; }
    public  string? Address { get; set; }
}

