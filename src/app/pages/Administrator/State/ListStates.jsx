import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
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

export default function ViewListStates() {
    const classes = useStyles();
    const history = useHistory();
    const [States, setStates] = useState([]);

    const columns = [
        { field: 'state_name', title: 'State Name' },
        { field: 'id', title: 'State ID' },
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
                            history.push('EditStates', {
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

    const getState = () => {
        apis.getState().then(res => {
            console.log('hii', res?.data)
            setStates(res?.data);
        });
    };

    useEffect(() => {
        getState();
    }, []);

    const deleteHandler = data => {
        let filter = data.map(obj => obj.id);
        if (filter.length === 0) {
            console.log("No IDs to delete");
            return;
        }
        let idToDelete = filter[0];
        apis.deleteState(idToDelete).then(res => {
            toastMessage('Successfully Deleted');
            getState();
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
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: GREEN }}
                                onClick={() => {
                                    history.push('/AddStates');
                                }}
                            >
                                Add State
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <MaterialTables
                            title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>VIEW STATES</span>}
                            columns={columns}
                            data={States}
                            deleteHandler={deleteHandler}
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
