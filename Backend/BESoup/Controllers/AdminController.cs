using BESoup.Logics;
using BESoup.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BESoup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet("Users")]
        [Authorize(Roles = "admin")]
        public ActionResult Users()
        {
            try
            {
                var users = AdminLogic.GetAllUsers();

                return Ok(users);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPatch("SetUserActiveStatus")]
        [Authorize(Roles = "admin")]
        public ActionResult SetUserActiveStatus([FromBody] UserActiveStatusModel userActiveStatus)
        {
            try
            {
                AdminLogic.SetUserActive(userActiveStatus.user_id, userActiveStatus.active);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddUser")]
        [Authorize(Roles = "admin")]
        public ActionResult AddUser([FromBody] UserFormModel userForm)
        {
            try
            {
                if (!ValidationLogic.EmailIsValid(userForm.email))
                {
                    throw new Exception("Invalid email format");
                }
                if (!ValidationLogic.PasswordIsValid(userForm.password))
                {
                    throw new Exception("Password must contain at least 8 alphanumeric characters");
                }
                if (AuthLogic.EmailIsRegistered(userForm.email))
                {
                    throw new Exception("Email is already registered");
                }

                AdminLogic.AddUser(userForm.fk_role_id, userForm.name, userForm.email, userForm.password);
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("EditUser")]
        [Authorize(Roles = "admin")]
        public ActionResult EditUser([FromBody] UserFormModel userForm)
        {
            try
            {
                if (!ValidationLogic.EmailIsValid(userForm.email))
                {
                    throw new Exception("Invalid email format");
                }
                if (!ValidationLogic.PasswordIsValid(userForm.password))
                {
                    throw new Exception("Password must contain at least 8 alphanumeric characters");
                }
                if (AuthLogic.EmailIsRegisteredByOther(userForm.user_id, userForm.email))
                {
                    throw new Exception("Email is already registered");
                }

                AdminLogic.EditUser(userForm.user_id, userForm.fk_role_id, userForm.name, userForm.email, userForm.password);
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
