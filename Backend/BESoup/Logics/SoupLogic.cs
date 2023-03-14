using BESoup.Models;
using System.Data;
using System.Data.SqlClient;

namespace BESoup.Logics
{
    public static class SoupLogic
    {
        public static List<CategoryModel> GetAllCategories()
        {
            List<CategoryModel> categories = new List<CategoryModel>();

            string categoriesQuery = "SELECT category_id, [name], [description], [image] FROM category ORDER BY category_id;";
            DataTable categoriesData = DBLogic.ExecuteQuery(categoriesQuery);

            foreach (DataRow categoryRow in categoriesData.Rows)
            {
                CategoryModel category = new CategoryModel
                {
                    category_id = (int)categoryRow["category_id"],
                    name = (string)categoryRow["name"],
                    description = categoryRow.IsNull("description") ? "" : (string)categoryRow["description"],
                    image = categoryRow.IsNull("image") ? "" : (string)categoryRow["image"]
                };
                categories.Add(category);
            }

            return categories;
        }

        public static List<CourseModel> GetCourses(int maxCount)
        {
            List<CourseModel> courses = new List<CourseModel>();

            string coursesQuery = @"
                SELECT TOP (@MaxCount)
                    co.course_id,
                    co.[name],
                    co.[description],
                    co.image_content,
                    co.price,
                    co.fk_category_id,
                    ca.[name] AS category_name
                FROM course co
                JOIN category ca ON co.fk_category_id = ca.category_id
                ORDER BY course_id;
            ";
            SqlParameter[] coursesParams = new SqlParameter[]
            {
                new SqlParameter("@MaxCount", SqlDbType.Int) { Value = maxCount }
            };
            DataTable coursesData = DBLogic.ExecuteQuery(coursesQuery, coursesParams);

            foreach (DataRow courseRow in coursesData.Rows)
            {
                CourseModel course = new CourseModel
                {
                    course_id = (int)courseRow["course_id"],
                    name = (string)courseRow["name"],
                    description = courseRow.IsNull("description") ? "" : (string)courseRow["description"],
                    image_content = courseRow.IsNull("image_content") ? "" : (string)courseRow["image_content"],
                    price = (int)courseRow["price"],
                    fk_category_id = (int)courseRow["fk_category_id"],
                    category_name = (string)courseRow["category_name"]
                };
                courses.Add(course);
            }

            return courses;
        }

        public static CategoryModel GetCategoryById(int categoryId)
        {
            string categoryQuery = "SELECT [name], [description], [image] FROM category WHERE category_id = @CategoryId";
            SqlParameter[] categoryParams = new SqlParameter[]
            {
                new SqlParameter("@CategoryId", SqlDbType.Int) { Value = categoryId }
            };
            DataTable categoryData = DBLogic.ExecuteQuery(categoryQuery, categoryParams);

            // Category with the given id does not exist in the table
            if (categoryData.Rows.Count == 0)
            {
                throw new Exception($"Category ID does not exist: {categoryId}");
            }

            DataRow categoryRow = categoryData.Rows[0];
            CategoryModel category = new CategoryModel
            {
                category_id = categoryId,
                name = (string)categoryRow["name"],
                description = categoryRow.IsNull("description") ? "" : (string)categoryRow["description"],
                image = categoryRow.IsNull("image") ? "" : (string)categoryRow["image"]
            };

            return category;
        }

        public static CourseModel GetCourseById(int courseId)
        {
            string courseQuery = @"
                SELECT
                    co.[name],
                    co.[description],
                    co.image_content,
                    co.price,
                    co.fk_category_id,
                    ca.[name] as category_name
                FROM course co
                JOIN category ca ON co.fk_category_id = ca.category_id
                WHERE co.course_id = @CourseId;
            ";
            SqlParameter[] courseParams = new SqlParameter[]
            {
                new SqlParameter("@CourseId", SqlDbType.Int) { Value = courseId }
            };
            DataTable courseData = DBLogic.ExecuteQuery(courseQuery, courseParams);

            // Course with the given id does not exist
            if (courseData.Rows.Count == 0)
            {
                throw new Exception($"Course ID does not exist: {courseId}");
            }

            DataRow courseRow = courseData.Rows[0];
            CourseModel course = new CourseModel
            {
                course_id = courseId,
                name = (string)courseRow["name"],
                description = courseRow.IsNull("description") ? "" : (string)courseRow["description"],
                image_content = courseRow.IsNull("image_content") ? "" : (string)courseRow["image_content"],
                price = (int)courseRow["price"],
                fk_category_id = (int)courseRow["fk_category_id"],
                category_name = (string)courseRow["category_name"]
            };

            return course;
        }

        public static List<CourseModel> GetCoursesByCategoryId(int categoryId, int maxCount)
        {
            List<CourseModel> courses = new List<CourseModel>();

            string coursesQuery = @"
                SELECT TOP (@MaxCount)
                    co.course_id,
                    co.[name],
                    co.[description],
                    co.image_content,
                    co.price,
                    ca.[name] AS category_name
                FROM course co
                JOIN category ca ON co.fk_category_id = ca.category_id
                WHERE co.fk_category_id = @CategoryId
                ORDER BY co.course_id;
            ";
            SqlParameter[] coursesParams = new SqlParameter[]
            {
                new SqlParameter("@CategoryId", SqlDbType.Int) { Value = categoryId },
                new SqlParameter("@MaxCount", SqlDbType.Int) { Value = maxCount }
            };
            DataTable coursesData = DBLogic.ExecuteQuery(coursesQuery, coursesParams);

            foreach (DataRow courseRow in coursesData.Rows)
            {
                CourseModel course = new CourseModel
                {
                    course_id = (int)courseRow["course_id"],
                    name = (string)courseRow["name"],
                    description = courseRow.IsNull("description") ? "" : (string)courseRow["description"],
                    image_content = courseRow.IsNull("image_content") ? "" : (string)courseRow["image_content"],
                    price = (int)courseRow["price"],
                    fk_category_id = categoryId,
                    category_name = (string)courseRow["category_name"]
                };
                courses.Add(course);
            }

            return courses;
        }
    }
}
