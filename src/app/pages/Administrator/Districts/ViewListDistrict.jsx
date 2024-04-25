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
export default function ViewListDistrict() {
    const classes = useStyles();
    const history = useHistory();
    const [State, setState] = useState([]);
    const [City, setCity] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [District, setDistrict] = useState([]);
    const { register, handleSubmit, setValue } = useForm();

    const columns = [
        { field: 'district_name', title: 'district_name' },
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
                            history.push('EditDistrict', {
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

    const deleteHandler = data => {
        let filter = data.map(obj => obj.id);
        if (filter.length === 0) {
            console.log("No IDs to delete");
            return;
        }
        let idToDelete = filter[0];
        apis.deleteDistrict(idToDelete).then(res => {
            toastMessage('Successfully Deleted');
            fetchDistricts();
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
                        <Grid item xs={4}>
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

                        <Grid item xs={8}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: GREEN }}
                                    onClick={() => {
                                        history.push('/AddDistrict');
                                    }}
                                >
                                    Add District
                                </Button>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <MaterialTables
                                title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>View District List</span>}
                                columns={columns}
                                data={District}
                                deleteHandler={deleteHandler}
                            />
                        </Grid>

                    </Grid>

                </Grid>
            </div>
        </Container>
    );
}
