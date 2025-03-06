using System;

namespace Backend.Dtos;

public class RamDto
{
    public required string Name { get; set; }
    public required string Type { get; set; }
    public required string Speed { get; set; }
    public required int Price { get; set; }
}
