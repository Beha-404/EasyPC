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
        if(RAMs.Count() == 0) return NotFound("No RAMs found");
        return RAMs;
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
            Speed = ramDto.Speed
        };

        if (ram.Name.Length < 3 )
            return BadRequest("Name too short");

        else if(ram.Type.Length < 3)
            return BadRequest("Type name too short");

        context.RAMs.Add(ram);

        await context.SaveChangesAsync();

        return ram;
    }

      [HttpDelete("{id}")]
    public async Task<ActionResult<RAM>> Delete(int id)
    {

        var item = await context.RAMs.FindAsync(id);
        if(item == null) return NotFound("Cant find product with this ID");

        
        context.RAMs.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }



   [HttpPut("{id}")] 
    public async Task<ActionResult<RAM>> Update(int id,RamDto dto)
    {
        var item = await context.RAMs.FindAsync(id);
        if(item == null) return NotFound("Cant find product with this ID");

        item.Name = dto.Name?? item.Name;
        item.Type = dto.Type?? item.Type;
        item.Speed = dto.Speed?? item.Speed;
        

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> Exists(RamDto ram)
    {
        return await context.RAMs.AnyAsync(x => x.Name!.ToLower() == ram.Name.ToLower() && x.Type!.ToLower() == ram.Type.ToLower());
    }
 
}
