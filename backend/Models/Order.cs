using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Backend.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string? Status { get; set; }
    public string? Details { get; set; }
    public int Total { get; set; }
    public int UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }
}