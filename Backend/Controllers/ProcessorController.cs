using System;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Authorize]
public class ProcessorController(DataContext context): BaseApiController
{
   [HttpGet("all")]
      public async Task<ActionResult<IEnumerable<Processor>>> GetProcessors()
    {
        var processors = await context.Processors.ToListAsync();
        if(processors.Count() == 0) return NotFound("No processors found");
        return processors;
    }

[HttpPost("register")]
 public async Task<ActionResult<Processor>> Register(ProcessorDto processorDto)
    {

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

    [HttpDelete("{id}")]
    public async Task<ActionResult<Processor>> Delete(int id)
    {

        var item = await context.Processors.FindAsync(id);
        if(item == null) return NotFound("Cant find product with this ID");

        
        context.Processors.Remove(item);
        await context.SaveChangesAsync();

        return Ok(item);
    }



   [HttpPut("{id}")] 
    public async Task<ActionResult<Processor>> Update(int id,ProcessorDto dto)
    {
        var processor = await context.Processors.FindAsync(id);
        if(processor == null) return NotFound("Cant find product with this ID");

        processor.Name = dto.Name?? processor.Name;
        processor.Socket = dto.Socket?? processor.Socket;

        await context.SaveChangesAsync();
        return Ok();
    }


    private async Task<bool> ProcessorExists(string productName)
    {
        return await context.Processors.AnyAsync(x => x.Name!.ToLower() == productName.ToLower());
    }
 
}
