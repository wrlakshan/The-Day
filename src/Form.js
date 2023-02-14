import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';


import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name Required'),
    lastName: Yup.string()
      .required('Last Name Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$/,"Must be Uppercase,Lowercase,number and Symbol")
        .required( "Password Required")
        .max(99,  "Password Length is Long"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null],"Validation text Not Match") 
        .required( "Confirm Password is Required")
  });


export default function Form() {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    })


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

  return (
    <Box sx={{width: 400,backgroundColor: "#071426", borderRadius: "5px",padding: 2}}>
        <form onSubmit={formik.handleSubmit}>
            <Typography variant="body1" sx={{color: "white", marginTop: 1}} gutterBottom>
                First Name
            </Typography>
            <TextField id="firstName"  variant="outlined" fullWidth sx={{input: { color: 'white' }}}  
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <Typography variant="body1" sx={{color: "white", marginTop: 1}} gutterBottom>
                Last Name
            </Typography>
            <TextField id="lastName"  variant="outlined" fullWidth sx={{input: { color: 'white' }}}  
            
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}/>
            <Typography variant="body1" sx={{color: "white"}} gutterBottom>
                Email
            </Typography>
            <TextField id="email"  variant="outlined" fullWidth sx={{input: { color: 'white' }}}  
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}/>

            <Typography variant="body1" sx={{color: "white", marginTop: 1}} gutterBottom>
                Password
            </Typography>
            <FormControl fullWidth>
                <OutlinedInput
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    fullWidth 
                    sx={{input: { color: 'white' }}}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                {!!formik.touched.password && formik.errors.password && (
                    <FormHelperText error id="password-error">
                        {formik.errors.password}
                    </FormHelperText>
                )}
            </FormControl>
            <Typography variant="body1" sx={{color: "white", marginTop: 1}} gutterBottom>
                Confirm Password
            </Typography>
            <FormControl fullWidth>
                <OutlinedInput
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    fullWidth  
                    sx={{input: { color: 'white' }}}
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                        >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                {!!formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <FormHelperText error id="confirm-error">
                        {formik.errors.confirmPassword}
                    </FormHelperText>
                )}

            </FormControl>
            
            <br></br>
            <Stack  direction="row" justifyContent="center" alignItems="center">
                <Button type="submit" variant="contained" startIcon={<PersonAddAltOutlinedIcon />} sx={{marginY: 5,borderRadius: 50, paddingX: 4,paddingY: 2}}>
                    Sign Up
                </Button>
            </Stack>
        </form>
    </Box>
  )
}
