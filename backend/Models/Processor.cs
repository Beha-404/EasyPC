using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Processor
{
  public int Id { get; set; }
  [MinLength(3)]
  public required string Name { get; set; }
  [MinLength(3)]
  public required string Socket { get; set; }
  public required string Type { get; set; } = "CPU";
  public required int Price { get; set; }
  public required int CoreCount { get; set; }
  public required int ThreadCount { get; set; }
}
