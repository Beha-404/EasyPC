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
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers;
public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
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

        var hmac = new HMACSHA512();

        var user = new User
        {
            Username = registerDto.Username.ToLower(),
            profilePicture = defaultProfilePicture,
            Password = registerDto.Password,
            Hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            Salt = hmac.Key,
            Email = registerDto.Email
        };

        if (user.Username.Length < 3)
            return BadRequest("Username too short");

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto
        {
            ID = user.Id,
            Username = user.Username,
            Token = tokenService.CreateToken(user),
            Role = user.Role
        };
    }

    [HttpPost("Login")]
    public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("User not found");

        var hmac = new HMACSHA512(user.Salt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.Hash[i]) return Unauthorized("Invalid password");
        }

        return new UserDto
        {
            ID = user.Id,
            Username = user.Username,
            Token = tokenService.CreateToken(user),
            Role = user.Role
        };
    }

    private async Task<bool> Exists(string username)
    {
        return await context.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower());
    }

}
