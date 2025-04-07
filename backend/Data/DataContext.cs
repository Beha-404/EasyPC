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
    public DbSet<PC> Pcs { get; set; }
    public DbSet<Order> Orders { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>().HasData(
           new User
           {
               Id = 1,
               Username = "admin",
               Password = "123123",
               Role = UserRole.Admin,
               Email = "admin@gmail.com"
           },
            new User
            {
                Id = 2,
                Username = "user",
                Password = "123123",
                Role = UserRole.User,
                Email = "user@gmail.com"
            }
       );

        builder.Entity<Processor>().HasData(
            new Processor
            {
                Id = 1,
                Name = "Ryzen 7 7800X3D",
                Socket = "AM5",
                Price = 500,
                CoreCount = 4,
                ThreadCount = 8,
                Type = "CPU"
            },
             new Processor
             {
                 Id = 2,
                 Name = "i7 12700k",
                 Socket = "LGA 1700",
                 Price = 200,
                 CoreCount = 8,
                 ThreadCount = 12,
                 Type = "CPU"
             }
        );

        builder.Entity<Graphics_Card>().HasData(
            new Graphics_Card
            {
                Id = 1,
                Name = "RTX 4090",
                Type = "GPU",
                Price = 1400,
                VRAM = "24GB"
            },
             new Graphics_Card
             {
                 Id = 2,
                 Name = "RX 7900 XTX",
                 Type = "GPU",
                 Price = 1000,
                 VRAM = "24GB"
             }
        );

        builder.Entity<PSU>().HasData(
         new PSU
         {
             Id = 1,
             Name = "Seasonic G12 GC 700W 80+ Gold",
             Type = "PSU",
             Price = 150,
             Power = "850W"
         },
          new PSU
          {
              Id = 2,
              Name = "Gigabyte GP-UD850GM PG5 GEU2 1000W ",
              Type = "PSU",
              Price = 300,
              Power = "800W"
          }
     );
        builder.Entity<Motherboard>().HasData(
          new Motherboard
          {
              Id = 1,
              Name = "MSI Pro B650-S WiFi & Bluetooth AM5 DDR5",
              Type = "MOTHERBOARD",
              Price = 450,
              Socket = "AM5"
          },
           new Motherboard
           {
               Id = 2,
               Name = "Maticna Gigabyte b760 GAMING X AX DDR5",
               Type = "MOTHERBOARD",
               Price = 200,
               Socket = "LGA 1700"
           }
      );

        builder.Entity<RAM>().HasData(
            new RAM
            {
                Id = 2,
                Name = "Corsair 16GB 3200MHz DDR4 Vengeance LPX",
                Type = "RAM",
                Price = 100,
                Speed = "3200"
            },
             new RAM
             {
                 Id = 1,
                 Name = "Corsair Vengeance DDR5 6000MHz 32GBRGB",
                 Type = "RAM",
                 Price = 200,
                 Speed = "6000"
             }
        );

        builder.Entity<Case>().HasData(
            new Case
            {
                Id = 1,
                Name = "SAMA Tank 3 ( Titan II , V710 )",
                Type = "CASE",
                Price = 150,
            },
             new Case
             {
                 Id = 2,
                 Name = "MS Armor V500",
                 Type = "CASE",
                 Price = 100,
             }
        );
        builder.Entity<Order>().HasData(
    new Order
    {
        Id = 1,
        Details = "Empty",
        Status = "Shipped",
        UserId = 1,
        Date = new DateTime(2025,2,2),
        Total = 200,
    },
    new Order
    {
        Id = 2,
        Details = "Empty",
        Status = "Waiting",
        UserId = 2,
        Date = new DateTime(2025,2,2),
        Total = 400,
    }
    );
    }
}