using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Processor
{
    public int Id { get; set; }
    [MinLength(3)]
    public required string Name { get; set; }
    [MinLength(3)]
    public required string Socket { get; set; }
    [MinLength(3)]
    public int Price { get; set; }
    [MinLength(1)]
    public int CoreCount { get; set; }
    [MinLength(1)]
    public int ThreadCount { get; set; }
}
