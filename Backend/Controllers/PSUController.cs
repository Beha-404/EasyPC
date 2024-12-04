using System;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Authorize]
public class PSUController(DataContext context) : BaseApiController
{
       [HttpGet("all")]
      public async Task<ActionResult<IEnumerable<PSU>>> GetPSU()
    {
        var PSUs= await context.PSUs.ToListAsync();
        if(PSUs.Count() == 0) return NotFound("No PSU found");
        return PSUs;
    }

[HttpPost("register")]
 public async Task<ActionResult<PSU>> Register(PsuDto psuDto)
    {

        if (await Exists(psuDto.Name))
        {
            return BadRequest("Name is taken");
        }

        if (psuDto == null) return BadRequest("Empty data");

        var PSU = new PSU
        {
            Name = psuDto.Name,
            Power = psuDto.Power
        };

        if (PSU.Name.Length < 3 )
            return BadRequest("Name too short");

        else if(PSU.Power.Length < 3)
            return BadRequest("Power not valid");

        context.PSUs.Add(PSU);

        await context.SaveChangesAsync();

        return PSU;
    }

     [HttpDelete("{id}")]
    public async Task<ActionResult<PSU>> Delete(int id)
    {

        var item = await context.PSUs.FindAsync(id);
        if(item == null) return NotFound("Cant find product with this ID");

        
        context.PSUs.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }



   [HttpPut("{id}")] 
    public async Task<ActionResult<PSU>> Update(int id,PsuDto dto)
    {
        var item = await context.PSUs.FindAsync(id);
        if(item == null) return NotFound("Cant find product with this ID");

        item.Name = dto.Name?? item.Name;
        item.Power = dto.Power?? item.Power;

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> Exists(string productName)
    {
        return await context.PSUs.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }
 
}
