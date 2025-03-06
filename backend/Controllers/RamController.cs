using System;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
public class RamController(DataContext context) : BaseApiController
{
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<RAM>>> GetRAMs()
    {
        var RAMs = await context.RAMs.ToListAsync();
        if (RAMs.Count() == 0) return NotFound("No RAMs found");
        return RAMs;
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<RAM>> GetByID(int id)
    {
        var product = await context.RAMs.FirstOrDefaultAsync(x => x.Id == id);
        if (product == null) return NotFound("No ram found");
        return product;
    }

    [HttpPost("register")]
    public async Task<ActionResult<RAM>> Register(RamDto ramDto)
    {

        if (await Exists(ramDto))
        {
            return BadRequest("Product exists");
        }

        if (ramDto == null) return BadRequest("Empty data");

        var ram = new RAM
        {
            Name = ramDto.Name,
            Type = ramDto.Type,
            Speed = ramDto.Speed,
            Price = ramDto.Price
        };

        if (ram.Name.Length < 3)
            return BadRequest("Name too short");

        else if (ram.Type.Length < 3)
            return BadRequest("Type name too short");

        context.RAMs.Add(ram);

        await context.SaveChangesAsync();

        return ram;
    }

    [HttpDelete("{name}")]
    public async Task<ActionResult<RAM>> Delete(string name)
    {

        var item = await context.RAMs.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");


        context.RAMs.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }

    [HttpPut("{name}")]
    public async Task<ActionResult<RAM>> Update(string name, RamDto dto)
    {
        var item = await context.RAMs.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        item.Name = dto.Name ?? item.Name;
        item.Type = dto.Type ?? item.Type;
        item.Speed = dto.Speed ?? item.Speed;
        item.Price = dto.Price;


        await context.SaveChangesAsync();
        return Ok();
    }

    private async Task<bool> Exists(RamDto ram)
    {
        return await context.RAMs.AnyAsync(x => x.Name!.ToLower() == ram.Name.ToLower() && x.Type!.ToLower() == ram.Type.ToLower());
    }

}
