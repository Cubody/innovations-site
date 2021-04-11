import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CardHeader, Chip, Divider, Menu, MenuItem} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import ApplicationModal from "./ApplicationModal";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 12,
    },
    pos: {
        marginBottom: 12,
    },
    chips: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
            marginLeft: '0px'
        },
    }
}));

export default function ApplicationCard(props) {
    const classes = useStyles();
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timezone: 'UTC'
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                title={props.app.title}
                action={
                    (props.user.role === "MODERATOR" || props.user.role === "SUPERUSER") ?
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <IconButton variant="contained" {...bindTrigger(popupState)}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>Редактировать</MenuItem>
                                        <MenuItem onClick={popupState.close}>Поменять статус</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState> : (props.user.role === "EXPERT") ?
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <IconButton variant="contained" {...bindTrigger(popupState)}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>Экспертное мнение</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState> : ""
                }
            />
            <Divider/>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Предложил {props.app.authorName}
                    <br/>
                    {new Date(props.app.created).toLocaleString("ru", dateOptions)}
                </Typography>
                <div className={classes.chips}>
                    {(props.app.appStatus === "NEW") ?
                        <Chip size="small" label="На модерации" color="secondary"/> : ""}
                    {props.app.tags.split(';').map((tag, key) => {
                        return <Chip size="small" label={tag} key={key}/>
                    })}
                </div>
                <Typography variant="body2" component="p">
                    {props.app.content.toString().substr(0, 200) + "..."}
                </Typography>
            </CardContent>
            <CardActions>
                <ApplicationModal app={props.app} user={props.user}/>
            </CardActions>
        </Card>
    );
}