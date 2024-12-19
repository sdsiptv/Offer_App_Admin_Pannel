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

export default function ListAdInsertion() {
    const classes = useStyles();
    const history = useHistory();
    const [AdInsertion, setAdInsertion] = useState([]);

    const columns = [
        {
            field: 'images',
            title: 'Logo',
            render: rowData =>
                typeof rowData.images == 'string' ? (
                    <img src={rowData.images} alt="" width={40} height={30} />
                ) : null,
        },
        { field: 'offer_name', title: 'Offer' },
        { field: 'position', title: 'Position' },
        { field: 'url', title: 'URL' },
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
                            history.push('EditAdInsertion', {
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

    const getAdInsertion = () => {
        apis.getAdInsertion().then(res => {
            console.log('hii', res?.data)
            setAdInsertion(res?.data);
        });
    };

    useEffect(() => {
        getAdInsertion();
    }, []);

    const deleteHandler = data => {
        let filter = data.map(obj => obj.id);
        if (filter.length === 0) {
            console.log("No IDs to delete");
            return;
        }
        let idToDelete = filter[0];
        apis.deleteAdInsertion(idToDelete).then(res => {
            toastMessage('Successfully Deleted');
            getAdInsertion();
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
                                    history.push('/AddAdInsertion');
                                }}
                            >
                                Add AdInsertion
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <MaterialTables
                            title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>AD INSERTION</span>}
                            columns={columns}
                            data={AdInsertion}
                            deleteHandler={deleteHandler}
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
