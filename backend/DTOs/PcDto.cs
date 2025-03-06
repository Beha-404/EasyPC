using System;

namespace Backend.Dtos;

public class PcDto
{
    public required string Name { get; set; }
    public int? Price { get; set; }
    public required int Id { get; set; }
    public string? Picture { get; set; }
    public required bool Available { get; set; }
    public required int ProcessorId { get; set; }
    public required int RamId { get; set; }
    public required int CaseId { get; set; }
    public required int MotherBoardId { get; set; }
    public required int PsuId { get; set; }
    public required int GraphicsCardId { get; set; }
}
