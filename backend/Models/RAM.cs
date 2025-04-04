using System;

namespace Backend.Models;

public class RAM
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; } = "RAM";
    public required int Price { get; set; }
    public required string Speed { get; set; }
}
