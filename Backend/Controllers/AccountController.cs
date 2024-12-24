using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Backend.Data;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{

    [HttpPost("Register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (registerDto == null) return BadRequest("User data empty");
        if (await Exists(registerDto.Username))
        {
            return BadRequest("Username is taken");
        }

        using var hmac = new HMACSHA512();

        var defaultProfilePicturePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "userIcon.png");

        if (!System.IO.File.Exists(defaultProfilePicturePath))
        {
            return StatusCode(500, "Profile picture not found.");
        }
        var defaultProfilePicture = await System.IO.File.ReadAllBytesAsync(defaultProfilePicturePath);


        var user = new User
        {
            Username = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key,
            profilePicture = defaultProfilePicture
        };

        if (user.Username.Length < 5)
            return BadRequest("Username too short");

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.Username,
            Token = tokenService.CreateToken(user),
        };
    }

    [HttpPost("Login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("User not found (invalid username)");

        using var hmac = new HMACSHA512(user.PasswordSalt!);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash![i]) return Unauthorized("Invalid password");
        }

        return new UserDto
        {
            Username = user.Username,
            Token = tokenService.CreateToken(user),
        };
    }

    private async Task<bool> Exists(string username)
    {
        return await context.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower());
    }

}
