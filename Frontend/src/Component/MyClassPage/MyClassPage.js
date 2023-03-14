import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";

import Footer from "../Footer/Footer";

import { useNavigate } from "react-router-dom";
import { getMyClass } from "../../api/invoice";
import { getDateStringWithWeekday } from "../../helper/date";
import { Helmet } from "react-helmet";

const MyClassItem = (props) => {
  const { course } = props;

  const theme = useTheme();
  const poppins = theme.typography.poppins.fontFamily;
  const gray1 = theme.palette.gray1.main;
  const gray3 = theme.palette.gray3.main;

  return (
    <Box sx={{ borderBottom: "1px solid #BDBDBD" }}>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems="center"
        pb={3}
      >
        <Grid item xs="auto">
          <img
            src={`data:image;base64,${course.image_content}`}
            width="200"
            height="133"
          />
        </Grid>

        <Grid item xs>
          <Stack spacing={1} sx={{ alignSelf: "center", textAlign: "left" }}>
            <Stack spacing="4px">
              <Typography
                component="div"
                sx={{ color: gray3, fontFamily: poppins }}
              >
                {course.category_name}
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{ color: gray1, fontFamily: poppins, fontWeight: "600" }}
              >
                {course.name}
              </Typography>
            </Stack>

            <Typography variant="h6" component="div" color="secondary">
              Schedule : {getDateStringWithWeekday(course.schedule)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const MyClassPage = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getMyClass()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        const res = err?.response;

        // Redirect unauthorized user to login page
        if (res?.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>SOUP | My Class</title>
      </Helmet>
      <Container
        component={Stack}
        maxWidth="lg"
        spacing={3}
        sx={{ mt: 5, mb: 32 }}
      >
        {courses.map((course, index) => (
          <MyClassItem key={index} course={course} />
        ))}
      </Container>
      <Footer />
    </div>
  );
};

export default MyClassPage;
