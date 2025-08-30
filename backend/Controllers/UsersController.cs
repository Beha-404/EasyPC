using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Authorize]
public class UsersController(DataContext context) : BaseApiController
{
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
        if (user == null) return NotFound("No user with this id");
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

        var currentUsername = User.Identity?.Name;
        if (currentUsername == null || currentUsername.ToLower() != name.ToLower())
            return Forbid("You can only edit your own profile.");

        var firstName = form["firstName"].FirstOrDefault();
        if(string.IsNullOrWhiteSpace(firstName) || firstName.Length < 2 || firstName.Length > 40)
            return BadRequest("First Name must be between 2 and 40 characters long.");

        var lastName = form["lastName"].FirstOrDefault();
        if(string.IsNullOrWhiteSpace(lastName) || lastName.Length < 2 || lastName.Length > 40)
            return BadRequest("Last Name must be between 2 and 40 characters long.");

        var country = form["country"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(country) || country.Length < 2 || country.Length > 40)
            return BadRequest("Country must be between 2 and 40 characters long.");

        var postalCode = form["postalCode"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(postalCode) || postalCode.Length < 2 || postalCode.Length > 20)
            return BadRequest("Postal Code must be between 2 and 20 characters long.");

        var state = form["state"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(state) || state.Length < 2 || state.Length > 40)
            return BadRequest("State must be between 2 and 40 characters long.");

        var city = form["city"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(city) || city.Length < 2 || city.Length > 40)
            return BadRequest("City must be between 2 and 40 characters long.");

        user.Username = form["username"].FirstOrDefault() ?? user.Username;
        user.FirstName = form["firstName"].FirstOrDefault() ?? user.FirstName;
        user.LastName = form["lastName"].FirstOrDefault() ?? user.LastName;
        user.Country = form["country"].FirstOrDefault() ?? user.Country;
        user.PostalCode = form["postalCode"].FirstOrDefault() ?? user.PostalCode;
        user.State = form["state"].FirstOrDefault() ?? user.State;
        user.City = form["city"].FirstOrDefault() ?? user.City;

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
