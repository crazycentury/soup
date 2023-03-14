using BESoup.Logics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BESoup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        [HttpGet("UserInvoices")]
        [Authorize]
        public ActionResult UserInvoices([FromHeader] string Authorization)
        {
            try
            {
                var userId = AuthLogic.GetUserIdFromAuthorization(Authorization);
                var invoices = InvoiceLogic.GetInvoicesByUserId(userId);

                return Ok(invoices);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("AllUserInvoices")]
        [Authorize(Roles = "admin")]
        public ActionResult AllUserInvoices()
        {
            try
            {
                var userInvoices = InvoiceLogic.GetAllUserInvoices();
                return Ok(userInvoices);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DetailInvoice")]
        [Authorize]
        public ActionResult DetailInvoice([FromHeader] string Authorization, [FromQuery] int invoice_id)
        {
            try
            {
                var jwt = AuthLogic.GetJwtFromAuthorization(Authorization);
                var userData = AuthLogic.GetUserDataFromToken(jwt);

                // Prevent a regular user from accessing invoice of another user
                if (userData.role_name != "admin")
                {
                    var userId = AuthLogic.GetUserIdByEmail(userData.email);
                    var invoiceOwnerId = InvoiceLogic.GetUserIdFromInvoiceId(invoice_id);

                    if (userId != invoiceOwnerId) return Forbid();
                }

                var invoice = InvoiceLogic.GetInvoiceById(invoice_id);
                var purchased_courses = InvoiceLogic.GetPurchasedCoursesByInvoiceId(invoice_id);
                var result = new
                {
                    invoice,
                    purchased_courses,
                };

                return Ok(result);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("MyClass")]
        [Authorize]
        public ActionResult MyClass([FromHeader] string Authorization)
        {
            try
            {
                var userId = AuthLogic.GetUserIdFromAuthorization(Authorization);
                var purchasedCourses = InvoiceLogic.GetPurchasedCoursesByUserId(userId);

                return Ok(purchasedCourses);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
