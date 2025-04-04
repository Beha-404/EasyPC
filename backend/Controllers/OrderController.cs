using System.Data;
using backend.DTOs;
using Backend.Controllers;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class OrderController(DataContext db) : BaseApiController
    {
        [HttpGet("all")]
        public async Task<ActionResult> GetAll()
        {
            var orders = await db.Orders.ToListAsync();
            if (orders.Count() == 0) return Ok(new { message = "No orders found" });
            return Ok(orders);
        }

        [HttpGet("user/id/{id}")]
        public async Task<ActionResult> GetByUserID(int id)
        {
            var orders = await db.Orders.Include(x => x.User).Where(x => x.UserId == id).ToListAsync();
            if (orders.Count() == 0) return NotFound("No orders found");

            var dto = orders.Select(x => new OrderDto
            {
                Id = x.Id,
                Date = x.Date,
                Details = x.Details,
                Total = x.Total,
                Status = x.Status,
                UserId = x.UserId
            }).ToList();

            return Ok(dto);
        }


        [HttpGet("id/{id}")]
        public async Task<ActionResult> GetByOrderID(int id)
        {
            var order = await db.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null) return NotFound("No orders found");

            var dto = new OrderDto
            {
                Id = order.Id,
                Date = order.Date,
                Details = order.Details,
                Total = order.Total,
                Status = order.Status,
                UserId = order.UserId
            };

            return Ok(dto);
        }

        [HttpPost("register")]
        public async Task<ActionResult<OrderDto>> Register(Order order)
        {


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (order == null) return BadRequest("Empty data");

            db.Orders.Add(order);

            await db.SaveChangesAsync();

            var newOrder = new OrderDto
            {
                Id = order.Id,
                Status = order.Status,
                Details = order.Details,
                Total = order.Total,
                Date = order.Date,
                UserId = order.UserId,
            };

            return newOrder;
        }
        [HttpPut("request/{id}")]
        public async Task<ActionResult> RequestOrder(int id)
        {
            var order = await db.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null) return NotFound("No orders found");

            order.Status = "Pending";

            await db.SaveChangesAsync();
            return Ok();
        }
        [HttpPut("accept/{id}")]
        public async Task<ActionResult> AcceptOrder(int id)
        {
            var order = await db.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null) return NotFound("No orders with this ID found");

            order.Status = "Shipped";
                
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
