namespace BESoup.Models
{
    public class UserInvoiceModel
    {
        public int invoice_id { get; set; }
        public int fk_payment_method_id { get; set; }

        public string no_invoice { get; set; }
        public string date { get; set; }

        public string email { get; set; }
        public int total_course { get; set; }
        public int total_price { get; set; }
    }
}
