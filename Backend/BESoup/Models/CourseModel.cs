namespace BESoup.Models
{
    public class CourseModel
    {
        public int course_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string image_content { get; set; }
        public int price { get; set; }
        public int fk_category_id { get; set; }
        public string category_name { get; set; }
    }
}
