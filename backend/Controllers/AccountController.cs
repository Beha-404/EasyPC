using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

public class AccountController(DataContext context) : BaseApiController
{

    [HttpPost("Register")]
    public async Task<ActionResult<UserDto>> RegisterUser(RegisterDto registerDto)
    {
        if (registerDto == null) return BadRequest("User data empty");
        if (await Exists(registerDto.Username))
        {
            return BadRequest("Username is taken");
        }

        if (registerDto.Username == string.Empty)
            return BadRequest("username too short");

        var defaultProfilePicturePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "userIcon.png");

        if (!System.IO.File.Exists(defaultProfilePicturePath))
        {
            return StatusCode(500, "Profile picture not found.");
        }
        var defaultProfilePicture = await System.IO.File.ReadAllBytesAsync(defaultProfilePicturePath);


        var user = new User
        {
            Username = registerDto.Username.ToLower(),
            profilePicture = defaultProfilePicture,
            Password = registerDto.Password,
            Email = registerDto.Email
        };

        if (user.Username.Length < 5)
            return BadRequest("Username too short");

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.Username,
            Password = user.Password,
            Role = user.Role,
            Email = user.Email
        };
    }

    [HttpPost("Login")]
    public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("User not found (invalid username)");

        if (user.Password != loginDto.Password) return BadRequest("Wrong password try again");

        return new UserDto
        {
            Username = user.Username,
            Password = user.Password,
            Role = user.Role,
            Id = user.Id
        };
    }

    private async Task<bool> Exists(string username)
    {
        return await context.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower());
    }

}
