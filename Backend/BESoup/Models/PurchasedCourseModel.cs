namespace BESoup.Models
{
    public class PurchasedCourseModel
    {
        public int course_id { get; set; }
        public int invoice_id { get; set; }

        public string name { get; set; }
        public string category_name { get; set; }
        public string? image_content { get; set; }
        public int price { get; set; }
        public string schedule { get; set; }
    }
}
