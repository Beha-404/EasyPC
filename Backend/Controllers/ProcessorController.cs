using System;
using System.Text.RegularExpressions;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
public class ProcessorController(DataContext context) : BaseApiController
{
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<ProcessorDto>>> GetProcessors()
    {
        var processors = await context.Processors.ToListAsync();
        if (processors.Count() == 0) return NotFound("No processors found");

        var processorsDto = processors.Select(p =>
           new ProcessorDto
           {
               Name = p.Name,
               Socket = p.Socket
           }).ToList();

        return processorsDto;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Processor>> Register(ProcessorDto processorDto)
    {

        if (string.IsNullOrWhiteSpace(processorDto.Name) || !Regex.IsMatch(processorDto.Name, @"^(?=.*[A-Za-z])[A-Za-z0-9\s]+$"))
        {
            return BadRequest("Invalid processor name. Name must contain at least one letter and may contain numbers and spaces.");
        }

        if (await ProcessorExists(processorDto.Name))
        {
            return BadRequest("Name is taken");
        }

        if (processorDto == null) return BadRequest("Empty data");

        var processor = new Processor
        {
            Name = processorDto.Name,
            Socket = processorDto.Socket
        };

        context.Processors.Add(processor);

        await context.SaveChangesAsync();

        return processor;
    }

    [HttpDelete("{name}")]
    public async Task<ActionResult<Processor>> Delete(string name)
    {
        if (string.IsNullOrWhiteSpace(name) || !Regex.IsMatch(name, @"^(?=.*[A-Za-z])[A-Za-z0-9\s]+$"))
        {
            return BadRequest("Invalid processor name. Name must contain at least one letter and may contain numbers and spaces.");
        }

        var item = await context.Processors.FirstOrDefaultAsync(x => name.ToLower() == x.Name.ToLower());
        if (item == null) return NotFound("Cant find product with this name");

        context.Processors.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }


    //TREBA FIX DA UPDATEA PO IMENU A NE PO ID-u
    [HttpPut("{id}")]
    public async Task<ActionResult<Processor>> Update(int id, ProcessorDto dto)
    {
        var processor = await context.Processors.FindAsync(id);
        if (processor == null) return NotFound("Cant find product with this ID");

        processor.Name = dto.Name ?? processor.Name;
        processor.Socket = dto.Socket ?? processor.Socket;

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> ProcessorExists(string productName)
    {
        return await context.Processors.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }

}
