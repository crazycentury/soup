using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BESoup.Logics;
using BESoup.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BESoup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : Controller
    {
        [HttpGet("PaymentMethod")]
        public ActionResult GetPaymentMethod()
        {
            try
            {
                var paymentmethod = PaymentMethodLogic.GetAllPaymentMethod();

                return Ok(paymentmethod);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost("Add")]
        [Authorize(Roles = "admin")]
        public ActionResult Addpaymentmethod([FromBody] PaymentMethodModel paymentmethod)
        {
            try
            {
                PaymentMethodLogic.SetPaymentMethod(paymentmethod.name, paymentmethod.image);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPatch("EditPaymentMethod")]
        [Authorize(Roles = "admin")]
        public ActionResult EditPaymentMethod([FromBody] PaymentMethodModel paymentmethod)
        {
            try
            {
                PaymentMethodLogic.EditPaymentMethod(paymentmethod.payment_method_id, paymentmethod.name, paymentmethod.image);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPatch("SetPaymentMethodStatus")]
        [Authorize(Roles = "admin")]
        public ActionResult SetPaymentMethodStatus([FromBody] PaymentMethodStatusModel paymentmethod)
        {
            try
            {
                PaymentMethodLogic.SetPaymentMethodStatus(paymentmethod.payment_method_id, paymentmethod.active);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

    
}

