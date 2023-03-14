import { Box, Container } from '@mui/system';
import React,{ useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { 
    FormControlLabel,
    Checkbox,
    Typography,
    Button,
    Dialog,
    Alert,
    AlertTitle,
    } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PaymentMethod from './PaymentMethod';
import { getCartItems} from "../../api/payment";
import { getCartData } from '../../api/soup';
import { CART_KEY } from '../../api/payment';
import AlertDialog from '../AlertDialog/AlertDialog';
import useAuth from '../../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { payItems } from '../../api/payment';
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';


const ItemList=(props)=>{
    const theme = useTheme();
    const {course, checked, changeChecked, remove} = props;
    const secondary = theme.palette.secondary.main;
    const colorgrey1 = theme.palette.gray1.main;
    const colorgrey2 = theme.palette.gray2.main;
    const colorgrey3 = theme.palette.gray3.main;


    return(
        <Box
        display='flex'
        flexDirection='row'
        height='157px'
        borderBottom='1px solid #BDBDBD'
        mb='10px'
        >
            
            <Checkbox 
                checked={checked}
                onChange={changeChecked}
                sx={{
                    mb:'20px',
                    mr:'35px',
                }}/>
                <Box
                component='img'
                src = {`data:image;base64,${course.image_content}`}
                width = '200px'
                height = '133px'
                />
                <Container
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap='8px'>
                    <Typography fontWeight={400} fontSize='16px' sx={{color: colorgrey3}}>
                        {course.category_name}
                    </Typography>
                    <Typography fontWeight={600} fontSize='24px' sx={{color: colorgrey1}}>
                        {course.name}
                    </Typography>
                    <Typography fontWeight={400} fontSize='18px' sx={{color: colorgrey2}}>
                        Schedule: {course.date}
                    </Typography>
                    <Typography fontWeight={600} fontSize='20px' color='secondary'>
                        IDR {course.price.toLocaleString("id")}
                    </Typography>

                </Container>
                <DeleteForeverIcon
                fontSize="large"
                sx={{
                    color: '#EB5757',
                    mt:"40px"
                }}
                onClick={remove}
                />
            

        </Box>
    );
};



const Checkout = () => {
    const navigate = useNavigate()
    const {user} = useAuth()

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false)
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);
    const [total, setTotal] = useState(0);
    const [checkedAll, setCheckedAll] = useState(false);
    const [alertMsg, setAlertMsg] = useState("")

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    // console.log(getCartItems());
    

    useEffect(()=> {
    
    const item = getCartItems();
    getCartData(item.map((items)=>{
        return items.id
    }))
        .then((res) => {
            // setData(res.data);
            
            for(var i=0;i<item.length;i++){
                res.data[i].date = item[i].date
            };
            setData(res.data);
            // console.log(res.data);
            setChecked(new Array(res.data.length).fill(false));

        })
        .catch((err) => {
            console.log(err);
        });
        
        
    },[]);

    const CekSelectItem = () => {
        let result = false
        for(let i = 0;i<checked.length;i++){
            if(checked[i] === true){
                result= true;
            }
            
        }
        return result;
    };
    console.log(checked);
    

    const SelectAll = (event) =>{
        const updateCheckedAll = checked.map((item,index) => event.target.checked)
        setChecked(updateCheckedAll);
        setCheckedAll(event.target.checked);
        console.log(event)
        
    };


    
    const handleOnChange = (position) => {
        const updateChecked = checked.map((item,index) =>
        index === position ? !item : item);

        setChecked(updateChecked);
    };

    const removeItem = (position) => {
        
        // if(checked[position].item === true){
            
        // }
        const arrdata =  [...data].map((item)=>({...item}));
        arrdata.splice(position,1)

        const arrchecked =  [...checked];
        arrchecked.splice(position,1)

        const arrdatastorage =  [...getCartItems()].map((course)=>({...course}));
        arrdatastorage.splice(position,1);


        setData(arrdata);
        setChecked(arrchecked);
        localStorage.setItem(CART_KEY, JSON.stringify(arrdatastorage));
        // console.log(checked.length);
    };
    // console.log(data);

    const payNow = () => {
        // CekSelectItem() !== true
        //             ? () => setOpen2(true)
        //             : () => setOpen(true)
        if (!user) {
            navigate("/login")
            return
        }
        if (!CekSelectItem()) {
            setOpen2(true)
            return
        }

        setOpen(true)
    }

    const onPay = (payment) => {
        const items = data
            .filter((_, index) => checked[index])
            .map((course) => ({fk_course_id: course.course_id, schedule: course.date}))

        payItems(payment.payment_method_id, items).then(() => {
            // Delete purchased items from cart
            const uncheckedItems = getCartItems().filter((_, index) => !checked[index])
            localStorage.setItem(CART_KEY, JSON.stringify(uncheckedItems))

            navigate("/purchasesuccess")
        }).catch((err) => {
            const errMsg = err?.response?.data
            setAlertMsg(errMsg)
            setOpen(false)
            setOpen3(true)
        })
    }
   

  return (
    <Box 
    display="flex"
    flexDirection="column"
    >
        <Helmet>
            <title>SOUP | Cart Checkout</title>
        </Helmet>
    <Container>
        <Box
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        height='50px'
        borderBottom='1px solid #BDBDBD'
        mt='40px'
        mb='24px'
        >
            <FormControlLabel
            value="selectAll"
            control={<Checkbox onChange={SelectAll}/>}
            label="Pilih Semua"
            labelPlacement="end"
            sx={{
                gap:'35px',
            }}/>
        </Box>
            {
                data.map((course, index)=>(
                    <ItemList course={course} key={index} checked={checked[index]} changeChecked={()=> handleOnChange(index)} remove={()=> removeItem(index)}/>
                ))
            }

        <Box
        display='flex'
        flexDirection='row'
        height='157px'
        mb='10px'
        />

    </Container>
        <Box
        position="fixed"
        width="100%"
        height="100px"
        display="flex"
        alignItems="center"
        bottom='0px'
        borderTop="1px solid #BDBDBD"
        backgroundColor="white"
        sx={{
            filter: 'drop-shadow(0px -2px 3px rgba(0, 0, 0, 0.25))'
        }}
        >
            <Container
            width="1140px"
            sx={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
            }}
            >
                <Typography display='flex' fontWeight={400} fontSize="18px" color='gray1'>
                    Total Price
                </Typography>
                <Typography display='flex' fontWeight={600} fontSize="24px" color='secondary'>
                    IDR  
                {" "+
                    checked.reduce(
                        (sum, currentState, index) => {
                            if (currentState === true) {
                            return sum + data[index].price;
                            }
                        return sum;
                        },
                        0
                    ).toLocaleString("id")
                }
                </Typography>
                <Button 
                variant="contained"
                color="secondary"
                display="flex"
                sx={{
                    position:'absolute',
                    right:'70px',
                    width:'233px',
                    height:'40px',
                    color:primaryColor,
                }}
                onClick={payNow}
                    >
                    Pay Now
                </Button>
                <PaymentMethod open={open} setOpen={setOpen} onPay={onPay}/>
                <AlertDialog open={open2} handleClose={() => setOpen2(false)} severity="error" message="You must choose at least 1 item"/>
                <AlertDialog open={open3} handleClose={() => setOpen3(false)} severity="error" message={alertMsg} />
            </Container>
        </Box>
        
    </Box>
  )
}

export default Checkout
