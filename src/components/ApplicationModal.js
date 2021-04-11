import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ApplicationCard from "./ApplicationCard";
import {CardHeader, Chip, Divider, Menu, MenuItem} from "@material-ui/core";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";

const useStyles  = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
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

const DialogTitle = withStyles(makeStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timezone: 'UTC'
};

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function ApplicationModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" color="secondary" onClick={handleClickOpen}>
                Подробнее
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
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
                            {props.app.content}
                        </Typography>
                    </CardContent>
                    <Chip size="small" label= {"Голосов " + props.app.votes}/>
                    <Button color="secondary">
                        Проголосовать
                    </Button>
                </Card>
                <DialogActions>

                    <Button autoFocus onClick={handleClose} color="secondary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}