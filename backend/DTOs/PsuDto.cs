using System;

namespace Backend.Dtos;

public class PsuDto
{
    public required string Name { get; set; }
    public required string Power { get; set; }
    public string? Type { get; set; }
    public required int Price { get; set; }
}
