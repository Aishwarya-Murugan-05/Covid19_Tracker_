import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid, Button, Forminput, DialogActions,
  MenuItem, Autocomplete, TextField, Box, FormLabel
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import './cart.css'


const addCartSave = `${process.env.REACT_APP_API_KEY}/upsertInvoiceData`
const upsertURL = `${process.env.REACT_APP_API_KEY}/upsertClothData`;


const ModalAddtoCart = ({ data, handleModal }) => {

  const [parentRecord, setParentRecord] = useState();


  const [studentRecord, setStudentRecord] = useState([])

  useEffect(() => {
    console.log('passed record Modal Page', data);
    setParentRecord(data);

  }, [])

  const initialValues = {
    clothName: parentRecord?.clothName ?? "",
    clothCategory: parentRecord?.clothCategory ?? "",
    availableQuantity: parentRecord?.availableQuantity ?? "",
    Price: parentRecord?.Price ?? "",
    _id: parentRecord?._id ?? "",
    buyQuantity: '',
    invoiceAmount: '',
    billDate: '',

  }




  const validationSchema = Yup.object({
    // relatedField: Yup
    //     .string()
    //     .required('Required')
  })


  const formSubmission = (values) => {

    values.billDate = new Date().toISOString().replace("T", " ").substring(0, 19)

    values.invoiceAmount = values.Price * values.buyQuantity
    delete values.Price;
    delete values.availableQuantity;

    console.log('after  submission value', values);

    const request1 = axios.post(addCartSave, values)
    const request2 = axios.post(upsertURL, { ...data, availableQuantity: data.availableQuantity - values.buyQuantity })
    Promise.all([request1, request2])
      .then((responses) => {
        console.log((responses[0].data), "res 1");
        console.log((responses[1].data), "res 2");
        alert('Products  issued suffesfully')
        setTimeout(() => {
          handleModal();
        }, 1000)
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          handleModal();
        }, 1000)
      });


  }

  const handleFormClose = () => {
    handleModal()
  }

  return (


    <Grid item xs={12} style={{ margin: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h3>Add to Cart</h3>
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { formSubmission(values) }}
        >
          {(props) => {
            const {
              values,
              isSubmitting,
            } = props;

            return (
              <>
                <div className='form_center_box'>
                  <Box m="auto">
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="clothName">Cloth Name  </FormLabel>
                          <Field name="clothName" type="text" class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="Price">Product Price </FormLabel>
                          <Field name="Price" type="text" class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="buyQuantity">Order Quantity </FormLabel>
                          <Field name="buyQuantity" type="number" min={1}
                            max={values.availableQuantity}
                            class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="invoiceAmount">Total Amount</FormLabel>
                          <Field name="invoiceAmount" type="number" class="form-input" value={values.Price * values.buyQuantity} />
                        </Grid>
                      </Grid>
                      <div className='action-buttons'>
                        <DialogActions sx={{ justifyContent: "space-between" }}>
                          <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}>Confirm</Button>

                          <Button type="reset" variant="contained" onClick={handleFormClose}  >Cancel</Button>
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
    </Grid>
  )
}

export default ModalAddtoCart;
