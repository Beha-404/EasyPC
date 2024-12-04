using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Category
{
    public int Id { get; set; }
    [MinLength(5)]
    public required string Name { get; set; }
}
