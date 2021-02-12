import { useState } from 'react'
import { TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const AddTask = ({ onAdd, setShowAddTask }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert("Please add a task")
            return
        }

        onAdd({ text, day, reminder })

        setText('')
        setDay('')
        setReminder(false)
        setShowAddTask(false)
    }
    const classes = useStyles();

    return (
        <form className={classes.root} onSubmit={onSubmit}>
            <TextField
                style={{ width: "95%" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="Task"
                variant="outlined" />
                <TextField
                    style={{ width: "95%" }}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    label="Day & Time"
                    variant="outlined" />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={reminder}
                        onChange={(e) => setReminder(e.currentTarget.checked)}
                        value={reminder}
                        color="primary"
                    />
                }
                label="Set Reminder"
            />
            <Button variant="contained" type="submit">Submit</Button>
        </form>
    )
}

export default AddTask
