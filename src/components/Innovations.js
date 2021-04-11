import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import ApplicationsGrid from "./AppliactionsGrid";
import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../constants/apiConstants";
import {withRouter} from "react-router-dom";

function Innovations(props) {

    const headerTheme = createMuiTheme({
        palette: {
            primary: {
                main: "#ffffff"
            },
        },
    });

    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxHeight: '100%',
            maxWidth: '100%',
        },
    }));

    const classes = useStyles();
    const [data, setData] = React.useState([]);
    const [userInfo, setUserInfo] = React.useState([]);

    useEffect(() => {
        axios.get(API_BASE_URL + 'user/applications/getAll', {headers: {'Authorization': 'UrFU' + localStorage.getItem(ACCESS_TOKEN_NAME)}})
            .then(function (response) {
                if (response.status !== 200) {
                    localStorage.removeItem(ACCESS_TOKEN_NAME);
                    props.history.push('/auth');
                } else {
                    setData(response.data)
                }
            });
        axios.get(API_BASE_URL + 'user/getInfo?id=' + localStorage.getItem("id"), {headers: {'Authorization': 'UrFU' + localStorage.getItem(ACCESS_TOKEN_NAME)}})
            .then(function (response) {
                if (response.status !== 200) {
                    localStorage.removeItem(ACCESS_TOKEN_NAME);
                    props.history.push('/auth');
                } else {
                    setUserInfo(response.data)
                }
            })
    }, [props.history])

    return (
        <div className={classes.root}>
            <ThemeProvider theme={headerTheme}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <SupervisedUserCircleIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            Innovations UrFU
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ApplicationsGrid apps={data} user = {userInfo}/>
            </ThemeProvider>
        </div>
    );
}

export default withRouter(Innovations);