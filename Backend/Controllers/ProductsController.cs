using System;
using System.ComponentModel;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

public class ProductsController(DataContext context) : BaseApiController
{
    [HttpGet("all")]
    public async Task<ActionResult<Products>> getProducts()
    {
        var products = new Products
        {
            Processors = await context.Processors.ToListAsync(),
            GraphicsCards = await context.Graphics_Cards.ToListAsync(),
            RAMs = await context.RAMs.ToListAsync(),
            Cases = await context.Cases.ToListAsync(),
            MotherBoards = await context.Motherboards.ToListAsync(),
            PSUs = await context.PSUs.ToListAsync(),
        };
        return Ok(products);
    }
    [HttpDelete("{type}/{name}")]
    public async Task<ActionResult<Products>> deleteProduct(string type, string name)
    {
        object? product;

        switch (type)
        {
            case "CPU":
                product = await context.Processors.FirstOrDefaultAsync(x => x.Name == name);
                break;
            case "GPU":
                product = await context.Graphics_Cards.FirstOrDefaultAsync(x => x.Name == name);
                break;
            case "PSU":
                product = await context.PSUs.FirstOrDefaultAsync(x => x.Name == name);
                break;
            case "Case":
                product = await context.Cases.FirstOrDefaultAsync(x => x.Name == name);
                break;
            case "MotherBoard":
                product = await context.Motherboards.FirstOrDefaultAsync(x => x.Name == name);
                break;
            case "RAM":
                product = await context.RAMs.FirstOrDefaultAsync(x => x.Name == name);
                break;
            default:
                return BadRequest("Invalid product type");
        }
        if (product == null)
        {
            return NotFound("Product not found");
        }
        context.Remove(product);
        await context.SaveChangesAsync();
        return Ok("Product deleted");
    }

    // [HttpPost("{type}/{name}")]
    // public async Task<ActionResult<Products>> addProduct(string type, object model)
    // {
    //     object? product;
    //     switch (type)
    //     {
    //         case "CPU":
    //             var cpu = new Processor();
    //             cpu.Name = ((dynamic)productDetails).Name;
    //             cpu.Socket = ((dynamic)productDetails).Socket;
    //             cpu.Price = ((dynamic)productDetails).Price;
    //             product = cpu;
    //             break;
    //         case "GPU":
    //             var gpu = new GraphicsCard();
    //             gpu.Name = ((dynamic)productDetails).Name;
    //             gpu.Memory = ((dynamic)productDetails).Memory;
    //             product = gpu;
    //             break;
    //         case "PSU":
    //             var psu = new PSU();
    //             psu.Name = ((dynamic)productDetails).Name;
    //             psu.Wattage = ((dynamic)productDetails).Wattage;
    //             product = psu;
    //             break;
    //         case "Case":
    //             var caseItem = new Case();
    //             caseItem.Name = ((dynamic)productDetails).Name;
    //             caseItem.Size = ((dynamic)productDetails).Size;
    //             product = caseItem;
    //             break;
    //         case "MotherBoard":
    //             var motherboard = new Motherboard();
    //             motherboard.Name = ((dynamic)productDetails).Name;
    //             motherboard.Socket = ((dynamic)productDetails).Socket;
    //             product = motherboard;
    //             break;
    //         case "RAM":
    //             var ram = new RAM();
    //             ram.Name = ((dynamic)productDetails).Name;
    //             ram.Capacity = ((dynamic)productDetails).Capacity;
    //             product = ram;
    //             break;
    //         default:

    //             if (product == null)
    //             {
    //                 return NotFound("Product not found");
    //             }
    //             context.Add(product);
    //             context.SaveChangesAsync();
    //             return Ok();
    //     }
    }

