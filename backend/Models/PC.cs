using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Backend.Models;
public class PC
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string Type { get; set; } = "PC";
    public int? Price { get; set; }
    public bool Available { get; set; } = true;
    public string? Picture { get; set; }
    public int ProcessorId { get; set; }
    [ForeignKey(nameof(ProcessorId))]
    public Processor? Processor { get; set; }
    public int RamId { get; set; }
    [ForeignKey(nameof(RamId))]
    public RAM? Ram { get; set; }
    public int CaseId { get; set; }
    [ForeignKey(nameof(CaseId))]
    public Case? Case { get; set; }
    public int MotherBoardId { get; set; }
    [ForeignKey(nameof(MotherBoardId))]
    public Motherboard? MotherBoard { get; set; }
    public int PsuId { get; set; }
    [ForeignKey(nameof(PsuId))]
    public PSU? PSU { get; set; }
    public int GraphicsCardId { get; set; }
    [ForeignKey(nameof(GraphicsCardId))]
    public Graphics_Card? GraphicsCard { get; set; }
    [NotMapped]
    public int CalculatedPrice
    {
        get
        {
            return
                (Processor?.Price ?? 0) +
                (GraphicsCard?.Price ?? 0) +
                (Ram?.Price ?? 0) +
                (PSU?.Price ?? 0) +
                (Case?.Price ?? 0) +
                (MotherBoard?.Price ?? 0);
        }
    }
}