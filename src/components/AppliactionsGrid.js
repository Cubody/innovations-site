import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ApplicationCard from "./ApplicationCard";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxHeight: '100%',
        maxWidth: '100%',
        marginTop: '15px'
    },
}));

export default function ApplicationsGrid(props) {
    const classes = useStyles();
    return (
        <Grid container spacing={3} className={classes.root}>
            {props.apps.map((app, key) => {
                return <Grid item key = {key}>
                    <ApplicationCard app = {app} user = {props.user}/>
                </Grid>
            })}
        </Grid>
    );
}