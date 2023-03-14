import React,{ useEffect, useState} from 'react';
import { 
    Box
} from '@mui/system';
import { Button, Dialog, DialogTitle, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllPaymentMethod } from '../../api/admin';

const Payment = (props) =>{
    const {data} = props;
    return(
    <Box
    sx={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:'16px',
    }}>
        <Box
        component='img'
        src= {data.image}
        height='35px'
        />
        <Typography fontFamily='Poppins' fontWeight={500} fontSize='18px'>
            {data.name}
        </Typography>

    </Box>
    );
};

const payment = [
<Payment name="Gopay" image="./Soup/Gopay.svg"/>,
<Payment name="OVO" image="./Soup/OVO.svg"/>,
<Payment name="DANA" image="./Soup/Dana.svg"/>,
<Payment name="Mandiri" image="./Soup/mandiri.svg"/>,
<Payment name="BCA" image="./Soup/BCA.svg"/>,
<Payment name="BNI" image="./Soup/BNI.svg"/>,
];

const PaymentMethod = (props) => {
    const navigate = useNavigate();
    const {open, setOpen, onPay} = props;
    const [paymet, setPaymet] = useState([]);
    const [paymentIndex, setPaymentIndex] = useState(null)

    const handleListItemClick = (index) => {
        // setOpen(false);
        setPaymentIndex(index)
      };

    const handleClose = () => {
        setOpen(false)
        setPaymentIndex(null)
    }

    const handlePay = () => {
        if (paymentIndex === null) return

        onPay(paymet[paymentIndex])
    }

    useEffect(()=> {
        getAllPaymentMethod()
        .then((res)=> {
            const activePayments = res.data.filter((payment) => payment.active)
            setPaymet(activePayments);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

  return (
    <Dialog open={open} onClose={handleClose}>           
      <DialogTitle fontFamily='Poppins' textAlign="center" >Select Payment Method</DialogTitle>
        <List sx={{ pt: 0 }}>

        {paymet.map((data, index) => (
        <ListItem button selected={paymentIndex === index} onClick={() => handleListItemClick(index)} key={index}>
            <Payment data={data} />
        </ListItem>
        ))}

        </List>
        <Stack direction="row" justifyContent="center" gap="16px" margin='5px 15px 10px 15px'>
            <Button 
            variant="outlined" 
            color="primary" 
            sx={{
                width:'155px',
                height: '48px',
                padding: '12px 16px',
            }}
            onClick={handleClose}
            >Cancel
            </Button>

            <Button 
            variant="contained" 
            color="secondary" 
            disabled={paymentIndex === null}
            onClick={handlePay}
            sx={{
                width:'155px',
                height: '48px',
                padding: '12px 16px',
            }}
            >Pay</Button>

        </Stack>
    </Dialog>
  )
};

export default PaymentMethod;
