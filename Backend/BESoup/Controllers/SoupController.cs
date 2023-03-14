using BESoup.Logics;
using BESoup.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BESoup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoupController : ControllerBase
    {
        [HttpGet("ListMenuClass")]
        public ActionResult ListMenuClass([FromQuery] int categoryId)
        {
            try
            {
                CategoryModel category = SoupLogic.GetCategoryById(categoryId);
                List<CourseModel> courses = SoupLogic.GetCoursesByCategoryId(categoryId, 9);
                object result = new
                {
                    category,
                    courses
                };

                return Ok(result);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("LandingPage")]
        public ActionResult LandingPage()
        {
            try
            {
                List<CourseModel> courses = SoupLogic.GetCourses(6);
                List<CategoryModel> categories = SoupLogic.GetAllCategories();
                object result = new
                {
                    courses,
                    categories
                };

                return Ok(result);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("DetailClass")]
        public ActionResult DetailClass([FromQuery] int courseId)
        {
            try
            {
                CourseModel course = SoupLogic.GetCourseById(courseId);
                List<CourseModel> other_courses = SoupLogic.GetCoursesByCategoryId(course.fk_category_id, 9).FindAll(
                    c => c.course_id != course.course_id
                );
                object result = new
                {
                    course,
                    other_courses
                };

                return Ok(result);
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost("Checkout")]
        public ActionResult Checkout([FromBody] CartDataModel listcourseid)
        {
            try
            {
                var courses = new List<CourseModel>();
                //List<CourseModel> course = SoupLogic.GetCourseById(courseId);

                 foreach (var courseId in listcourseid.listcourseid)
                {
                    var course = SoupLogic.GetCourseById(courseId);
                    courses.Add(course);
                }
                var result = new { courses };

                return Ok(courses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
