import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";

import { useNavigate, useParams } from "react-router-dom";

import { addCartItem } from "../../api/payment";
import { getDetailClass } from "../../api/soup";
import { getDateStringWithWeekday, getISODateString } from "../../helper/date";

import AlertDialog from "../AlertDialog/AlertDialog";
import Footer from "../Footer/Footer";
import { ListMenuClass } from "../ListMenuKelasPage/ListMenuKelasPage";
import { Helmet } from "react-helmet";

function getScheduleList(n) {
  const scheduleList = [];
  let prevDate = new Date();

  for (let i = 0; i < n; i++) {
    const nextDate = new Date(prevDate);
    nextDate.setDate(prevDate.getDate() + 1);

    scheduleList.push(nextDate);
    prevDate = nextDate;
  }

  return scheduleList;
}

const DetailKelasPage = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const gray1 = theme.palette.gray1.main;
  const gray3 = theme.palette.gray3.main;
  const poppins = theme.typography.poppins.fontFamily;

  const buttonStyle = {
    maxWidth: "234px",
    textTransform: "none",
    color: primaryColor,
    borderRadius: "8px",
    flexGrow: 1,
  };

  const { courseId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [schedule, setSchedule] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const schedules = getScheduleList(7).map((date) => {
      return {
        dateString: getDateStringWithWeekday(date),
        isoDateString: getISODateString(date),
      };
    });

    setScheduleList(schedules);
  }, []);

  useEffect(() => {
    setData(null);
    getDetailClass(courseId)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId]);

  const changeSchedule = (event) => {
    setSchedule(event.target.value);
  };

  const tryAddToCart = () => {
    if (!schedule) throw "Please select the schedule first";

    addCartItem(data.course.course_id, schedule);
  };

  const addToCart = () => {
    try {
      tryAddToCart();
      setAlertMsg("Successfully Added to Cart");
      setAlertType("success");
      setOpenAlert(true);
      console.log(addCartItem);
    } catch (msg) {
      setAlertMsg(msg);
      setAlertType("error");
      setOpenAlert(true);
    }
  };

  const buyNow = () => {
    try {
      tryAddToCart();
      console.log(addCartItem);
      navigate("/checkout");
    } catch (msg) {
      setAlertMsg(msg);
      setAlertType("error");
      setOpenAlert(true);
    }
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  if (!data) return null;

  return (
    <div>
      <Helmet>
        <title>SOUP | Detail Course</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 20 }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md="auto">
            <Box
              sx={{
                maxWidth: 400,
                height: { xs: "auto", md: 267 },
                mx: "auto",
              }}
            >
              <img
                src={`data:image;base64,${data.course.image_content}`}
                width="100%"
                height="100%"
              />
            </Box>
          </Grid>

          <Grid item xs="auto" md>
            <Stack component="form" spacing="60px">
              <Stack spacing={4}>
                <Stack spacing={1}>
                  <Typography
                    paragraph={true}
                    sx={{ margin: "0", color: gray3 }}
                  >
                    {data.course.category_name}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{ fontWeight: "600", color: gray1 }}
                  >
                    {data.course.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    color="primary"
                    sx={{ fontWeight: "600" }}
                  >
                    IDR {data.course.price.toLocaleString("id")}
                  </Typography>
                </Stack>

                <FormControl
                  required
                  sx={{ maxWidth: "300px", height: "40px" }}
                >
                  <InputLabel id="select-schedule-label">
                    Select Schedule
                  </InputLabel>
                  <Select
                    labelId="select-schedule-label"
                    label="Select Schedule"
                    value={schedule}
                    onChange={changeSchedule}
                  >
                    {scheduleList.map((schedule) => (
                      <MenuItem
                        key={schedule.isoDateString}
                        value={schedule.isoDateString}
                      >
                        {schedule.dateString}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={buttonStyle}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={buttonStyle}
                  onClick={buyNow}
                >
                  Buy Now
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Stack spacing={2} mt={5}>
          <Typography
            variant="h5"
            component="h3"
            sx={{ color: gray1, fontWeight: "600" }}
          >
            Description
          </Typography>

          <Stack spacing={3}>
            <Typography
              paragraph={true}
              sx={{ color: gray1, marginBottom: "0" }}
            >
              {data.course.description}
            </Typography>

            <Typography
              paragraph={true}
              sx={{ color: gray1, fontFamily: poppins }}
            >
              {data.course.description}
            </Typography>
          </Stack>
        </Stack>
      </Container>

      <ListMenuClass courses={data.other_courses} />
      <Footer mt={16} />

      <AlertDialog
        open={openAlert}
        handleClose={closeAlert}
        severity={alertType}
        message={alertMsg}
      />
    </div>
  );
};

export default DetailKelasPage;
