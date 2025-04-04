using System;

namespace backend.DTOs;

public class OrderDto
{
     public int Id { get; set; }
    public DateTime Date { get; set; }
    public string? Status { get; set; }
    public string? Details { get; set; }
    public int Total { get; set; }
    public int UserId { get; set; }
}
