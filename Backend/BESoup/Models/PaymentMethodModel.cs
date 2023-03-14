using System;
namespace BESoup.Models
{
    public class PaymentMethodModel
    {
        public int payment_method_id { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public bool active { get; set; }
    }
}

