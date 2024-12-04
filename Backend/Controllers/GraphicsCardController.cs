using System;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Authorize]
public class GraphicsCardController(DataContext context) : BaseApiController
{
       [HttpGet("all")]
      public async Task<ActionResult<IEnumerable<Graphics_Card>>> GetGraphicsCards()
    {
        var graphics_Cards = await context.Graphics_Cards.ToListAsync();
        if(graphics_Cards.Count() == 0) return NotFound("No graphics cards found");
        return graphics_Cards;
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
            VRAM = graphics_CardDto.VRAM
        };

        if (graphicsCard.Name!.Length < 3 )
            return BadRequest("Name too short");

        else if(graphicsCard.VRAM!.Length < 3)
            return BadRequest("Input not valid");

        context.Graphics_Cards.Add(graphicsCard);

        await context.SaveChangesAsync();

        return graphicsCard;
    }

      [HttpDelete("{id}")]
    public async Task<ActionResult<Graphics_Card>> Delete(int id)
    {

        var item = await context.Graphics_Cards.FindAsync(id);
        if(item == null) return NotFound("Cant find product with this ID");

        context.Graphics_Cards.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }



   [HttpPut("{id}")] 
    public async Task<ActionResult<Graphics_Card>> Update(int id,GraphicsCardDto dto)
    {
        var item = await context.Graphics_Cards.FindAsync(id);
        if(item == null) return NotFound("Cant find product with this ID");

        item.Name = dto.Name?? item.Name;
        item.VRAM = dto.VRAM?? item.VRAM;

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> Exists(string productName)
    {
        return await context.Graphics_Cards.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }
 
}
