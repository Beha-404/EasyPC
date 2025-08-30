using System.Text.Json;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers;

[Authorize]
public class ProductsController(DataContext context) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet("all")]
    public async Task<ActionResult<Products>> getProducts()
    {
        var products = new Products
        {
            Processors = await context.Processors.ToListAsync(),
            GraphicsCards = await context.Graphics_Cards.ToListAsync(),
            RAMs = await context.RAMs.ToListAsync(),
            Cases = await context.Cases.ToListAsync(),
            MotherBoards = await context.Motherboards.ToListAsync(),
            PSUs = await context.PSUs.ToListAsync(),
        };
        return Ok(products);
    }
    [HttpPost("{type}/add")]
    public async Task<ActionResult<Products>> addProduct(string type, object model)
    {

        if (model == null)
        {
            return BadRequest("Model should not be null");
        }

        switch (type)
        {
            case "CPU":

                var processorDto = JsonSerializer.Deserialize<ProcessorDto>(model.ToString()!);
                if (processorDto == null) return BadRequest("Invalid data for CPU");

                var newProcessor = new Processor
                {
                    Name = processorDto.Name!,
                    Socket = processorDto.Socket!,
                    Type = processorDto.Type!,
                    Price = processorDto.Price ?? 0,
                    CoreCount = processorDto.CoreCount ?? 0,
                    ThreadCount = processorDto.ThreadCount ?? 0
                };
                context.Processors.Add(newProcessor);
                break;

            case "GPU":
                var graphicsCardDto = model as GraphicsCardDto;
                if (graphicsCardDto is null)
                {
                    return BadRequest("Invalid data for GPU");
                }

                var newGPU = new Graphics_Card
                {
                    Name = graphicsCardDto.Name,
                    VRAM = graphicsCardDto.VRAM,
                    Type = graphicsCardDto.Type,
                    Price = graphicsCardDto.Price
                };
                context.Graphics_Cards.Add(newGPU);
                break;

            case "PSU":
                var PsuDto = model as PsuDto;
                if (PsuDto is null)
                {
                    return BadRequest("Invalid data for PSU");
                }

                var newPSU = new PSU
                {
                    Name = PsuDto.Name,
                    Power = PsuDto.Power,
                    Type = PsuDto.Type!,
                    Price = PsuDto.Price
                };
                context.PSUs.Add(newPSU);
                break;

            case "Case":
                var caseDto = model as CaseDto;
                if (caseDto is null)
                {
                    return BadRequest("Invalid data for case");
                }

                var newCase = new Case
                {
                    Name = caseDto.Name,
                    Type = caseDto.Type!,
                    Price = caseDto.Price
                };
                context.Cases.Add(newCase);
                break;

            case "MotherBoard":
                var motherBoardDto = model as MotherBoardDto;
                if (motherBoardDto is null)
                {
                    return BadRequest("Invalid data for MotherBoard");
                }

                var newMotherBoard = new Motherboard
                {
                    Name = motherBoardDto.Name,
                    Socket = motherBoardDto.Socket,
                    Type = motherBoardDto.Type,
                    SupportsOverclocking = motherBoardDto.SupportsOverclocking,
                    Model = motherBoardDto.Model,
                    Price = motherBoardDto.Price
                };
                context.Motherboards.Add(newMotherBoard);
                break;

            case "PC":
                var pcDto = model as PC;
                if (pcDto is null)
                {
                    return BadRequest("Invalid data for PC");
                }

                var newpc = new PC
                {
                    ProcessorId = pcDto.ProcessorId,
                    CaseId = pcDto.CaseId,
                    PsuId = pcDto.PsuId,
                    GraphicsCardId = pcDto.GraphicsCardId,
                    RamId = pcDto.RamId,
                    MotherBoardId = pcDto.MotherBoardId
                };
                context.Pcs.Add(newpc);
                break;

            case "RAM":
                var ramDto = model as RamDto;
                if (ramDto is null)
                {
                    return BadRequest("Invalid data for RAM");
                }

                var newRAM = new RAM
                {
                    Name = ramDto.Name,
                    Speed = ramDto.Speed,
                    Type = ramDto.Type,
                    Price = ramDto.Price
                };
                context.RAMs.Add(newRAM);
                break;

            default:
                return BadRequest("Invalid product type");
        }

        await context.SaveChangesAsync();
        return Ok("Product added");
    }

    [HttpDelete("{type}/{id}")]
    public async Task<ActionResult<Products>> deleteProduct(string type, int id)
    {
        object? product;

        switch (type)
        {
            case "CPU":
                product = await context.Processors.FirstOrDefaultAsync(x => x.Id == id);
                break;
            case "GPU":
                product = await context.Graphics_Cards.FirstOrDefaultAsync(x => x.Id == id);
                break;
            case "PSU":
                product = await context.PSUs.FirstOrDefaultAsync(x => x.Id == id);
                break;
            case "CASE":
                product = await context.Cases.FirstOrDefaultAsync(x => x.Id == id);
                break;
            case "MOTHERBOARD":
                product = await context.Motherboards.FirstOrDefaultAsync(x => x.Id == id);
                break;
            case "RAM":
                product = await context.RAMs.FirstOrDefaultAsync(x => x.Id == id);
                break;
            case "PC":
                product = await context.Pcs.FirstOrDefaultAsync(x => x.Id == id);
                break;
            default:
                return BadRequest("Invalid product type");
        }
        if (product == null)
        {
            return NotFound("Product not found");
        }
        context.Remove(product);
        await context.SaveChangesAsync();
        return Ok(new { message = "Product deleted" });
    }
}

