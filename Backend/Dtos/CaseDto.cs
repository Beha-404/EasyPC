using System;

namespace Backend.Dtos;

public class CaseDto
{
    public required string Name { get; set; }
    public required string Type { get; set; }
    public required string Price { get; set; }
    public string? FormFactor { get; set; }
}
