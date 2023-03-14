import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import BaseAdminView from "../BaseAdminView/BaseAdminView";
import DataTable from "../DataTable/DataTable";

import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hook/useAuth";

import { Helmet } from "react-helmet";
import { getDetailInvoice } from "../../api/invoice";
import { getDateString, getDateStringWithWeekday } from "../../helper/date";

const tableHeaders = ["No", "Course Name", "Type", "Schedule", "Price"];

const DetailInvoicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isValidatingToken } = useAuth();

  const [invoice, setInvoice] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isValidatingToken) return;
    if (!user) {
      navigate("/");
      return;
    }

    getDetailInvoice(id)
      .then((res) => {
        const data = res.data;
        setInvoice(data.invoice);
        setCourses(data.purchased_courses);
      })
      .catch((err) => {
        const res = err?.response;

        if (res?.status === 403) {
          navigate("/");
        }
      })
      .finally(() => setLoading(false));
  }, [user, isValidatingToken, id]);

  const textStyle = {
    fontSize: "1.125rem",
    fontWeight: "500",
  };

  const boldTextStyle = {
    ...textStyle,
    fontWeight: "700",
  };

  return (
    <BaseAdminView>
      {loading ? <LinearProgress /> : null}
      <Helmet>
        <title>SOUP | Detail Invoice</title>
      </Helmet>
      <Box
        sx={{
          width: "calc(100% - 64px)",
          m: "32px auto",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{
            color: "gray2.main",
            textAlign: "left",
            fontWeight: "700",
            mb: "30px",
          }}
        >
          Details Invoice
        </Typography>

        <Grid
          container
          justifyContent="space-between"
          spacing={4}
          mb="42px"
          sx={{ color: "gray2.main" }}
        >
          <Grid item xs="auto">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, auto)",
                gap: "8px 24px",
                textAlign: "left",
              }}
            >
              <Typography sx={textStyle}>No. Invoice :</Typography>
              <Typography sx={textStyle}>{invoice.no_invoice}</Typography>

              <Typography sx={textStyle}>Date :</Typography>
              <Typography sx={textStyle}>
                {invoice.date && getDateString(invoice.date)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs="auto" alignSelf="flex-end">
            <Stack direction="row" spacing={3}>
              <Typography sx={boldTextStyle}>Total Price</Typography>
              <Typography sx={boldTextStyle}>
                {invoice.total_price &&
                  `IDR ${invoice.total_price.toLocaleString("id")}`}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <DataTable
          headers={tableHeaders}
          rows={courses.map((course, index) => [
            index + 1,
            course.name,
            course.category_name,
            getDateStringWithWeekday(course.schedule),
            `IDR ${course.price.toLocaleString("id")}`,
          ])}
          maxWidth="100%"
        />
      </Box>
    </BaseAdminView>
  );
};

export default DetailInvoicePage;
