import { Button, Container, CssBaseline, Grid, TextField, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from 'styles/globalStyles';
import { useForm } from 'react-hook-form';
export default function ViewListCity() {
    const classes = useStyles();
    const history = useHistory();
    const [State, setState] = useState([]);
    const [City, setCity] = useState([]);
    const [selectedState, setSelectedState] = useState('31'); 
    const [selectedDistrict, setSelectedDistrict] = useState('1');
    const [District, setDistrict] = useState([]);
    const { register, handleSubmit, setValue } = useForm();

    const columns = [
        { field: 'city_name', title: 'city_name' },
        // { field: 'position', title: 'Position' },
        {
            field: 'actions',
            title: 'Actions',
            sorting: false,
            render: rowData => (
                <Tooltip title="Edit">
                    <IconButton
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => {
                            history.push('EditCity', {
                                state: { data: rowData },
                            });
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];


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

    const deleteHandler = data => {
        let filter = data.map(obj => obj.id);
        if (filter.length === 0) {
            console.log("No IDs to delete");
            return;
        }
        let idToDelete = filter[0];
        apis.deleteCities(idToDelete).then(res => {
            toastMessage('Successfully Deleted');
            fetchCities();
        });
    };

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Grid container spacing={1} alignItems="flex-end"></Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
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

                        <Grid item xs={3}>
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

                        <Grid item xs={6}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: GREEN }}
                                    onClick={() => {
                                        history.push('/AddCity');
                                    }}
                                >
                                    Add City
                                </Button>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <MaterialTables
                                title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>View City List</span>}
                                columns={columns}
                                data={City}
                                deleteHandler={deleteHandler}
                            />
                        </Grid>

                    </Grid>

                </Grid>
            </div>
        </Container>
    );
}
