using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BESoup.Models;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MailKit.Net.Smtp;
using BESoup.Logics;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BESoup.Controllers
{
    [Route("api/[controller]")]
    public class RegistrationController : Controller
    {
        public string conString = "";
        private string frontURL = "";
        //public string jwtKey = "";
        //public string jwtKeyEmail = "";


        //Constructor
        public RegistrationController(IConfiguration configuration)
        {
            conString = configuration["ConnectionStrings:Default"];
            frontURL = configuration["Frontend:Origin"];
            //jwtKey = configuration["Jwt:Key"];
            //jwtKeyEmail = configuration["Jwt:KeyEmail"];

        }


        [HttpPost]
        [Route("Register")]
        public ActionResult Register(RegistrationModel registration)
        {
            try
            {
                if (!ValidationLogic.EmailIsValid(registration.email))
                {
                    throw new Exception("Invalid email format");
                }
                if (!ValidationLogic.PasswordIsValid(registration.password))
                {
                    throw new Exception("Password must contain at least 8 alphanumeric characters");
                }
                if (AuthLogic.EmailIsRegistered(registration.email))
                {
                    throw new Exception("Email is already registered");
                }

                RegistrationLogic.RegisterUser(registration);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("UserActivation/{token}")]
        public ActionResult UserActivation(string token)
        {
            try
            {
                RegistrationLogic.ActivateUser(token);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

