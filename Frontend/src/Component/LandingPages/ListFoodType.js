import React from 'react';
import { Card, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';


const CardFoodType = (props) => {
    const navigate = useNavigate();

    const {category} = props;

    return (
        <Box
        sx={{
            width: '200px',
            height: '186px',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        onClick={() => navigate(`/listmenukelas/${category.category_id}`)}>
            <Box
            component='img'
            src={`data:image;base64,${category.image}`}
            width = '200px'
            height = '133px'
            />
            <Typography
            fontWeight={400}
            fontSize='24px'
            mt='24px'
            textAlign='center'
            color='black'
            >
                {category.name}
            </Typography>
        </Box>
    )
}

const ListFoodType = (props) => {
    const {categories} = props;

  return (
    <Box sx={{
        justifyContent: 'center',
        alignItems: 'center',
        mb: '147px'
    }}>
        <Container 
        justifyContent='center'
        sx={{ width:'872px', marginTop: '95px',justifyContent: 'center', alignItems: 'center'}}>
            <Typography fontSize='32px' color='primary' fontWeight={600} textAlign='center'>
            More food type as you can choose
            </Typography>

            <Container
            sx={{
              gap: '24px',
              marginTop: '80px',
              display: 'grid',
              gridTemplateColumns: {sx:'repeat(2, 1fr)' ,md:'repeat(4, 1fr)'},
              rowGap: '60px',
              justifyContent: 'center',
              alignItems: 'center',
              
            }} >
                {categories.map((category) =>
                    <CardFoodType key={category.category_id} category={category} />
                )}
            </Container>
        </Container>
    </Box>
  )
}

export default ListFoodType
