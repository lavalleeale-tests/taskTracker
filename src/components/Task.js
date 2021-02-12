import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { TextField, Checkbox, FormControlLabel, Button, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    task: {
        margin: "auto",
        "margin-top": "5px",
        "margin-bottom": "5px",
        maxWidth: 500,
        "padding-left": "10px",
        "padding-right": "10px",
    },
    reminder: {
        "border-left": "5px solid green"
    },
}));

const Task = ({ task, onDelete, onUpdate }) => {
    const [showEdit, setShowEdit] = useState(false)
    const [text, setText] = useState(task.text)
    const [day, setDay] = useState(task.day)
    const [reminder, setReminder] = useState(task.reminder)
    const id = task.id
    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert("Please add a task")
            return
        }

        onUpdate({ text, day, reminder, id })

        setShowEdit(false)
    }

    const classes = useStyles();

    return (
        <Card className={`${classes.task} ${task.reminder ? `${classes.reminder}` : ''}`} onDoubleClick={() => setShowEdit(!showEdit)}>
            <h1 style={{margin: "2%"}}>
                {task.text}
                <FaTimes style={{
                    color: "red",
                    cursor: "pointer",
                    float: "right"
                }}
                    onClick={() => onDelete(task.id)}
                />
            </h1>
            <h2 style={{margin: "3%"}}>{task.day}</h2>
            {showEdit &&
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
                    <FormControlLabel control={
                            <Checkbox
                                checked={reminder}
                                onChange={(e) => setReminder(e.currentTarget.checked)}
                                value={reminder}
                                color="primary"
                            />}
                        label="Set Reminder"
                    />
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
            }
        </Card>
    )
}

export default Task
