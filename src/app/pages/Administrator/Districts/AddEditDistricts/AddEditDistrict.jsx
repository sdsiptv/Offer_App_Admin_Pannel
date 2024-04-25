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

export default function AddEditDistrict({ pageMode = 'add' }) {
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
        const stateId = selectedState;
        const districtName = data.district_name;
        const Id = data.district_id;
        const apiCall =
            pageMode === 'add'
                ? apis.addDistrict(stateId, districtName)
                : apis.editDistrict(Id, districtName);

        apiCall
            .then(res => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
                );
                history.push('/ListDistrict');
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

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setValue('district_id', params.id)
            console.log('cityid',params.id)
            setValue('district_name', params.district_name);
        } else {
            history.push('/AddDistrict');
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
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} DISTRICT
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
                                        }}
                                    >
                                        {State.map((ele) => (
                                            <MenuItem key={ele.id} value={ele.id}>
                                                {ele.state_name}
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
                                name="district_name"
                                label="District Name"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="district_name"
                                {...register('district_name', { required: true })}
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
                                            history.push('/ListDistrict');
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
