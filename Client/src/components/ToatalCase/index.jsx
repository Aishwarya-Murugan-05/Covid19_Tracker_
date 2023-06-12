import React,{useEffect, useState} from 'react'
import '../styles/newForm.css'
import { Link, useNavigate } from 'react-router-dom';
import {Box, Button, Grid,Card,CardContent,Typography,
  Table,TableHead,TableRow,Paper,
  TableBody,TableCell,TableContainer,
  Modal,TextField, Select,MenuItem
      }
        from "@mui/material";
import axios from 'axios'
import PropTypes from 'prop-types';
import ModalAddtoCart from '../recordDetailpage/ModalAddToCart';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import CarRentalRoundedIcon from '@mui/icons-material/CarRentalRounded';
import Carousel1 from '../../Carousel';
import { makeStyles } from "@mui/styles";

const getTotalCovidData = `${process.env.REACT_APP_API_KEY}/getTotalCovidData`;

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: "#E8F0FE",
    fontWeight: "bold",
  },
  oddRow: {
    backgroundColor: "#F7F7F7",
  },
  evenRow: {
    backgroundColor: "#FFFFFF",
  },
});



function ToatalCaseIndex() {

  const navigate =useNavigate()

  const classes = useStyles();

  const[records,setRecords]=useState([])
const[modalShowBill,setModalmodalShowBill]=useState(false)
const[addCartRecord,setAddCartRecord]=useState()

const[addcart,setAddcart]=useState(false)

  useEffect(()=>{
    fetchRecords();

  },[])

  const fetchRecords=()=>{
    axios.post(getTotalCovidData)
    .then((res)=>{
      console.log(res,"api res")
      setRecords(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  
  const handleAddRecord = () => {
    console.log('inside new record')
    
    navigate(`/new-allCasesDetailPage`, {state:{ record: {} }})
  };
  

  const handleOnRowClick =(e,item)=>{
    console.log(item,"handleOnRowClick")
    // <Link to={`ToatalCaseIndexDetailPage/${item._id}`}/>
    navigate(`/allCasesDetailPage/:${item._id}`, { state: { record: { item } } })
  }




  return (
<>




      <div style={{backgroundImage: 'URL(https://www.nmcpondy.com/blog/images/1649243355790155747624d74db20e62.jpg)'}}>
    
<Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#B88746 ',
              textDecoration: 'none',
              textShadow: '#cdd422 1px 0 5px',
              justifyContent: 'center',
              marginTop: '-34px',
              // backgroundColor: '#072C50'
              
            }}
          >
          Asia Covid Tracker
          </Typography>

          <div>
              <Carousel1 />
            </div>
      <div className='btn_end_position'>
        {
          records.length <5 &&
    
        <Button
          sx={{ color: '#bccbde', m: 2, backgroundColor: '#431c5d' }}
          variant="contained"
          onClick={handleAddRecord}
        >
           New
        </Button>
            }
      </div>

      <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: '#FBF8BE', borderRadius: 1 }}
      >
       <Grid container>
          <Grid item xs={12} md={12} >
            <Item >
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Sr.No</TableCell>
            <TableCell className={classes.tableHeader} align="left">Country</TableCell>
            <TableCell className={classes.tableHeader} align="left">Total Cases</TableCell>
            <TableCell className={classes.tableHeader} align="center">Total Deaths</TableCell>
            <TableCell className={classes.tableHeader} align="center">Total Recovered</TableCell>
            <TableCell className={classes.tableHeader} align="right">Total Tests</TableCell>
            <TableCell className={classes.tableHeader} align="center"></TableCell>
            <TableCell className={classes.tableHeader} alingn="cenetr"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="left">{row.countries}</TableCell>
              <TableCell align="left">{row.cases}</TableCell>
              <TableCell align="left">{row.deaths}</TableCell>
              <TableCell align="center">{row.recovered}</TableCell>
              <TableCell align="center">{row.test}</TableCell>
              <TableCell align="right"> <button  className="edit__button"  onClick={(e)=>handleOnRowClick(e,row)}> Edit</button> </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>

    </div>
     
    </>
  )
}

export default ToatalCaseIndex