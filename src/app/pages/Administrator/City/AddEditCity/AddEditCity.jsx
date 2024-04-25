import {
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    MenuItem
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditCity({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue } = useForm();
    const [State, setState] = useState([]);
    const [City, setCity] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [District, setDistrict] = useState([]);

    const onSubmit = data => {
        const districtId = selectedDistrict;
        const cityName = data.city_name;
        const Id = data.city_id;
        const apiCall =
            pageMode === 'add'
                ? apis.addCities(districtId, cityName)
                : apis.editCities(Id, cityName);

        apiCall
            .then(res => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
                );
                history.push('/ListCity');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };

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

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setValue('city_id', params.id)
            console.log('cityid',params.id)
            setValue('city_name', params.city_name);
        } else {
            history.push('/AddCity');
        }
    }, []);

    return (

        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} CITY
                            </Typography>
                        </Grid>

                        {pageMode === 'add' && (
                            <>
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
                                        }}
                                    >
                                        {District.map((provider) => (
                                            <MenuItem key={provider.id} value={provider.id}>
                                                {provider.district_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </>
                        )}

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="city_name"
                                label="City Name"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="city_name"
                                {...register('city_name', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <div>
                                    <Button
                                        type="submit"
                                        required
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: GREEN, width: 150 }}
                                    >
                                        {pageMode === 'add' ? 'Create' : 'Update'}
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        required
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY.length, width: 150 }}
                                        onClick={() => {
                                            history.push('/ListCity');
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
