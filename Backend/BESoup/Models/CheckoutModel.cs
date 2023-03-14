namespace BESoup.Models
{
    public class CheckoutModel
    {
        public int fk_user_id { get; set; }
        public int fk_payment_method_id { get; set; }

        public List<CheckoutItemModel> items { get; set; }
    }

    public class CheckoutItemModel
    {
        public int fk_course_id { get; set; }
        public string schedule { get; set; }
    }
}
