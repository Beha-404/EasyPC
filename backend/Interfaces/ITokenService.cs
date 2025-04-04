using System;
using Backend.Models;

namespace Backend.Interfaces;

public interface ITokenService
{
    string CreateToken(User user);
}
