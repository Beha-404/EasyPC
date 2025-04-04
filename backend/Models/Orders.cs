using System;

namespace Backend.Models;

public class Orders
{
    public int Id { get; set; }
    public required int UserId { get; set; }
    public required DateTime OrderDate { get; set; } // Datum narudžbe
    public required string ShippingAddress { get; set; } // Adresa za dostavu
    public required int TotalPrice { get; set; } // Ukupna cena narudžbe
    public required string OrderStatus { get; set; } // Status narudžbe (npr. "Na čekanju", "Poslato")
    public required int Discounts { get; set; } // Iznos popusta (ako postoji)
}
