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
               Socket = p.Socket,
               Price = p.Price,
               ThreadCount = p.ThreadCount,
               CoreCount = p.CoreCount
           }).ToList();

        return processorsDto;
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<Processor>> GetByID(int id)
    {
        var product = await context.Processors.FirstOrDefaultAsync(x => x.Id == id);
        if (product == null) return NotFound("No processors found");
        return product;
    }


    [HttpGet("{name}")]
    public async Task<ActionResult<Processor>> GetProcessorByName(string name)
    {
        var processor = await context.Processors.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (processor == null) return NotFound("No processors found");

        return processor;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Processor>> Register(Processor processor)
    {

        if (string.IsNullOrWhiteSpace(processor.Name) || !Regex.IsMatch(processor.Name, @"^(?=.*[A-Za-z])[A-Za-z0-9\s]+$"))
        {
            return BadRequest("Invalid processor name. Name must contain at least one letter and may contain numbers and spaces.");
        }

        if (await ProcessorExists(processor.Name))
        {
            return BadRequest("Name is taken");
        }

        if (processor == null) return BadRequest("Empty data");

        var newProcessor = new Processor
        {
            Name = processor.Name,
            Socket = processor.Socket,
            Price = processor.Price,
            ThreadCount = processor.ThreadCount,
            CoreCount = processor.CoreCount,
            Type = processor.Type ?? "CPU"
        };

        context.Processors.Add(newProcessor);

        await context.SaveChangesAsync();

        return newProcessor;
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

    [HttpPut("{name}")]
    public async Task<ActionResult<Processor>> Update(string name, ProcessorDto dto)
    {
        var processor = await context.Processors.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        if (processor == null) return NotFound("Cant find product with this name");


        processor.Name = dto.Name ?? processor.Name;
        processor.Socket = dto.Socket ?? processor.Socket;
        processor.Price = dto.Price ?? processor.Price;
        processor.ThreadCount = dto.ThreadCount ?? processor.ThreadCount;
        processor.CoreCount = dto.CoreCount ?? processor.CoreCount;

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> ProcessorExists(string productName)
    {
        return await context.Processors.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }

}
