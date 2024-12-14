using System;

namespace Backend.Dtos;

public class MotherBoardDto
{
    public required string Name { get; set; }
    public required string Socket { get; set; }
    public required string Type { get; set; }
}
