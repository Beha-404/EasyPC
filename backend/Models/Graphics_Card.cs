using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Graphics_Card
{
    public int Id { get; set; }
    [MinLength(3)]
    public required string Name { get; set; }
    [MinLength(3)]
    public required string VRAM { get; set; }
    public required int Price { get; set; }
    public  required string Type { get; set; } = "GPU";
      
}
