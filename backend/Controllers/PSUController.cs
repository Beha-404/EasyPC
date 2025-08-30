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
    public async Task<ActionResult<IEnumerable<PsuDto>>> GetPSU()
    {
        var PSUs = await context.PSUs.ToListAsync();
        if (PSUs.Count() == 0) return NotFound("No PSU found");

        var psuDTO = PSUs.Select(x => new PsuDto
        {
            Name = x.Name,
            Power = x.Power,
            Price = x.Price
        }).ToList();
        return psuDTO;
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<PSU>> GetByID(int id)
    {
        var product = await context.PSUs.FirstOrDefaultAsync(x => x.Id == id);
        if (product == null) return NotFound("No power supply found");
        return product;
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
            Power = psuDto.Power,
            Type = psuDto.Type!,
            Price = psuDto.Price
        };

        if (PSU.Name.Length < 3)
            return BadRequest("Name too short");

        else if (PSU.Power.Length < 3)
            return BadRequest("Power not valid");

        context.PSUs.Add(PSU);

        await context.SaveChangesAsync();

        return PSU;
    }


    [HttpDelete("{name}")]
    public async Task<ActionResult<PSU>> Delete(string name)
    {

        var item = await context.PSUs.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");


        context.PSUs.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }

    [HttpPut("{name}")]
    public async Task<ActionResult<PSU>> Update(string name, PsuDto dto)
    {
        var item = await context.PSUs.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        item.Name = dto.Name ?? item.Name;
        item.Power = dto.Power ?? item.Power;
        item.Price = dto.Price;

        await context.SaveChangesAsync();
        return Ok();
    }

    private async Task<bool> Exists(string productName)
    {
        return await context.PSUs.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }

}
