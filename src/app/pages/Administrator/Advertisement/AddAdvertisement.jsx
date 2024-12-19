import {
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditAdvertisement({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const [imageObj, setImageObj] = useState(undefined);
    const [image, setImage] = useState('');
    const [State, setState] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [District, setDistrict] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [City, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [UseState, setUseState] = useState(false);
    const [UseDistrict, setUseDistrict] = useState(false);
    const [UseCity, setUseCity] = useState(false);

    const { register, handleSubmit, setValue } = useForm();

    const handleImageChange = event => {
        const fileUploaded = event.target.files[0];
        setImageObj(fileUploaded);
    };

    useEffect(() => {
        fetchStates();
        if (location.state) {
            let params = location.state.state.data;
            setValue('position', params.position);
            setValue('url', params.url);
            setImage(params.logo);
        } else if (pageMode === 'edit') {
            history.push('/Advertisement');
        }
    }, []);

    const fetchStates = () => {
        apis.getState()
            .then(res => setState(res.data))
            .catch(err => failureNotification('Error fetching states'));
    };

    const fetchDistricts = stateId => {
        apis.getDistrict(stateId)
            .then(res => setDistrict(res.data))
            .catch(err => failureNotification('Error fetching districts'));
    };

    const fetchCities = districtId => {
        apis.getCities(districtId)
            .then(res => setCity(res.data))
            .catch(err => failureNotification('Error fetching cities'));
    };

    const handleCheckboxChange = checkbox => {
        setUseState(checkbox === 'state');
        setUseDistrict(checkbox === 'district');
        setUseCity(checkbox === 'city');
    };

    const onSubmit = ({ position, url }) => {
        let data = new FormData();
        data.append('position', position);
        data.append('url', url);
        data.append('images', imageObj);
        if (UseState) data.append('state', selectedState);
        if (UseDistrict) data.append('district', selectedDistrict);
        if (UseCity) data.append('city', selectedCity);

        const apiCall =
            pageMode === 'add'
                ? apis.addAdvertisement(data)
                : apis.editAdvertisement(location.state.state.data?.id, data);

        apiCall
            .then(() => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added` : `Successfully Updated`,
                );
                history.push('/Advertisement');
            })
            .catch(() => failureNotification('Network error'));
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} ADVERTISEMENT
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                label="State"
                                control={
                                    <Checkbox
                                        checked={UseState}
                                        onChange={() => handleCheckboxChange('state')}
                                        style={{ color: '#673ab7' }}
                                    />
                                }
                            />
                            {UseState && (
                                <TextField
                                    id="state-select"
                                    select
                                    label="State"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={selectedState}
                                    onChange={e => {
                                        const stateId = e.target.value;
                                        setSelectedState(stateId);
                                        fetchDistricts(stateId);
                                    }}
                                >
                                    {State.map(state => (
                                        <MenuItem key={state.id} value={state.id}>
                                            {state.state_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                label="District"
                                control={
                                    <Checkbox
                                        checked={UseDistrict}
                                        onChange={() => handleCheckboxChange('district')}
                                        style={{ color: '#673ab7' }}
                                    />
                                }
                            />
                            {UseDistrict && (
                                <TextField
                                    id="district-select"
                                    select
                                    label="District"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={selectedDistrict}
                                    onChange={e => {
                                        const districtId = e.target.value;
                                        setSelectedDistrict(districtId);
                                        fetchCities(districtId);
                                    }}
                                >
                                    {District.map(district => (
                                        <MenuItem key={district.id} value={district.id}>
                                            {district.district_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                label="City"
                                control={
                                    <Checkbox
                                        checked={UseCity}
                                        onChange={() => handleCheckboxChange('city')}
                                        style={{ color: '#673ab7' }}
                                    />
                                }
                            />
                            {UseCity && (
                                <TextField
                                    id="city-select"
                                    select
                                    label="City"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={selectedCity}
                                    onChange={e => setSelectedCity(e.target.value)}
                                >
                                    {City.map(city => (
                                        <MenuItem key={city.id} value={city.id}>
                                            {city.city_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="position"
                                label="Position"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="position"
                                {...register('position', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="url"
                                label="Image Deep Link URL"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="url"
                                {...register('url', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <div style={{ display: 'flex' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={hiddenFileInput}
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    id="contained-button-file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                    >
                                        ADD IMAGE
                                    </Button>
                                </label>
                                <img
                                    src={
                                        typeof imageObj === 'object'
                                            ? URL.createObjectURL(imageObj)
                                            : image
                                    }
                                    alt=""
                                    style={{ paddingLeft: '10px', width: '100px' }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{ backgroundColor: GREEN, marginRight: 10 }}
                                >
                                    {pageMode === 'add' ? 'CREATE' : 'UPDATE'}
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: LIGHT_GREY }}
                                    onClick={() => history.push('/Advertisement')}
                                >
                                    BACK
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Container>
    );
}
