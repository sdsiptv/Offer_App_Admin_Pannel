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

export default function AddEditEvents({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [images, setImage] = useState('');
    const [imageObj, setImageObj] = useState(undefined);

    const { register, handleSubmit, setValue } = useForm();

    const handleImageChange = event => {
        const fileUploaded = event.target.files[0];
        setImageObj(fileUploaded);
    };

    const onSubmit = ({
        event_name,
        url,
        landmark,
        email,
        mobile,
        google_location,
        event_date
    }) => {
        let data = new FormData();
        data.append('event_name', event_name);
        data.append('url', url);
        data.append('google_location', google_location);
        data.append('landmark', landmark);
        data.append('email', email);
        data.append('mobile', mobile);
        data.append('event_date', event_date);
        data.append('images', imageObj);
        const apiCall =
            pageMode === 'add'
                ? apis.addEvents(data)
                : apis.editEvents(location.state.state.data?.id, data);
        apiCall
            .then(res => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
                );
                history.push('/ViewEvents');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setValue('event_name', params.event_name);
            setValue('landmark', params.landmark);
            setValue('email', params.email);
            setValue('mobile', params.mobile);
            setValue('url', params.url);
            setValue('google_location', params.google_location);
            setValue('event_date', formatDate(params.event_date));
            setImage(params.images);
            console.log('image', params.images);
        } else {
            history.push('/AddEvents');
        }
    }, []);

    const formatDate = date => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} EVENTS
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="event_name"
                                label="Event Name"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="event_name"
                                {...register('event_name', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="url"
                                label="URL"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="url"
                                {...register('url', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="landmark"
                                label="LandMark"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="landmark"
                                {...register('landmark', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="google_location"
                                label="Google Locations"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="google_location"
                                {...register('google_location', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="mobile"
                                label="Mobile Number"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="mobile"
                                {...register('mobile', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="email"
                                label="Mail ID"
                                type="email"
                                InputLabelProps={{ shrink: true }}
                                id="email"
                                {...register('email', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="event_date"
                                label="Event Date"
                                type="datetime-local"
                                InputLabelProps={{ shrink: true }}
                                id="event_date"
                                {...register('event_date', { required: true })}
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
                                        htmlFor="contained-button-file"
                                    >
                                        ADD LOGO *
                                    </Button>
                                </label>
                                <img
                                    src={
                                        typeof imageObj === 'object'
                                            ? URL.createObjectURL(imageObj)
                                            : images
                                    }
                                    alt=""
                                    style={{ paddingLeft: '10px', width: '100px' }}
                                />
                            </div>
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
                                            history.push('/ViewEvents');
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
