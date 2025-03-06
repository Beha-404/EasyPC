using System;

namespace Backend.Dtos;

public class CaseDto
{
    public required string Name { get; set; }
    public required string Type { get; set; }
    public required int Price { get; set; }
    public string? FormFactor { get; set; }
}
