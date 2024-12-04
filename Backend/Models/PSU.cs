using System;

namespace Backend.Models;

public class PSU
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public  required string Power { get; set; }
}
