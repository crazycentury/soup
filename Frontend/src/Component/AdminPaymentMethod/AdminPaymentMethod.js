import { Box, Button, Container, Dialog, DialogTitle, Input, LinearProgress, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseAdminView from '../BaseAdminView/BaseAdminView';
import DataTable from "../DataTable/DataTable";
import { TOKEN_KEY } from '../../api/auth';
import { addPaymentMethod, getAllPaymentMethod, editPaymentMethod, setPaymentMethodStatus} from '../../api/admin';
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { Helmet } from 'react-helmet';

const tableHeaders = ["image", "name", "Status", "Active"];



function ActionButton(props) {
  const { children, onClick } = props;

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      sx={{ width: "100%" }}
    >
      {children}
    </Button>
  );
}

const AddPaymentMethod = (props) => {
  const {open, setOpen, getImage, getName, setName, setImageDataUrl, editPaymentMethod, loadData} = props;

  const handleChangeName = (value) => {
    setName(value);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const submitData = () => {
      editPaymentMethod()
      .then(function (response, data) {
        //handle success
        // console.log(response, data);
        handleClose();
        loadData()
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      }) 
  };


  return(
    <Dialog 
      open={open}
      onClose={handleClose}
      >
      <DialogTitle fontFamily='Poppins' textAlign="center" >Add New Payment Method</DialogTitle>
      <Container 
      sx={{
        display:'flex',
        flexDirection: 'column',
        width:'100%',
        marginBottom: '20px',
        gap:'15px',
        
      }}>
      {/* <Typography>Name</Typography> */}
      <TextField id="name" type="text" label="Name" value={getName} onChange={(e) => handleChangeName(e.target.value)}/>
      <Input id='imageupload' className='hidden' type='file' accept='image/*'
      onChange={(e) => {
        const tempImage = e.target.files[0];

        let reader = new FileReader();
        reader.onload = () => {
          // console.log('BASE64', reader.result)
          setImageDataUrl(reader.result)
        }
        // console.log(tempImage);
        reader.readAsDataURL(tempImage);
      }}/>

      <Button 
      variant="contained"
      color="secondary"
      display="flex"
      justifyContent="center"
      sx={{
          width:'100px',
          height:'40px',
          
      }}
      onClick={submitData}
      >Save</Button>
      </Container>
      
    </Dialog>

  )
};

const AdminPaymentMethod = () => {
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [name, setName] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState([null]);
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [confirmData, setConfirmData] = useState({
    open: false,
    message: "",
  });
  const [editUserFormData, setEditUserFormData] = useState({
    open: false,
    user: {},
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickEdit = (index) => {
    const position = data[index];
    setName(position.name);
    setImageDataUrl(position.image);
    setPaymentId(position.payment_method_id)
    setOpen2(true);
  };

  const loadPaymetMethod = () => {
    setLoading(true);
    getAllPaymentMethod()
    .then((res) => {
      setData(res.data);
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoading(false));
  };

  useEffect(loadPaymetMethod, []);

  const confirmSetActive = (index) => {
    setIndex(index)
    setConfirmData({
      open: true,
      message: "Are you sure to change status for this payment method?",
    });
  };

  const togglePaymentStatus = () => {
    const pos = data[index]
    setLoading(true);
    setPaymentMethodStatus(pos.payment_method_id, !pos.active)
      .then(loadPaymetMethod)
      .catch(handleRequestError);

    closeConfirm();
  };

  const closeConfirm = () => {
    setConfirmData({ ...confirmData, open: false });
  };

  const handleRequestError = (err) => {
    const errMsg = err?.response?.data;
    setAlertData({ open: true, severity: "error", message: errMsg });
  };
  
  const openEditUserForm = (dataIndex) => {
    const user = data[dataIndex];
    setEditUserFormData({ user, open: true });
  };
  
  return (
    <BaseAdminView>
      <Helmet>
        <title>SOUP | Admin</title>
      </Helmet>
        <Button
        variant="contained"
        color="secondary"
        display="flex"
        sx={{
            left: '30px',
            height:'40px',
            mt:'20px',
            mb:'10px'
            
        }}
        onClick={handleClickOpen}
        >Add Payment Method</Button>
        <AddPaymentMethod
          open={open}
          setOpen={setOpen}
          getName={name}
          getImage={imageDataUrl}
          setName={setName}
          setImageDataUrl={setImageDataUrl}
          editPaymentMethod={()=> addPaymentMethod(name, imageDataUrl)}
          loadData={loadPaymetMethod}
        />
        <AddPaymentMethod
          open={open2}
          setOpen={setOpen2}
          getName={name}
          getImage={imageDataUrl}
          setName={setName}
          setImageDataUrl={setImageDataUrl}
          editPaymentMethod={()=> editPaymentMethod(paymentId, name, imageDataUrl)}
          loadData={loadPaymetMethod}
        />
        {loading ? <LinearProgress /> : null}

        <DataTable 
        headers={tableHeaders}  
        rows={data.map((data, index) => [
          <Box
            component='img'
            src = {data.image}
            width = '80px'
            height = '80px'
            />,
          <Typography>{data.name}</Typography>,
          <ActionButton onClick={() => confirmSetActive(index)}>
            {data.active ? "Active" : "Inactive"}
          </ActionButton>,
          <Stack direction="row" spacing={2}>
            <ActionButton onClick={()=> handleClickEdit(index)}>
              Edit
            </ActionButton> 
              
          </Stack>,
        ])}
        
        />

      <ConfirmDialog
        open={confirmData.open}
        message={confirmData.message}
        onClose={closeConfirm}
        onCancel={closeConfirm}
        onConfirm={togglePaymentStatus}
      />
    </BaseAdminView>
  )
}

export default AdminPaymentMethod
