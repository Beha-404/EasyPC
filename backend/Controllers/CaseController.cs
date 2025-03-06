using System;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;


public class CaseController(DataContext context) : BaseApiController
{
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Case>>> GetCases()
    {
        var Cases = await context.Cases.ToListAsync();
        if (Cases.Count() == 0) return NotFound("No cases found");
        return Cases;
    }

      [HttpGet("id/{id}")]
    public async Task<ActionResult<Case>> GetByID(int id)
    {
        var product = await context.Cases.FirstOrDefaultAsync(x => x.Id == id);
        if (product == null) return NotFound("No cases found");
        return product;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Case>> Register(CaseDto caseDto)
    {

        if (await Exists(caseDto.Name))
        {
            return BadRequest("Name is taken");
        }

        if (caseDto == null) return BadRequest("Empty data");

        var Case = new Case
        {
            Name = caseDto.Name,
            Type = caseDto.Type,
            Price = caseDto.Price,
            FormFactor = caseDto.FormFactor
        };

        if (Case.Name.Length < 3)
            return BadRequest("Name too short");

        else if (Case.Type.Length < 3)
            return BadRequest("Input not valid");

        context.Cases.Add(Case);

        await context.SaveChangesAsync();

        return Case;
    }

    [HttpDelete("{name}")]
    public async Task<ActionResult<Case>> Delete(string name)
    {

        var item = await context.Cases.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        context.Cases.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }

    [HttpPut("{name}")]
    public async Task<ActionResult<Case>> Update(string name, CaseDto dto)
    {
        var item = await context.Cases.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        item.Name = dto.Name ?? item.Name;
        item.Type = dto.Type ?? item.Type;
        item.Price = dto.Price;
        item.FormFactor = dto.FormFactor ?? item.FormFactor;

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> Exists(string productName)
    {
        return await context.Cases.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }
}
