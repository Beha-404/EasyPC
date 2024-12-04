using System;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Authorize]
public class AdminController(DataContext context):BaseApiController
{

    [HttpPost("Register")]
    public async Task<ActionResult<Admin>> Register(RegisterDto registerDto)
    {

        if (await Exists(registerDto.Username))
        {
            return BadRequest("Username is taken");
        }

        if (registerDto == null) return BadRequest("Admin data is null");

        var admin = new Admin
        {
            Username = registerDto.Username.ToLower(),
            Password = registerDto.Password
        };

        if (admin.Username.Length < 3 )
            return BadRequest("Username too short");

        else if(admin.Password.Length < 8)
            return BadRequest("Password too short");

        context.Admins.Add(admin);

        await context.SaveChangesAsync();

        return admin;
    }


    private async Task<bool> Exists(string username)
    {
        return await context.Admins.AnyAsync(x => x.Username.ToLower() == username.ToLower());
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
    {
        var admins = await context.Admins.ToListAsync();
        if(!admins.Any()) return NotFound("No admins found");
        return admins;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Admin>> GetAdmin(int id)
    {
        var admin = await context.Admins.FindAsync(id);
        if (admin == null) return NotFound("No admin with this ID");
        return admin;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Admin>> DeleteAdmin(int id)
    {
        var admin = await context.Admins.FindAsync(id);
        if (admin == null) return NotFound("No admin with this ID");
        context.Admins.Remove(admin);
        await context.SaveChangesAsync();
        return admin;
    }

    [HttpDelete("all")]
    public async Task<ActionResult<Admin>> DeleteAllAdmins()
    {
        var admins = await context.Admins.ToListAsync();
        if(!admins.Any()) return NotFound("No admins found");
        context.RemoveRange(admins);
        await context.SaveChangesAsync();
        return Ok("Done");
    }


    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAdmin(int id, AdminDto adminDto)
    {

        var admin = await context.Admins.FindAsync(id);
        if (admin == null) return NotFound("No admins with this ID");

        admin.Username = adminDto.Username ?? admin.Username;
        admin.Password = adminDto.Password ?? admin.Password;
        await context.SaveChangesAsync();
        return Ok();
    }
}
