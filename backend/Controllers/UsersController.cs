using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<ActionResult<User>> GetUserByName(string name)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username.ToLower() == name.ToLower());
        if (user == null) return NotFound("No user with this name");
        return user;
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
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

    [HttpDelete("delete/all")]
    public async Task<ActionResult<User>> DeleteAllUsers()
    {
        var users = await context.Users.ToListAsync();
        if (!users.Any()) return NotFound("No users found");
        context.RemoveRange(users);
        await context.SaveChangesAsync();
        return Ok("Done");
    }




    [HttpPut("{name}")]
    public async Task<ActionResult> UpdateUser(string name, IFormCollection form)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username.ToLower() == name.ToLower());
        if (user == null) return NotFound("No user with this name");

        user.Username = form["Username"].FirstOrDefault() ?? user.Username;
        user.FirstName = form["FirstName"].FirstOrDefault() ?? user.FirstName;
        user.LastName = form["LastName"].FirstOrDefault() ?? user.LastName;
        user.Country = form["Country"].FirstOrDefault() ?? user.Country;
        user.Address = form["Address"].FirstOrDefault() ?? user.Address;
        user.PostalCode = form["PostalCode"].FirstOrDefault() ?? user.PostalCode;
        user.State = form["State"].FirstOrDefault() ?? user.State;
        user.City = form["City"].FirstOrDefault() ?? user.City;

        if (form.Files.Any())
        {
            var file = form.Files.First();
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            user.profilePicture = memoryStream.ToArray();
        }

        await context.SaveChangesAsync();
        return Ok();
    }

}
