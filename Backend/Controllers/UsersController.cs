using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;
using Microsoft.Extensions.ObjectPool;

namespace Backend.Controllers;
public class UsersController(DataContext context) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await context.Users.ToListAsync();
        if (!users.Any()) return NotFound("No users found");
        return users;
    }

    [HttpGet("{name}")]
    public async Task<ActionResult<User>> GetUser(string name)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username.ToLower() == name.ToLower());
        if (user == null) return NotFound("No user with this name");
        return user;
    }

    [HttpDelete("{name}")]
    public async Task<ActionResult<User>> DeleteUser(string name)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username.ToLower() == name.ToLower());
        if (user == null) return NotFound("No user with this name");
        context.Users.Remove(user);
        await context.SaveChangesAsync();
        return user;
    }

    [HttpDelete("all")]
    public async Task<ActionResult<User>> DeleteAllUsers()
    {
        var users = await context.Users.ToListAsync();
        if (!users.Any()) return NotFound("No users found");
        context.RemoveRange(users);
        await context.SaveChangesAsync();
        return Ok("Done");
    }


    [HttpPut("{name}")]
    public async Task<ActionResult> UpdateUser(string name, User newUser)
    {

        var User = await context.Users.FirstOrDefaultAsync(x => x.Username.ToLower() == name.ToLower());
        if (User == null) return NotFound("No user with this name");
        User.Username = newUser.Username ?? User.Username;
        User.FirstName = newUser.FirstName ?? User.FirstName;
        User.LastName = newUser.LastName ?? User.LastName;
        User.Country = newUser.Country ?? User.Country;
        User.Address = newUser.Address ?? User.Address;
        User.PostalCode = newUser.PostalCode ?? User.PostalCode;
        User.State = newUser.State ?? User.State;
        User.City = newUser.City ?? User.City;
        User.profilePicture = newUser.profilePicture ?? User.profilePicture;

        await context.SaveChangesAsync();
        return Ok();
    }

}
