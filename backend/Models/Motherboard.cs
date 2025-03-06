using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Motherboard
{
  public int Id { get; set; }
  [MinLength(3)]
  public required string Name { get; set; }
  [MinLength(3)]
  public required string Socket { get; set; }
  public required int Price { get; set; }
  [MinLength(3)]
  public string? Model { get; set; }
  [MinLength(3)]
  public bool SupportsOverclocking { get; set; }
  public required string Type { get; set; } = "MotherBoard";


}
