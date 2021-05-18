import React from 'react';
import { MuiPickersUtilsProvider} from '@material-ui/pickers';
// pick a date util library
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import QueueIcon from '@material-ui/icons/Queue';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import '../App.css';

function AddTraining(props) {
    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({
      date: '',
      duration: '',
      activity: '',
      firstname: props.customer.firstname,
      lastname: props.customer.lastname
    });

    const useStyles = makeStyles((theme) => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      }
    }));

    const classes = useStyles();

    const handleClickOpen = () => { //call from edit button
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
      props.addTraining(training);
      console.log(training);
      setOpen(false);
    }
    const inputChanged = (event) => {
      setTraining({...training, [event.target.name] : event.target.value});
      console.log(training);
    }
    
    return (
        <div>
        <IconButton style={{ marginTop: 5 }} color="primary" onClick={handleClickOpen} alt="Add training">
          <QueueIcon />
        </IconButton>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add training ({training.firstname} {training.lastname})</DialogTitle>
        <DialogContent>
        <select name="activity" class="training-list" onChange={inputChanged}>
            <option value=""></option>
            <option value="Jogging">Jogging</option>
            <option value="Boxing">Boxing</option>
            <option value="Cycling">Cycling</option>
            <option value="Gym training">Gym training</option>
            <option value="Spinning">Spinning</option>
            <option value="Zumba">Zumba</option>
        </select>
        <TextField
            name="date"
            label="Date"
            type="datetime-local"
            defaultValue={Date.now()}
            onChange={inputChanged}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
        />
        <TextField
            margin="dense"
            label="Duration (min)"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
            Save
        </Button>
        </DialogActions>
        </Dialog>
        </MuiPickersUtilsProvider>
        </div>
    );
}

export default AddTraining;
