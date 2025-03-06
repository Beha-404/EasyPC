using Backend.Controllers;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class PcController(DataContext context) : BaseApiController
    {
        [HttpGet("all")]
        public async Task<ActionResult<PC>> GetAll()
        {
            var PCs = await context.Pcs
            .Include(x => x.Processor)
            .Include(x => x.Ram)
            .Include(x => x.GraphicsCard)
            .Include(x => x.PSU)
            .Include(x => x.Case)
            .Include(x => x.MotherBoard)
            .ToListAsync();
            if (PCs.Count() == 0) return Ok(new { message = "No PCs found" });
            return Ok(PCs);
        }


        [HttpGet("id/{id}")]
        public async Task<ActionResult> GetByID(int id)
        {
            var pc = await context.Pcs.FirstOrDefaultAsync(x => x.Id == id);
            if (pc == null) return NotFound("No pcs found");

            var dto = new PcDto
            {
                Id = pc.Id,
                Price = pc.Price,
                Name = pc.Name!,
                RamId = pc.RamId,
                GraphicsCardId = pc.GraphicsCardId,
                ProcessorId = pc.ProcessorId,
                CaseId = pc.CaseId,
                MotherBoardId = pc.MotherBoardId,
                PsuId = pc.PsuId,
                Available = pc.Available,
                Picture = pc.Picture
            };

            return Ok(dto);
        }

        [HttpPost("register")]
        public async Task<ActionResult<PcDto>> Register(PC pc)
        {
            if (pc == null) return BadRequest("Empty data");


            var processor = await context.Processors.FindAsync(pc.ProcessorId);
            var graphicsCard = await context.Graphics_Cards.FindAsync(pc.GraphicsCardId);
            var ram = await context.RAMs.FindAsync(pc.RamId);
            var caseItem = await context.Cases.FindAsync(pc.CaseId);
            var motherBoard = await context.Motherboards.FindAsync(pc.MotherBoardId);
            var psu = await context.PSUs.FindAsync(pc.PsuId);


            if (processor == null || graphicsCard == null || ram == null || caseItem == null || motherBoard == null || psu == null)
            {
                return BadRequest("One or more components were not found.");
            }

            pc.Price = processor.Price +
                       graphicsCard.Price +
                       ram.Price +
                       psu.Price +
                       caseItem.Price +
                       motherBoard.Price;

            pc.Picture = GetRandomImage();

            context.Pcs.Add(pc);

            await context.SaveChangesAsync();


            var newPC = new PcDto
            {
                Id = pc.Id,
                Name = pc.Name!,
                Price = pc.CalculatedPrice,
                ProcessorId = pc.ProcessorId,
                GraphicsCardId = pc.GraphicsCardId,
                CaseId = pc.CaseId,
                RamId = pc.RamId,
                MotherBoardId = pc.MotherBoardId,
                PsuId = pc.PsuId,
                Available = true,
                Picture = pc.Picture
            };

            return newPC;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PC>> Delete(int id)
        {

            var item = await context.Pcs.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null) return NotFound("Cant find product with this id");

            context.Pcs.Remove(item);
            await context.SaveChangesAsync();

            return Ok(item);
        }



        [HttpPut("{name}")]
        public async Task<ActionResult<PC>> Update(string name, PC pc)
        {
            var item = await context.Pcs.FirstOrDefaultAsync(x => x.Name!.ToLower() == name.ToLower());
            if (item == null) return NotFound("Cant find product with this name");

            item.Name = pc.Name ?? item.Name;
            item.ProcessorId = pc.ProcessorId;
            item.GraphicsCardId = pc.GraphicsCardId;
            item.CaseId = pc.CaseId;
            item.RamId = pc.RamId;
            item.PsuId = pc.PsuId;
            item.MotherBoardId = pc.MotherBoardId;
            item.Price = pc.Price;
            item.Available = pc.Available;

            await context.SaveChangesAsync();
            return Ok(item);
        }


        public string GetRandomImage()
        {
            var images = new List<string>
        {
            "/images/pc1.png",
            "/images/pc2.png",
            "/images/pc3.png",
            "/images/pc4.webp",
            "/images/pc5.webp",
            "/images/pc6.webp",
            "/images/pc7.webp",
            "/images/pc8.webp",
            "/images/pc9.png",
            "/images/pc10.png",
        };

            var random = new Random();
            var selectedImagePath = images[random.Next(images.Count)];

            return selectedImagePath;
        }

    }
}
