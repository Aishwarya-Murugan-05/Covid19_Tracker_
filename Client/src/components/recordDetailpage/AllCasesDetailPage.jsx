import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Button, DialogActions, Box, TextField, Autocomplete, Select, FormLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import  { countriesPicklist } from '../data/Piclistst'


const upsertURL = `${process.env.REACT_APP_API_KEY}/upsertOverallCovid`;

const AllCasesDetailPage = ({ item }) => {

  const [passedRecord, setPassedRecord] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNew, setshowNew] = useState(true)


  // notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })






  useEffect(() => {

    if(location.state.record.item){
      console.log('passed record', location.state.record.item);
      setPassedRecord(location.state.record.item);
      setshowNew(!location.state.record.item)
    }
  }, [])

  console.log(location.state.record.item,"item")

  const initialValues = {
    countries: '',
    cases: '',
    deaths: '',
    recovered: '',
    test: '',
  }


  const savedValues = {
    countries: passedRecord?.countries ?? "",
    cases: passedRecord?.cases ?? "",
    deaths: passedRecord?.deaths ?? "",   
    recovered:passedRecord?.recovered??"",
    test:passedRecord?.test??"",
    _id: passedRecord?._id ?? "",
  }


  const validationSchema = Yup.object({
    countries: Yup
      .string()
      .required('Required')
      .max(30, 'countries must be less than 30 characters'),
  
  })

  const formSubmission = (values) => {

 
  
    console.log('form submission value', values);


    axios.post(upsertURL, values)
      .then((res) => {
        console.log('upsert record  response', res);
        setTimeout(() => {
          navigate(-1);
        }, 2000)
      })
      .catch((error) => {
        console.log('upsert record  error', error);
      })
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
          showNew ? <h3>All Covid Data</h3> : <h3>All Covid Data</h3>
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
                                <FormLabel sx={{fontWeight: 'bold'}} htmlFor="cases">Total Cases<span className="text-danger">*</span></FormLabel>
                          <Field name="cases" type="number" class="form-input">
                            </Field>
                            </>
                            :
                            <>
                                <FormLabel sx={{fontWeight: 'bold'}} htmlFor="cases">Total Cases<span className="text-danger">*</span></FormLabel>
                          <Field name="cases" type="number" class="form-input" readOnly></Field>
                            </>
                          }
                          
                        </Grid>


                        <Grid item xs={6} md={6}>
                          <FormLabel sx={{fontWeight: 'bold'}} htmlFor="deaths">Total Deaths</FormLabel>
                          <Field name="deaths" type="number" class="form-input" >
                            
                            </Field>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel sx={{fontWeight: 'bold'}} htmlFor="recovered">Total Recovered</FormLabel>
                          <Field name="recovered" type="number" class="form-input" />
                        </Grid>                        
                        <Grid item xs={6} md={6}>
                          <FormLabel sx={{fontWeight: 'bold'}} htmlFor="test">Total Test </FormLabel>
                          <Field name="test" type="number" class="form-input"  />
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
export default AllCasesDetailPage;

