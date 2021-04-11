import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../constants/apiConstants';
import axios from 'axios';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header: {
        textAlign: "center"
    }
}));

function SignIn(props) {
    const classes = useStyles();
    const [errorMsg, setError] = useState(null);

    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "login": state.email,
            "password": state.password,
        }
        axios.post(API_BASE_URL + 'public/auth/', payload)
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                    localStorage.setItem("id", response.data.id);

                    props.history.push('/');
                    setError(null)
                } else if (response.status === 401) {
                    setError("Username and password do not match");
                } else {
                    setError("Username does not exists");
                }
            })
            .catch(function (error) {
                if (error.toString().includes("401"))
                    setError("Вы вели неверные данные для авторизации");
                else
                    setError("Сервер не отвечает, попробуйте позже...");
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.header}>
                    Войдите, используя учётную запись UrFU
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Почта"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        value={state.email}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={state.password}
                    />
                    <Typography>
                        {errorMsg}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={handleSubmitClick}
                    >
                        Войти
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default withRouter(SignIn);