import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  Step,
  Stepper,
  StepButton,
  Button,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import * as yup from 'yup';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  selectGroup: {
    padding: 20,
    // margin: 20,
  },
  selectLabel: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    border: '1px solid',
    padding: '20px 40px',
  },
  button: {
    marginTop: 20,
  },
  field: {
    border: '1px solid',
  },
  box: {
    border: '1px solid',
    padding: '10px',
    marginTop: 20,
  },
}));

const ValidationScheme = yup.object({
  gender: yup.string().nullable().required('This field is required'),
  name: yup.string().nullable().required('This field is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('This field is required'),
  pincode: yup.number().required('This field is required'),
  mobileNumber: yup
    .string()
    .matches(new RegExp('[0-9]{7}'))
    .required('This field is required'),
  role: yup.string().nullable().required('This field is required'),
  yourAge: yup.string().nullable().required('This field is required'),
});

const FormComponent = () => {
  const classes = useStyles();

  const [ageArray, setAgeArray] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [childrenCount, setChildrenCount] = useState([{ gender: '', age: '' }]);

  const steps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }];

  const handleSteps = () => {
    setActiveStep(activeStep + 1);
  };

  const handleAddChildren = () => {
    setChildrenCount([...childrenCount, { gender: '', age: '' }]);
  };

  const handleRemoveChildren = () => {
    const values = [...childrenCount];
    values.pop();
    setChildrenCount(values);
  };

  useEffect(() => {
    let ageArr = [];
    for (let i = 18; i <= 99; i++) {
      ageArr.push(i);
    }
    setAgeArray(ageArr);
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            style={{ height: '100vh' }}
          >
            <Grid style={{ border: '1px solid', width: 700 }}>
              <Card>
                <CardContent>
                  <Formik
                    initialValues={{
                      gender: '',
                      name: '',
                      email: '',
                      mobileNumber: '',
                      pincode: '',
                      role: '',
                      yourAge: '18',
                      spouseAge: '18',
                      childrenGender: '',
                      childrenAge: '',
                      children: [],
                    }}
                    onSubmit={(e) => {
                      console.log(e);
                    }}
                    validationSchema={ValidationScheme}
                  >
                    {({ values }) => (
                      <Form autoComplete='off'>
                        <Grid>
                          <Stepper
                            alternativeLabel
                            nonLinear
                            activeStep={activeStep}
                          >
                            {steps.map((label, index) => {
                              return (
                                <Step key={index}>
                                  <StepButton
                                  // onClick={() => handleSteps(index)}
                                  // completed={isStepComplete(index)}
                                  >
                                    {label.label}
                                  </StepButton>
                                </Step>
                              );
                            })}
                          </Stepper>
                        </Grid>

                        {activeStep === 0 ? (
                          <>
                            <Grid container>
                              <Grid item xs={12}>
                                <Grid
                                  container
                                  direction='row'
                                  justify='flex-start'
                                  alignItems='center'
                                  style={{ marginBottom: 20 }}
                                >
                                  <Grid>
                                    <Typography>
                                      Select your gender :
                                    </Typography>
                                  </Grid>
                                  <Grid>
                                    <div
                                      role='group'
                                      aria-labelledby='my-radio-group'
                                      className={classes.selectGroup}
                                    >
                                      <label className={classes.selectLabel}>
                                        <Field
                                          type='radio'
                                          name='gender'
                                          value='male'
                                          style={{ marginRight: 10 }}
                                          className={classes.field}
                                        />
                                        Male
                                      </label>
                                      <label className={classes.selectLabel}>
                                        <Field
                                          type='radio'
                                          name='gender'
                                          value='female'
                                          style={{ marginRight: 10 }}
                                        />
                                        Female
                                      </label>
                                    </div>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid>
                              <Field
                                name='name'
                                component={TextField}
                                label='Name'
                                fullWidth
                              />
                            </Grid>

                            <Grid>
                              <Field
                                name='email'
                                component={TextField}
                                label='Email'
                                fullWidth
                                type='email'
                              />
                            </Grid>
                            <Grid>
                              <Field
                                name='mobileNumber'
                                component={TextField}
                                label='Mobile Number'
                                fullWidth
                                type='number'
                              />
                            </Grid>
                            <Grid>
                              <Field
                                name='pincode'
                                component={TextField}
                                label='Pincode'
                                fullWidth
                                type='number'
                              />
                            </Grid>
                            <Grid>
                              <Button
                                variant='contained'
                                color='primary'
                                disabled={
                                  !values.gender ||
                                  !values.name ||
                                  !values.email ||
                                  !values.mobileNumber ||
                                  !values.pincode
                                }
                                onClick={() => {
                                  handleSteps();
                                }}
                                className={classes.button}
                              >
                                Next
                              </Button>
                            </Grid>
                          </>
                        ) : activeStep === 1 ? (
                          <>
                            <div
                              role='group'
                              aria-labelledby='my-radio-group'
                              className={classes.selectGroup}
                            >
                              <Grid style={{ marginBottom: 50 }}>
                                <label className={classes.selectLabel}>
                                  <Field
                                    type='radio'
                                    name='role'
                                    value='myself'
                                    style={{ marginRight: 10 }}
                                  />
                                  Myself
                                </label>
                              </Grid>
                              <Grid style={{ marginBottom: 50 }}>
                                <label className={classes.selectLabel}>
                                  <Field
                                    type='radio'
                                    name='role'
                                    value='myself_spouse'
                                    style={{ marginRight: 10 }}
                                  />
                                  Myself + Spouse
                                </label>
                              </Grid>
                              <Grid style={{ marginBottom: 50 }}>
                                <label className={classes.selectLabel}>
                                  <Field
                                    type='radio'
                                    name='role'
                                    value='myself_spouse_children'
                                    style={{ marginRight: 10 }}
                                  />
                                  Myself + Spouse + Children
                                </label>
                              </Grid>
                            </div>

                            <Grid>
                              <Typography>
                                Please select the members you want to insure
                                with the health insurance policy
                              </Typography>
                            </Grid>

                            <Grid>
                              <Button
                                variant='contained'
                                color='primary'
                                disabled={!values.role}
                                onClick={() => {
                                  handleSteps();
                                }}
                              >
                                Next
                              </Button>
                            </Grid>
                          </>
                        ) : activeStep === 2 ? (
                          <>
                            <Grid container className={classes.box}>
                              <Grid item xs={12}>
                                <Grid
                                  container
                                  direction='row'
                                  justify='space-between'
                                  alignItems='center'
                                >
                                  <Grid>
                                    <label>Your age</label>
                                  </Grid>
                                  <Grid>
                                    <Field
                                      name='yourAge'
                                      as='select'
                                      className='my-select'
                                    >
                                      {ageArray.map((items, i) => (
                                        <option key={i} value={items}>
                                          {items} years
                                        </option>
                                      ))}
                                    </Field>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            {values.role === 'myself_spouse' ? (
                              <>
                                <Grid container className={classes.box}>
                                  <Grid item xs={12}>
                                    <Grid
                                      container
                                      direction='row'
                                      justify='space-between'
                                      alignItems='center'
                                    >
                                      <Grid>
                                        <label>Spouse age</label>
                                      </Grid>
                                      <Grid>
                                        <Field
                                          name='spouseAge'
                                          as='select'
                                          className='my-select'
                                        >
                                          {ageArray.map((items, i) => (
                                            <option key={i} value={items}>
                                              {items} years
                                            </option>
                                          ))}
                                        </Field>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </>
                            ) : null}
                            {values.role === 'myself_spouse_children' ? (
                              <>
                                <Grid>
                                  <Grid container className={classes.box}>
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        direction='row'
                                        justify='space-between'
                                        alignItems='center'
                                      >
                                        <Grid>
                                          <label>Children</label>
                                        </Grid>
                                        <Grid>
                                          <Grid container>
                                            <Grid item xs={12}>
                                              <Grid
                                                container
                                                direction='row'
                                                justify='space-between'
                                                alignItems='center'
                                              >
                                                <Grid item>
                                                  <Button
                                                    onClick={() => {
                                                      handleRemoveChildren();
                                                    }}
                                                  >
                                                    <RemoveCircleIcon />
                                                  </Button>
                                                </Grid>
                                                <Grid item>
                                                  <Typography>
                                                    {childrenCount.length}
                                                  </Typography>
                                                </Grid>
                                                <Grid item>
                                                  <Button
                                                    onClick={() => {
                                                      handleAddChildren();
                                                    }}
                                                  >
                                                    <AddCircleIcon />
                                                  </Button>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  {childrenCount.map((items, i) => (
                                    <Grid container className={classes.box}>
                                      <Grid item xs={12}>
                                        <Grid
                                          container
                                          direction='row'
                                          justify='space-between'
                                          alignItems='center'
                                        >
                                          <Grid>
                                            <div
                                              role='group'
                                              aria-labelledby='my-radio-group'
                                              className={classes.selectGroup}
                                            >
                                              <label
                                                className={classes.selectLabel}
                                              >
                                                <Field
                                                  type='radio'
                                                  name='childrenGender'
                                                  value='male'
                                                  style={{ marginRight: 10 }}
                                                  className={classes.field}
                                                />
                                                Male
                                              </label>
                                              <label
                                                className={classes.selectLabel}
                                              >
                                                <Field
                                                  type='radio'
                                                  name='childrenGender'
                                                  value='female'
                                                  style={{ marginRight: 10 }}
                                                />
                                                Female
                                              </label>
                                            </div>
                                          </Grid>
                                          <Grid>
                                            <Field
                                              name='childrenAge'
                                              as='select'
                                              className='my-select'
                                            >
                                              {ageArray.map((items, i) => (
                                                <option key={i} value={items}>
                                                  {items} years
                                                </option>
                                              ))}
                                            </Field>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  ))}
                                </Grid>
                              </>
                            ) : null}

                            <Grid style={{ marginTop: 20 }}>
                              <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                              >
                                Submit
                              </Button>
                            </Grid>
                          </>
                        ) : null}
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormComponent;
