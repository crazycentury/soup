using BESoup.Logics;
using BESoup.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BESoup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        [HttpPost("Pay")]
        [Authorize]
        public ActionResult Pay([FromHeader] string Authorization, [FromBody] CheckoutModel checkout)
        {
            try
            {
                if (checkout.items.Count == 0)
                {
                    throw new Exception("You must choose at least 1 item");
                }

                var userId = AuthLogic.GetUserIdFromAuthorization(Authorization);
                checkout.fk_user_id = userId;
                PaymentLogic.Pay(checkout);

                return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
