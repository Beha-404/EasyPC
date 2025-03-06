using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Case
{
    public int Id { get; set; }
    [MinLength(5)]
    public required string Name { get; set; }
    [MinLength(2)]
    public required string Type { get; set; } = "CASE";
    public required int Price { get; set; }
    public string? FormFactor { get; set; }

}
