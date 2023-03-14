using BESoup.Logics;
using BESoup.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BESoup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("Login")]
        public ActionResult Login([FromBody] LoginFormModel loginForm)
        {
            try
            {
                if (!ValidationLogic.EmailIsValid(loginForm.email))
                {
                    throw new Exception("Invalid email format");
                }
                if (!ValidationLogic.PasswordIsValid(loginForm.password))
                {
                    throw new Exception("Password must contain at least 8 alphanumeric characters");
                }

                UserModel user = AuthLogic.GetActiveUser(loginForm.email, loginForm.password);
                string token = AuthLogic.GetUserToken(user);

                // Don't return the secret information of the user
                UserDataModel user_data = UserDataModel.FromUserModel(user);

                object result = new
                {
                    user_data,
                    token
                };

                return Ok(result);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("ValidateToken")]
        public ActionResult ValidateToken([FromBody] TokenModel token)
        {
            try
            {
                UserDataModel userData = AuthLogic.GetUserDataFromToken(token.token);

                return Ok(userData);
            } catch (Exception)
            {
                return BadRequest("Invalid authorization token");
            }
        }

        [HttpPost("AskResetPassword")]
        public ActionResult AskResetPassword([FromBody] EmailFormModel emailForm)
        {
            try
            {
                string email = emailForm.email;

                if (!ValidationLogic.EmailIsValid(email))
                {
                    throw new Exception("Invalid email format");
                }
                if (!AuthLogic.EmailIsRegistered(email))
                {
                    throw new Exception("Email not registered");
                }

                string passwordResetToken = AuthLogic.CreatePasswordResetToken(email);

                SendEmail.SendResetPasswordToken(email, passwordResetToken);

                return Ok();
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPatch("NewPassword")]
        public ActionResult NewPassword([FromBody] NewPasswordModel newpassword)
        {
            try
            {
                if (!ValidationLogic.PasswordIsValid(newpassword.password))
                {
                    throw new Exception("Password must contain at least 8 alphanumeric characters");
                }

                NewPasswordLogic.NewPassword(newpassword.token, newpassword.password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
