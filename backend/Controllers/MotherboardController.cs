using System;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Authorize]
public class MotherboardController(DataContext context) : BaseApiController
{
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Motherboard>>> GetMotherBoards()
    {
        var Motherboards = await context.Motherboards.ToListAsync();
        if (Motherboards.Count() == 0) return NotFound("No Motherboards found");
        return Motherboards;
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<Motherboard>> GetByID(int id)
    {
        var product = await context.Motherboards.FirstOrDefaultAsync(x => x.Id == id);
        if (product == null) return NotFound("No motherBoards found");
        return product;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Motherboard>> Register(MotherBoardDto motherBoardDto)
    {

        if (await Exists(motherBoardDto.Name))
        {
            return BadRequest("Name is taken");
        }

        if (motherBoardDto == null) return BadRequest("Empty data");

        var motherBoard = new Motherboard
        {
            Name = motherBoardDto.Name,
            Socket = motherBoardDto.Socket,
            Type = motherBoardDto.Type,
            Price = motherBoardDto.Price
        };

        if (motherBoard.Name.Length < 3)
            return BadRequest("Name too short");

        else if (motherBoard.Socket.Length < 3)
            return BadRequest("Socket name too short");

        context.Motherboards.Add(motherBoard);

        await context.SaveChangesAsync();

        return motherBoard;
    }

    [HttpDelete("{name}")]
    public async Task<ActionResult<Motherboard>> Delete(string name)
    {

        var item = await context.Motherboards.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        context.Motherboards.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }



    [HttpPut("{name}")]
    public async Task<ActionResult<Motherboard>> Update(string name, MotherBoardDto dto)
    {
        var item = await context.Motherboards.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        item.Name = dto.Name ?? item.Name;
        item.Socket = dto.Socket ?? item.Socket;
        item.Price = dto.Price;

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> Exists(string productName)
    {
        return await context.Motherboards.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }

}
