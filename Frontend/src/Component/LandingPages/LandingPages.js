import React, {useState, useEffect} from 'react';
import ListMoreClass from './ListMoreClass';
import { Image } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Container, Typography } from '@mui/material';
import ListFoodType from './ListFoodType';
import { Helmet } from 'react-helmet';

import { getLandingPage } from '../../api/soup';

import Footer from '../Footer/Footer';

const BoxPorto = (props) => {
  
  return(
    <div>
      <Helmet>
        <title>SOUP | Home</title>
      </Helmet>
      <Box 
        sx={{
          width: {sx:"200px", md:'300px'},
          height: {sx:"90px", md:'183px'},
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #BDBDBD',
          borderRadius: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          gap: '31px',

        }}>
          <Typography 
            sx={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize:  '48px',
              lineHeight: '59px',
              
            }}
            color="secondary">
            {props.value}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: {sx:'14px', md:'16px'},
              lineHeight: '20px',
              textAlign: 'center',
              mr: '20px',
              ml: '20px',
              mb: '30px'
            }}>
            {props.text}
          </Typography>

        </Box>
    </div>
  )
}

const LandingPages = () => {
  const [data, setData] = useState(null)

  useEffect(() => {

    getLandingPage().then((res) => {
      setData(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  // Return nothing until the data has been loaded from API
  if (!data) return null
  
  return (
    <div>
      <Box
      sx={{
        width: '100%',
        height: '275px',
        backgroundImage: `url(${'./landingpageimagetop.png'})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Container 
        sx={{
          width: '843px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '27px',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}> 
          <Typography
          fontWeight={600}
          textAlign='center'
          color='white'
          mt='80px'
          sx={{
            fontSize: '32px'
          }}
          >
          Be the next great chef
          </Typography>
          <Typography
          fontWeight={400}
          textAlign='center'
          color='white'
          sx={{
            fontSize:{sx:'20px' ,md:'24px'}
          }}
          
          >
            We are able to awaken your cooking skills to become a classy chef and
            ready to dive into the professional world
          </Typography>

        </Container>
      </Box>

      <Container 
      spacing={3}
      
      sx={{
        display: 'flex',
        gap:'30px',
        justifyContent: 'center',
        marginTop: '70px'
      }}>
        <BoxPorto 
        value="200+" 
        text="Various cuisines available in professional class"/>
        
        <BoxPorto 
        value="50+" 
        text="A chef who is reliable and has his own characteristics in cooking"/>

        <BoxPorto 
        value="30+" 
        text="Cooperate with trusted and upscale restaurants"/>

      </Container>

      <ListMoreClass courses={data.courses}/>
      <ListFoodType categories={data.categories} />

      <Footer />
    </div>
  )
}

export default LandingPages;
