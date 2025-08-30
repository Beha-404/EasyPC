using System;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace Backend.Controllers;

[Authorize]
public class GraphicsCardController(DataContext context) : BaseApiController
{
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Graphics_Card>>> GetGraphicsCards()
    {
        var graphics_Cards = await context.Graphics_Cards.ToListAsync();
        if (graphics_Cards.Count() == 0) return NotFound("No graphics cards found");
        return graphics_Cards;
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<Graphics_Card>> GetByID(int id)
    {
        var product = await context.Graphics_Cards.FirstOrDefaultAsync(x => x.Id == id);
        if (product == null) return NotFound("No graphics cards found");
        return product;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Graphics_Card>> Register(Graphics_Card graphics_CardDto)
    {

        if (await Exists(graphics_CardDto.Name!))
        {
            return BadRequest("Name is taken");
        }

        if (graphics_CardDto == null) return BadRequest("Empty data");

        var graphicsCard = new Graphics_Card
        {
            Name = graphics_CardDto.Name,
            VRAM = graphics_CardDto.VRAM,
            Type = graphics_CardDto.Type,
            Price = graphics_CardDto.Price
        };

        if (graphicsCard.Name!.Length < 3)
            return BadRequest("Name too short");

        else if (graphicsCard.VRAM!.Length < 1)
            return BadRequest("VRAM LENGH TOO SHORT");

        context.Graphics_Cards.Add(graphicsCard);

        await context.SaveChangesAsync();

        return graphicsCard;
    }

    [HttpDelete("{name}")]
    public async Task<ActionResult<Graphics_Card>> Delete(string name)
    {

        var item = await context.Graphics_Cards.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        context.Graphics_Cards.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }

    [HttpPut("{name}")]
    public async Task<ActionResult<Graphics_Card>> Update(string name, GraphicsCardDto dto)
    {
        var item = await context.Graphics_Cards.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        item.Name = dto.Name ?? item.Name;
        item.VRAM = dto.VRAM ?? item.VRAM;
        item.Price = dto.Price;

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> Exists(string productName)
    {
        return await context.Graphics_Cards.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }

}
