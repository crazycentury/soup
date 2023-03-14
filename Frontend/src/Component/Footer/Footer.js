import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";

import { useTheme } from "@mui/material/styles";

const YouTubeIcon = () => {
  // Copied from Figma
  return (
    <svg
      width="33"
      height="23"
      viewBox="0 0 33 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.479 22.9878C16.4764 22.9878 16.4735 22.9878 16.4706 22.9878C15.5146 22.9813 7.06385 22.9042 4.66957 22.2566C2.99629 21.8068 1.6754 20.4874 1.22439 18.8139C0.5979 16.4619 0.63778 11.9337 0.642131 11.5721C0.638022 11.2122 0.597658 6.64648 1.22245 4.27516C1.22318 4.27299 1.22366 4.27057 1.22439 4.26839C1.67032 2.61396 3.02094 1.25367 4.66546 0.802662C4.66957 0.801454 4.67392 0.800487 4.67803 0.799279C7.04524 0.177144 15.5127 0.101008 16.4706 0.0944824H16.4877C17.4461 0.101008 25.9193 0.17811 28.2916 0.826591C29.9605 1.27519 31.2805 2.59293 31.7327 4.26428C32.3826 6.63729 32.3224 11.2129 32.3159 11.5991C32.3205 11.9796 32.3584 16.4672 31.7356 18.831C31.7351 18.8335 31.7344 18.8356 31.7339 18.8378C31.2826 20.5113 29.962 21.8308 28.2868 22.2811C28.2846 22.2818 28.2822 22.2823 28.28 22.283C25.913 22.9049 17.4453 22.981 16.4877 22.9878C16.4848 22.9878 16.4819 22.9878 16.479 22.9878ZM3.61479 4.90986C3.06469 7.00298 3.11665 11.5104 3.11713 11.5559V11.5885C3.1007 12.8386 3.15847 16.4588 3.61504 18.1734C3.83643 18.9944 4.48781 19.6448 5.31394 19.867C7.08053 20.3448 13.9634 20.4951 16.479 20.5128C19.0012 20.4951 25.8942 20.3489 27.6477 19.8902C28.4712 19.6673 29.1204 19.0191 29.3432 18.1971C29.8003 16.4573 29.8576 12.8548 29.8409 11.6127C29.8409 11.5996 29.8409 11.5866 29.8411 11.5735C29.8639 10.3085 29.8191 6.64599 29.3454 4.9176C29.3449 4.91591 29.3444 4.91422 29.3442 4.91252C29.1218 4.08784 28.4702 3.43743 27.6441 3.21531C25.8947 2.73698 19.0007 2.58713 16.479 2.56949C13.9586 2.58713 7.07231 2.73312 5.31346 3.19138C4.50304 3.41616 3.83692 4.08978 3.61479 4.90986ZM30.5389 18.5159H30.5397H30.5389ZM13.3246 16.5528V6.52925L21.9871 11.5411L13.3246 16.5528Z"
        fill="#5B4947"
      />
    </svg>
  );
};

const TelegramIcon = () => {
  // Copied from Figma
  return (
    <svg
      width="28"
      height="26"
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.1992 25.0212C21.9893 25.0212 21.7807 24.9591 21.6018 24.8378L14.8431 20.2532L11.2181 22.8616C10.9338 23.066 10.5674 23.1175 10.2373 22.9995C9.90757 22.8812 9.65717 22.6081 9.5678 22.2694L7.74764 15.3716L1.24402 12.8848C0.834596 12.7282 0.563063 12.3365 0.560083 11.8981C0.557104 11.4597 0.823247 11.0643 1.23069 10.9022L25.9598 1.06228C26.0721 1.01462 26.1908 0.987094 26.3105 0.979716C26.3534 0.977163 26.3964 0.977163 26.4391 0.979575C26.6871 0.994329 26.9306 1.09534 27.1207 1.28175C27.1405 1.30105 27.1592 1.32077 27.1769 1.34134C27.3344 1.52122 27.4209 1.74055 27.4372 1.96399C27.4412 2.02017 27.4409 2.07706 27.436 2.13395C27.4326 2.17452 27.4267 2.21495 27.4185 2.2551L23.2444 24.1564C23.1773 24.5082 22.9378 24.8028 22.607 24.9399C22.4757 24.9944 22.3371 25.0212 22.1992 25.0212ZM15.4366 18.0844L21.457 22.168L24.7049 5.12635L12.9743 16.4142L15.4082 18.0652C15.418 18.0713 15.4273 18.0778 15.4366 18.0844ZM10.4248 17.1763L11.2309 20.2307L12.9676 18.981L10.6935 17.4383C10.5878 17.3668 10.4973 17.2777 10.4248 17.1763ZM4.55166 11.871L9.01735 13.5784C9.33726 13.7007 9.57872 13.9696 9.66611 14.3008L10.2324 16.4471C10.2584 16.1995 10.3706 15.9666 10.5529 15.7911L21.7305 5.03556L4.55166 11.871Z"
        fill="#5B4947"
      />
    </svg>
  );
};

const FooterItem = (props) => {
  const { title, children } = props;

  const theme = useTheme();
  const fontFamily = theme.typography.poppins.fontFamily;
  const color = theme.palette.secondary.main;

  return (
    <Box sx={{ color: "white" }}>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          marginBottom: "8px",
          color: color,
          fontFamily: fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

const IconWrapper = (props) => {
  const { icon } = props;

  const theme = useTheme();
  const color = theme.palette.primary.main;
  const backgroundColor = theme.palette.secondary.main;

  return (
    <Box
      sx={{
        width: "48px",
        height: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        fontSize: "32px",
        color: color,
        backgroundColor: backgroundColor,
      }}
    >
      {icon}
    </Box>
  );
};

const Footer = (props) => {
  const theme = useTheme();
  const fontFamily = theme.typography.poppins.fontFamily;

  return (
    <Grid
      container
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-evenly"
      spacing={3}
      padding={3}
      bgcolor="primary.main"
      textAlign="justify"
      fontSize="14px"
      fontFamily="poppins.fontFamily"
      {...props}
    >
      <Grid item md={3}>
        <FooterItem title="About Us">
          <Typography
            paragraph={true}
            sx={{
              fontFamily: fontFamily,
              fontSize: "14px",
              lineHeight: "21px",
            }}
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </Typography>
        </FooterItem>
      </Grid>
      <Grid item xs="auto">
        <FooterItem title="Product">
          <ul style={{ paddingLeft: "16px" }}>
            <Stack direction="row" spacing={8}>
              <Stack spacing={1}>
                <li>Electric</li>
                <li>LCGC</li>
                <li>Offroad</li>
                <li>SUV</li>
              </Stack>
              <Stack spacing={1}>
                <li>Hatchback</li>
                <li>MPV</li>
                <li>Sedan</li>
                <li>Truck</li>
              </Stack>
            </Stack>
          </ul>
        </FooterItem>
      </Grid>
      <Grid item md={3}>
        <Stack spacing={3}>
          <FooterItem title="Address">
            <Typography
              paragraph={true}
              sx={{
                fontFamily: fontFamily,
                fontSize: "14px",
                lineHeight: "21px",
              }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque.
            </Typography>
          </FooterItem>
          <FooterItem title="Contact Us">
            <Stack direction="row" spacing={2} sx={{ fontSize: "32px" }}>
              <IconWrapper icon={<PhoneIcon fontSize="inherit" />} />
              <IconWrapper icon={<InstagramIcon fontSize="inherit" />} />
              <IconWrapper icon={<YouTubeIcon />} />
              <IconWrapper icon={<TelegramIcon />} />
              <IconWrapper icon={<MailOutlineIcon fontSize="inherit" />} />
            </Stack>
          </FooterItem>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Footer;
