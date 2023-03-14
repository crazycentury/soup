import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";

import { Link, useParams } from "react-router-dom";

import { getListMenuClass } from "../../api/soup";

import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

const ClassCard = (props) => {
  const { course } = props;

  const theme = useTheme();
  const gray3 = theme.palette.gray3.main;

  const detailPath = `/detailkelaspage/${course.course_id}`;

  return (
    <Stack spacing={2} sx={{ width: "350px", mx: "auto" }}>
      <Link to={detailPath}>
        <img
          src={`data:image;base64,${course.image_content}`}
          width="350"
          height="233"
        />
      </Link>
      <Stack spacing={1} sx={{ textAlign: "left", paddingBottom: "24px" }}>
        <Stack spacing="4px">
          <Typography paragraph={true} sx={{ margin: "0", color: gray3 }}>
            {course.category_name}
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            color="primary"
            sx={{ height: "70px", fontWeight: "600" }}
          >
            <Link to={detailPath}>{course.name}</Link>
          </Typography>
        </Stack>
        <Typography
          paragraph={true}
          color="secondary"
          sx={{ fontSize: "20px", fontWeight: "600" }}
        >
          IDR {course.price.toLocaleString("id")}
        </Typography>
      </Stack>
    </Stack>
  );
};

const ListMenuClass = (props) => {
  const { courses } = props;

  return (
    <Container maxWidth={false} mx={8}>
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        sx={{ mb: 10, textAlign: "center", fontWeight: "600" }}
      >
        Another menu in this class
      </Typography>
      <Grid container columnSpacing={3} rowSpacing={5}>
        {courses.map((course, key) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={key}>
            <ClassCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const ListMenuKelasPage = () => {
  const { categoryId } = useParams();
  const [data, setData] = useState(null);

  const theme = useTheme();
  const gray1 = theme.palette.gray1.main;

  useEffect(() => {
    setData(null);
    getListMenuClass(categoryId)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryId]);

  if (!data) return null;

  return (
    <div>
      <Helmet>
        <title>SOUP | List by Category </title>
      </Helmet>
      <Box
        component="img"
        src="/listmenukelaspageimagetop.png"
        sx={{ width: 1, marginBottom: "46px" }}
      />
      <Container maxWidth="lg" sx={{ mb: 16 }}>
        <Typography
          variant="h5"
          component="h1"
          mb={2}
          sx={{ fontWeight: "600" }}
        >
          {data.category.name}
        </Typography>
        <Typography paragraph={true} sx={{ color: gray1 }}>
          {data.category.description}
        </Typography>
      </Container>
      <ListMenuClass courses={data.courses} />
      <Footer mt={16} />
    </div>
  );
};

export default ListMenuKelasPage;
export { ListMenuClass };
