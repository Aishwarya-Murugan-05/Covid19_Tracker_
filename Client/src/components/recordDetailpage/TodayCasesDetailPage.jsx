import React, { useEffect, useState ,useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Button, DialogActions, Box, TextField, Autocomplete, Select, FormLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import  { countriesPicklist } from '../data/Piclistst'
import { Today } from '@mui/icons-material';

const upsertTodayURL = `${process.env.REACT_APP_API_KEY}/upsertCovid`;
const upsertTotalURL =`${process.env.REACT_APP_API_KEY}/upsertOverallCovid`

const overallUrl =`${process.env.REACT_APP_API_KEY}/upsertOverallwithtoday`
const getTotalCovidData = `${process.env.REACT_APP_API_KEY}/getTotalCovidData`;

const TodayCasesDetailPage = ({ item }) => {

  const [passedRecord, setPassedRecord] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNew, setshowNew] = useState(true)


  // notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  const[records,setRecords]=useState([])

  const valueRef = useRef(records); 



  useEffect(() => {

    if(location.state.record.item){
      console.log('passed record', location.state.record.item);
      setPassedRecord(location.state.record.item);
      setshowNew(!location.state.record.item)
      fetchRecords();
    }else{
        fetchRecords();
    }
  }, [])

  console.log(location.state.record.item,"item")
console.log(valueRef,"valueRef")
  const initialValues = {
    countries: '',
    cases: '',
    deaths: '',
    recovered: '',
    todayDate: '',
    test: '',
  }

  const savedValues = {
    countries: passedRecord?.countries ?? "",
    cases: passedRecord?.cases ?? "",
    deaths: passedRecord?.deaths ?? "",   
    recovered:passedRecord?.recovered??"",
    todayDate:passedRecord?.todayDate??"",
    test:passedRecord?.test??"",
    _id: passedRecord?._id ?? "",
  }

   const fetchRecords=()=>{
     axios.post(getTotalCovidData)
    .then((res)=>{
      console.log(res,"api res")
      setRecords(res.data)
      valueRef.current = res.data;
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const validationSchema = Yup.object({
    countries: Yup
      .string()
      .required('Required')
      .max(30, 'countries must be less than 30 characters'),
  
  })

  const formSubmission = (values) => {

 

    console.log('form submission value', values);



console.log(valueRef.current,"records");

    const filteredArray = valueRef.current.filter(obj => obj.countries === values.countries);
console.log(filteredArray,"filteredArray")

    const toatalValues={...filteredArray[0]}
    console.log(toatalValues,"toatalValues")
    
    // delete toatalValues.todayDate;

    const obj={
        _id:toatalValues._id,
        countries:toatalValues.countries,
        cases:toatalValues.cases+values.cases,
        deaths:toatalValues.deaths+values.deaths,
        recovered:toatalValues.recovered+values.recovered,
        test:toatalValues.test+values.test,
    }
    console.log("after delete",toatalValues)
    console.log('form submission value', values);

    const request1 = axios.post(upsertTodayURL, values)
    const request2 =axios.post(upsertTotalURL,obj)
    Promise.all([request1,request2])
      .then((responses) => {
        console.log((responses[0].data), "res 1");
        console.log((responses[1].data), "res 2")
        setTimeout(() => {
            navigate(-1);
          }, 2000)
      })
      .catch((error) => {
        console.error(error);
 
      });



  }
  const handleFormClose = () => {
    navigate(-1)
  }
  return (

    <Grid item xs={12} style={{ margin: "20px" }}>
      <div style={{  backgroundColor: 'white', borderRadius: '20px'}}>
        <div style={{ textAlign: "center", marginBottom: "10px",
          fontSize: 30, color: '#191919',textShadow: '#B88746 1px 0 5px' }}>
        {
          showNew ? <h3>Today Covid Cases</h3> : <h3>{location.state.record.item.date} Covid Cases</h3>
        }
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={showNew ? initialValues : savedValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { formSubmission(values) }}
        >
          {(props) => {
            const {
              values,
              isSubmitting,
              setFieldValue
            } = props;

            return (
              <>
                <div className='form_center_box'>

                  <Box m="auto">
                    <Form>
                      <Grid container spacing={2}>
                      <Grid item xs={6} md={6}>
                        {
                          showNew ? <>
                           <FormLabel sx={{fontWeight: 'bold'}} htmlFor="countries">Country<span className="text-danger">*</span></FormLabel>
                          <Field name="countries" as="select" class="form-input"  >
                           
                          <option value=""><em>None</em></option>
                           {
                                countriesPicklist.map((i)=>(
                                    <option value={i.value}>{i.text}</option>
                                ))   
                            }
                          </Field>
                            
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name="countries" />
                          </div> 
                          </>
                          :
                          <>
                          <FormLabel sx={{fontWeight: 'bold'}} htmlFor="countries">Country<span className="text-danger">*</span></FormLabel>
                          <Field name="countries" type="text" class="form-input" readOnly />
                          </>
                        }
                         
                        </Grid>
                        <Grid item xs={6} md={6}>
                          {
                            showNew ? 
                            <>
                                <FormLabel sx={{fontWeight: 'bold'}} htmlFor="cases">Today Cases<span className="text-danger">*</span></FormLabel>
                          <Field name="cases" type="number" class="form-input">
                            </Field>
                            </>
                            :
                            <>
                                <FormLabel sx={{fontWeight: 'bold'}} htmlFor="cases">Today Cases<span className="text-danger">*</span></FormLabel>
                          <Field name="cases" type="number" class="form-input" readOnly></Field>
                            </>
                          }
                          
                        </Grid>


                        <Grid item xs={6} md={6}>
                          <FormLabel sx={{fontWeight: 'bold'}} htmlFor="deaths">Today Deaths</FormLabel>
                          <Field name="deaths" type="number" class="form-input" >
                            
                            </Field>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel sx={{fontWeight: 'bold'}} htmlFor="recovered">Today Recovered</FormLabel>
                          <Field name="recovered" type="number" class="form-input" />
                        </Grid>                        
                        <Grid item xs={6} md={6}>
                          <FormLabel sx={{fontWeight: 'bold'}} htmlFor="todayDate">Dates</FormLabel>
                          <Field name="todayDate" type="date" class="form-input"  />
                        </Grid>

                        <Grid item xs={6} md={6}>
                          <FormLabel sx={{fontWeight: 'bold'}} htmlFor="test">Today Test</FormLabel>
                          <Field name="test" type="number" class="form-input" />
                        </Grid>

                  
                      </Grid>
                      <div className='action-buttons'>
                        <DialogActions sx={{ justifyContent: "space-between" }}>
                          {
                            showNew ?
                              <Button type='success' variant="contained" color="secondary" disabled={isSubmitting} sx={{backgroundColor: '#8bd8bd', color: '#243665'}}>Save</Button>
                              :
                              <Button type='success' variant="contained" color="secondary" disabled={isSubmitting} sx={{backgroundColor: '#243665', color: '#8bd8bd'}}>Update</Button>
                          }
                          <Button type="reset" variant="contained" onClick={handleFormClose} sx={{backgroundColor: '#243665', color: '#8bd8bd'}} >Cancel</Button>
                        </DialogActions>
                      </div>
                    </Form>
                  </Box>
                </div>
              </>
            )
          }}
        </Formik>
      </div>
      </div>
    </Grid>
  )
}
export default TodayCasesDetailPage;

