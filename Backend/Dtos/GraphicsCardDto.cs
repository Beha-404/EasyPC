using System;

namespace Backend.Dtos;

public class GraphicsCardDto
{
    public required string Name { get; set; }
    public required string VRAM { get; set; }
    public required string Type { get; set; }
    public required string Price { get; set; }
}
