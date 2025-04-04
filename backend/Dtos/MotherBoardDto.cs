using System;

namespace Backend.Dtos;

public class MotherBoardDto
{
    public required string Name { get; set; }
    public required string Socket { get; set; }
    public required string Type { get; set; }
    public bool SupportsOverclocking { get; set; }
    public required int Price { get; set; }
    public string? Model { get; set; }
}
