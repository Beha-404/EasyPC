using System;

namespace Backend.Models;

public class Products
{
    public List<Processor> Processors { get; set; } = new List<Processor>();
    public List<Graphics_Card> GraphicsCards { get; set; } = new List<Graphics_Card>();
    public List<RAM> RAMs { get; set; } = new List<RAM>();
    public List<Case> Cases { get; set; } = new List<Case>();
    public List<PSU> PSUs { get; set; } = new List<PSU>();
    public List<Motherboard> MotherBoards { get; set; } = new List<Motherboard>();
}
