import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Typography
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
import toast, { Toaster } from 'react-hot-toast';

const roles = ['1', '2'];

export default function AddVendorPushNotification() {
    const hiddenFileInput1 = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);
    const history = useHistory();
    const classes = useStyles();
    const [role, setRole] = useState('admin');
    const [State, setState] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [District, setDistrict] = useState([]);
    const [City, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [UseState, setUseState] = useState(false);
    const [UseDistrict, setUseDistrict] = useState(false);
    const [UseCity, setUseCity] = useState(false);
    const [Vendor, setVendor] = useState(false);
    const [customerData, setCustomerData] = useState([]);
    const [userIds, setUserId] = useState(null);
    const [imageObj1, setImageObj1] = useState(undefined);
    const [image1, setImage1] = useState('');
    const [imageObj2, setImageObj2] = useState(undefined);
    const [image2, setImage2] = useState('');

    const handleImageChange1 = event => {
        const fileUploaded = event.target.files[0];
        setImageObj1(fileUploaded);
    };

    const handleImageChange2 = event => {
        const fileUploaded = event.target.files[0];
        setImageObj2(fileUploaded);
    };

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

    const handleGetCustomer = () => {
        apis.getAllVendors().then(res => {
            setCustomerData(res.data);
        });
    };

    useEffect(() => {
        handleGetCustomer();
    }, []);

    const handleChangeRole = event => {
        setRole(event.target.value);
    };

    const handleCheckboxChange = (checkbox) => {
        setUseState(checkbox === 'state');
        setUseDistrict(checkbox === 'district');
        setUseCity(checkbox === 'city');
        setVendor(checkbox === 'vendor');
    };

    const onSubmit = async ({
        message,
        title
    }) => {
        let data = new FormData();
        if (UseState) data.append('state', selectedState);
        if (UseDistrict) data.append('district', selectedDistrict);
        if (UseCity) data.append('city', selectedCity);
        if (Vendor) data.append('vendor', userIds);
        data.append('message', message);
        data.append('title', title);
        data.append('type', role);
        // data.append('vendor', userIds);
        data.append('banners', imageObj1);
        // data.append('icon', imageObj2);

        try {
            const res = await apis.addVendorPushNotification(data);
            toast.success('Successfully Added', { duration: 5000 });
            history.push('/dashboard');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized: Please check your credentials.', { duration: 5000 });
            } else {
                toast.error('Unauthorized..!', { duration: 5000 });
            }
        }
    };

    return (
        <div>
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
                                    VENDOR PUSH NOTIFICATION
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={2} maxwidth="xs">

                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            label="State"
                                            control={
                                                <Checkbox
                                                    checked={UseState}
                                                    onChange={() => handleCheckboxChange('state')}
                                                    style={{ color: "#673ab7" }}
                                                />
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={8}>
                                        <TextField
                                            id="filled-select-state"
                                            select
                                            label="State"
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

                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            label="District"
                                            control={
                                                <Checkbox
                                                    checked={UseDistrict}
                                                    onChange={() => handleCheckboxChange('district')}
                                                    style={{ color: "#673ab7" }}
                                                />
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={8}>
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

                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            label="City"
                                            control={
                                                <Checkbox
                                                    checked={UseCity}
                                                    onChange={() => handleCheckboxChange('city')}
                                                    style={{ color: "#673ab7" }}
                                                />
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={8}>
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
                                                console.log('Selected city ID:', selectedCityId);
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

                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            label="Vendors"
                                            control={
                                                <Checkbox
                                                    checked={Vendor}
                                                    onChange={() => handleCheckboxChange('vendor')}
                                                    style={{ color: "#673ab7" }}
                                                />
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Autocomplete
                                            id="Vendor_id"
                                            options={customerData}
                                            getOptionLabel={option => option?.id + ' - ' + option?.shop_name}
                                            onChange={(event, newValue) => {
                                                if (newValue) {
                                                    setUserId(newValue.id);
                                                } else {
                                                    setUserId(null);
                                                }
                                            }}
                                            renderInput={params => ( 
                                                <TextField
                                                    {...params}
                                                    label="Vendor"
                                                    variant="outlined"
                                                    helperText="Please select your Vendor"
                                                    autoFocus
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="title"
                                            label="title"
                                            type="text"
                                            id="title"
                                            size="small"
                                            {...register('title', { required: true })}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="message"
                                            label="Message"
                                            type="text"
                                            id="message"
                                            size="small"
                                            {...register('message', { required: true })}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={hiddenFileInput1}
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange1}
                                                id="contained-button-file1"
                                            />
                                            <label htmlFor="contained-button-file1">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                    htmlFor="contained-button-file1"
                                                >
                                                    Banners
                                                </Button>
                                            </label>
                                            <img
                                                src={
                                                    typeof imageObj1 == 'object'
                                                        ? URL.createObjectURL(imageObj1)
                                                        : image1
                                                }
                                                alt=""
                                                style={{ paddingLeft: '10px', width: '100px' }}
                                            />
                                        </div>
                                    </Grid>

                                    {/* <Grid item xs={6}>
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={hiddenFileInput2}
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange2}
                                                id="contained-button-file2"
                                            />
                                            <label htmlFor="contained-button-file2">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                    htmlFor="contained-button-file2"
                                                >
                                                    Icon
                                                </Button>
                                            </label>
                                            <img
                                                src={
                                                    typeof imageObj2 == 'object'
                                                        ? URL.createObjectURL(imageObj2)
                                                        : image2
                                                }
                                                alt=""
                                                style={{ paddingLeft: '10px', width: '100px' }}
                                            />
                                        </div>
                                    </Grid> */}

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
                                            Send
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
            <Toaster />
        </div>
    );
}
