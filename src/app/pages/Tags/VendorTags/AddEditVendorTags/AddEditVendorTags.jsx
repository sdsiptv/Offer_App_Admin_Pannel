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

export default function AddEditVendorTags({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue } = useForm();
    const [Category, setCategory] = useState([]);
    const [City, setCity] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [District, setDistrict] = useState([]);

    const onSubmit = data => {
        const stateId = selectedState;
        const name = data.name;
        const Id = data.id;
        const apiCall =
            pageMode === 'add'
                ? apis.addVendorTags(name, stateId)
                : apis.editVendorTags(name, stateId, Id);

        apiCall
            .then(res => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
                );
                history.push('/ViewVendorTags');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = () => {
        apis.getCategory()
            .then((res) => {
                setCategory(res?.data);
                console.log('teststate', res?.data)
            })
            .catch((error) => {
                console.error('Error fetching states:', error);
            });
    };

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setSelectedState(params.category_id)
            console.log('cityid', params.id)
            setValue('name', params.name);
            setValue('id',params.id)
        } else {
            history.push('/AddVendorTags');
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
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} VENDOR TAGS
                            </Typography>
                        </Grid>

                        <>
                            <Grid item xs={12}>
                                <TextField
                                    id="filled-select-state"
                                    select
                                    label="Category"
                                    required
                                    fullWidth
                                    helperText="Please select your Category"
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
                                    {Category.map((ele) => (
                                        <MenuItem key={ele.id} value={ele.id}>
                                            {ele.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="name"
                                label="Tag Name"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="name"
                                {...register('name', { required: true })}
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
                                            history.push('/ViewVendorTags');
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
