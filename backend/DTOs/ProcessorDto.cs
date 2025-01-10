using System;

namespace Backend.Dtos;

public class ProcessorDto
{
    public string? Name { get; set; }
    public string? Socket { get; set; }
    public string? Type { get; set; }
    public int? Price { get; set; }
    public int? CoreCount { get; set; }
    public int? ThreadCount { get; set; }
}
