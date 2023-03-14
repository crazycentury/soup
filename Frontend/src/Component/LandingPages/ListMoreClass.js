import React from 'react';
import { Box, Typography } from '@mui/material'
import { Container } from '@mui/system'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const CardMoreClass = (props) => {
  const navigate = useNavigate();

  const {course} = props

 return (
  <Card 
  sx={{ 
    width: '350px',
    height: '400px', 
    display:'flex', 
    flexDirection:'column'}}
  onClick={() => navigate(`/detailkelaspage/${course.course_id}`)}
  >
    <CardMedia
      component="img"
      height="234px"
      image={`data:image;base64,${course.image_content}`}
     />
     
     <CardContent >
     <Typography 
     fontWeight={400}
     color= "#828282"
     sx={{
      textAlign: 'left',
      fontSize: '16px',
     }}>
      {course.category_name}
      </Typography>
      <Typography 
      fontWeight={600}
      fontSize="20px"
      color="primary"
      textAlign="left" >
      {course.name}
      </Typography>
      <Typography
      fontWeight={600}
      fontSize="20px"
      color="secondary"
      textAlign="left" 
      mt={5}
      >
      IDR {course.price.toLocaleString("id")}
      </Typography>
      </CardContent>
  </Card>

 )
}

const ListMoreClass = (props) => {
  const {courses} = props

  return (
    <div>
      <Box>
        <Container maxWidth='xl' sx={{ marginTop: '70px'}}>
            <Typography variant='h3' color='primary' fontWeight={600} textAlign='center'>
                More professional class
            </Typography>
            <Container
            sx={{
              gap: '24px',
              marginTop: '80px',
              display: 'grid',
              gridTemplateColumns: {xs:'repeat(2, 1fr)', md:'repeat(3, 1fr)'},
              rowGap: '64px'
            }} >
              {courses.map((course) =>
                <CardMoreClass key={course.course_id} course={course} />
              )}
            </Container>
            
        </Container>

        <Box
        sx={{
          width: '100%',
          height: '233px',
          backgroundImage: `url(${'./image4.png'})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          mt: '130px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Container 
          sx={{
            maxWidth: 'xl',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '24px',
            textAlign: 'left',
            justifyContent: 'center',
          }}
          >
            <Typography 
              fontWeight={600}
              fontSize='40px'
              color='white'
              mt='25px'>
              Gets your best benefit
            </Typography>
            <Typography
              fontWeight={500}
              fontSize='16px'
              align='justified'
              color='white'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.
            </Typography>
          </Container>

        </Box>
      </Box>
    </div>
  )
}

export default ListMoreClass
