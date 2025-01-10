using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<RAM> RAMs { get; set; }
    public DbSet<Motherboard> Motherboards { get; set; }
    public DbSet<Graphics_Card> Graphics_Cards { get; set; }
    public DbSet<Processor> Processors { get; set; }
    public DbSet<PSU> PSUs { get; set; }
    public DbSet<Case> Cases { get; set; }
}