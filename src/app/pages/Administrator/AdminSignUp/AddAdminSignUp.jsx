import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Typography,
    IconButton
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import apis from 'app/api';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { countries } from 'utils/constant/countries';
import { countryToFlag, toastMessage, failureNotification } from 'utils/helper';
import useStyles from 'styles/globalStyles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const roles = ['admin', 'mso', 'SmsUser', 'audit'];

export default function AddAdminSignUp() {
    const history = useHistory();
    const classes = useStyles();
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('admin');
    const [inputValue, setInputValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [State, setState] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [District, setDistrict] = useState([]);
    const [City, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = () => {
        apis.getState()
            .then((res) => {
                setState(res?.data);
                console.log('teststate', res?.data)
            })
            .catch((error) => {
                console.error('Error fetching states:', error);
            });
    };

    const fetchDistricts = (id) => {
        apis.getDistrict(id)
            .then((res) => {
                setDistrict(res?.data);
                console.log('Districts for state ', id, ':', res?.data);
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    };

    const fetchCities = (id) => {
        apis.getCities(id)
            .then((res) => {
                setCity(res?.data);
                console.log('Cities for district ', id, ':', res?.data);
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    };

    const onSubmit = ({
        fullname,
        emailid,
        mobile_no,
        password,
        confirm_password,
        address,
        postalcode,

    }) => {
        let data = new FormData();
        data.append('fullname', fullname);
        data.append('emailid', emailid);
        data.append('mobile_no', mobile_no);
        data.append('confirm_password', confirm_password);
        data.append('password', password);
        data.append('address', address);
        data.append('postalcode', postalcode);
        data.append('state', selectedState);
        data.append('district', selectedDistrict);
        data.append('city', selectedCity);

        apis.addAdmin(data).then(res => {
            toastMessage('Successfully addedd');
            history.push('/dashboard');
        });

    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                NEW ADMIN USER
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2} maxwidth="xs">
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="fullname"
                                        name="fullname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="fullname"
                                        label="Full Name"
                                        type="text"
                                        autoFocus
                                        size="small"
                                        {...register('fullname', { required: true })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="emailid"
                                        label="Email Address"
                                        name="emailid"
                                        type="emailid"
                                        autoComplete="text"
                                        size="small"
                                        {...register('emailid', { required: true })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="mobile_no"
                                        label="Mobile Number"
                                        type="text"
                                        id="mobile_no"
                                        size="small"
                                        {...register('mobile_no', { required: true, minLength: 10 })}
                                        error={Boolean(errors.phone)}
                                        helperText={
                                            errors.phone && '*Mobile Number must be minimum 10 digits'
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        {...register('password', { required: true })}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="confirm_password"
                                        label="Confirm Password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirm_password"
                                        {...register('confirm_password', { required: true })}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="address"
                                        name="address"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        type="text"
                                        autoFocus
                                        size="small"
                                        {...register('address', { required: true })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="filled-select-state"
                                        select
                                        label="State"
                                        required
                                        fullWidth
                                        helperText="Please select your State"
                                        variant="outlined"
                                        size="small"
                                        value={selectedState}
                                        type="text"
                                        onChange={(e) => {
                                            const selectedStateId = e.target.value;
                                            console.log('Selected state ID: ', selectedStateId);
                                            setSelectedState(selectedStateId);
                                            fetchDistricts(selectedStateId);
                                        }}
                                    >
                                        {State.map((ele) => (
                                            <MenuItem key={ele.id} value={ele.id}>
                                                {ele.state_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        select
                                        fullWidth
                                        name="district"
                                        label="District"
                                        size="small"
                                        helperText="Please select your District"
                                        type="text"
                                        id="district"
                                        {...register('district')}
                                        value={selectedDistrict}
                                        onChange={(e) => {
                                            const selectedDistrictId = e.target.value;
                                            console.log('Selected district ID:', selectedDistrictId);
                                            setSelectedDistrict(selectedDistrictId);
                                            fetchCities(selectedDistrictId);
                                        }}
                                    >
                                        {District.map((provider) => (
                                            <MenuItem key={provider.id} value={provider.id}>
                                                {provider.district_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        select
                                        fullWidth
                                        name="city"
                                        label="City"
                                        size="small"
                                        helperText="Please select your City"
                                        type="text"
                                        id="city"
                                        {...register('city')}
                                        value={selectedCity}
                                        onChange={(e) => {
                                            const selectedCityId = e.target.value;
                                            console.log('Selected district ID:', selectedCityId);
                                            setSelectedCity(selectedCityId);
                                        }}
                                    >
                                        {City.map((provider) => (
                                            <MenuItem key={provider.id} value={provider.id}>
                                                {provider.city_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="postalcode"
                                        label="Postal Code"
                                        type="number"
                                        id="postalcode"
                                        size="small"
                                        {...register('postalcode', { required: true })}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{ backgroundColor: GREEN, width: 200 }}
                                    >
                                        Resigter
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                                        onClick={() => {
                                            history.push('/dashboard');
                                        }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </form>

        </Container>
    );
}
