using BESoup.Models;
using System.Data;
using System.Data.SqlClient;

namespace BESoup.Logics
{
    public static class InvoiceLogic
    {
        public static int GetUserIdFromInvoiceId(int invoiceId)
        {
            var query = "SELECT fk_user_id FROM invoice WHERE invoice_id = @InvoiceId;";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@InvoiceId", SqlDbType.Int) { Value = invoiceId },
            };
            var queryResult = DBLogic.ExecuteQuery(query, sqlParams);

            if (queryResult.Rows.Count == 0)
            {
                throw new Exception("Invoice does not exist");
            }

            var row = queryResult.Rows[0];
            var userId = (int)row["fk_user_id"];

            return userId;
        }

        public static List<UserInvoiceModel> GetAllUserInvoices()
        {
            var userInvoices = new List<UserInvoiceModel>();

            var query = @"
                SELECT
                    i.invoice_id,
                    i.fk_payment_method_id,
                    i.no_invoice,
                    CAST(i.[date] AS VARCHAR) AS [date],
                    u.email,
                    t1.total_course,
                    t1.total_price
                FROM invoice i
                JOIN [user] u ON i.fk_user_id = u.[user_id]
                JOIN (
                    SELECT
                        i.invoice_id,
                        COUNT(c.course_id) AS total_course,
                        SUM(c.price) AS total_price
                    FROM invoice i
                    JOIN detail_invoice d ON i.invoice_id = d.fk_invoice_id
                    JOIN course c ON d.fk_course_id = c.course_id
                    GROUP BY i.invoice_id
                ) AS t1 ON i.invoice_id = t1.invoice_id
                ORDER BY i.invoice_id DESC;
            ";
            var queryResult = DBLogic.ExecuteQuery(query);

            foreach (DataRow row in queryResult.Rows)
            {
                var userInvoice = new UserInvoiceModel
                {
                    invoice_id = (int)row["invoice_id"],
                    fk_payment_method_id = (int)row["fk_payment_method_id"],
                    no_invoice = (string)row["no_invoice"],
                    date = (string)row["date"],
                    email = (string)row["email"],
                    total_course = (int)row["total_course"],
                    total_price = (int)row["total_price"],
                };
                userInvoices.Add(userInvoice);
            }

            return userInvoices;
        }

        public static List<InvoiceModel> GetInvoicesByUserId(int userId)
        {
            var result = new List<InvoiceModel>();

            var query = @"
                SELECT
                    i.invoice_id,
                    i.fk_payment_method_id,
                    i.no_invoice,
                    CAST(i.[date] AS VARCHAR) AS [date],
                    t1.total_course,
                    t1.total_price
                FROM invoice i
                JOIN (
                    SELECT
                        i.invoice_id,
                        COUNT(c.course_id) AS total_course,
                        SUM(c.price) AS total_price
                    FROM invoice i
                    JOIN detail_invoice d ON i.invoice_id = d.fk_invoice_id
                    JOIN course c ON d.fk_course_id = c.course_id
                    GROUP BY i.invoice_id
                ) AS t1 ON i.invoice_id = t1.invoice_id
                WHERE i.fk_user_id = @UserId
                ORDER BY i.invoice_id DESC;
            ";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@UserId", SqlDbType.Int) { Value = userId },
            };

            var queryResult = DBLogic.ExecuteQuery(query, sqlParams);
            foreach (DataRow row in queryResult.Rows)
            {
                var invoice = new InvoiceModel
                {
                    invoice_id = (int)row["invoice_id"],
                    fk_payment_method_id = (int)row["fk_payment_method_id"],
                    no_invoice = (string)row["no_invoice"],
                    date = (string)row["date"],
                    total_course = (int)row["total_course"],
                    total_price = (int)row["total_price"]
                };
                result.Add(invoice);
            }

            return result;
        }

        public static InvoiceModel GetInvoiceById(int invoiceId)
        {
            var query = @"
                SELECT
                    i.fk_payment_method_id,
                    i.no_invoice,
                    CAST(i.[date] AS VARCHAR) AS [date],
                    t1.total_price
                FROM invoice i
                JOIN (
                    SELECT
                        i.invoice_id,
                        SUM(c.price) AS total_price
                    FROM invoice i
                    JOIN detail_invoice d ON i.invoice_id = d.fk_invoice_id
                    JOIN course c ON d.fk_course_id = c.course_id
                    GROUP BY i.invoice_id
                ) AS t1 ON i.invoice_id = t1.invoice_id
                WHERE i.invoice_id = @InvoiceId;
            ";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@InvoiceId", SqlDbType.Int) { Value = invoiceId },
            };
            var queryResult = DBLogic.ExecuteQuery(query, sqlParams);

            if (queryResult.Rows.Count == 0)
            {
                throw new Exception("Invoice does not exist");
            }

            var row = queryResult.Rows[0];
            var invoice = new InvoiceModel
            {
                invoice_id = invoiceId,
                fk_payment_method_id = (int)row["fk_payment_method_id"],
                no_invoice = (string)row["no_invoice"],
                date = (string)row["date"],
                total_price = (int)row["total_price"],
            };

            return invoice;
        }

        public static List<PurchasedCourseModel> GetPurchasedCoursesByInvoiceId(int invoiceId)
        {
            var purchasedCourses = new List<PurchasedCourseModel>();

            var query = @"
                SELECT
                    co.course_id,
                    co.name,
                    ca.[name] AS category_name,
                    co.price,
                    CAST(d.schedule AS VARCHAR) AS schedule
                FROM detail_invoice d
                JOIN course co ON d.fk_course_id = co.course_id
                JOIN category ca ON co.fk_category_id = ca.category_id
                WHERE d.fk_invoice_id = @InvoiceId;
            ";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@InvoiceId", SqlDbType.Int) { Value = invoiceId },
            };

            var queryResult = DBLogic.ExecuteQuery(query, sqlParams);
            foreach (DataRow row in queryResult.Rows)
            {
                var purchasedCourse = new PurchasedCourseModel
                {
                    course_id = (int)row["course_id"],
                    invoice_id = invoiceId,
                    name = (string)row["name"],
                    category_name = (string)row["category_name"],
                    price = (int)row["price"],
                    schedule = (string)row["schedule"],
                };
                purchasedCourses.Add(purchasedCourse);
            }

            return purchasedCourses;
        }

        public static List<PurchasedCourseModel> GetPurchasedCoursesByUserId(int userId)
        {
            var purchasedCourses = new List<PurchasedCourseModel>();

            var query = @"
                SELECT
                    co.course_id,
                    i.invoice_id,
                    co.[name],
                    ca.[name] AS category_name,
                    co.image_content,
                    co.price,
                    CAST(d.schedule AS VARCHAR) AS schedule
                FROM invoice i
                JOIN detail_invoice d ON i.invoice_id = d.fk_invoice_id
                JOIN course co ON d.fk_course_id = co.course_id
                JOIN category ca ON co.fk_category_id = ca.category_id
                WHERE
                    i.fk_user_id = @UserId AND
                    d.schedule >= CAST(GETDATE() AS DATE)
                ORDER BY d.schedule;
            ";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("UserId", SqlDbType.Int) { Value = userId },
            };
            var queryResult = DBLogic.ExecuteQuery(query, sqlParams);

            foreach (DataRow row in queryResult.Rows)
            {
                var purchasedCourse = new PurchasedCourseModel
                {
                    course_id = (int)row["course_id"],
                    invoice_id = (int)row["invoice_id"],
                    name = (string)row["name"],
                    category_name = (string)row["category_name"],
                    image_content = (string)row["image_content"],
                    price = (int)row["price"],
                    schedule = (string)row["schedule"],
                };
                purchasedCourses.Add(purchasedCourse);
            }

            return purchasedCourses;
        }
    }
}
