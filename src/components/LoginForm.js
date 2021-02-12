import { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Login = ({ setUsername, setAuthKey, setNewAuth }) => {
    const classes = useStyles();
    const [usernameText, setUsernameText] = useState('')
    const [passwordText, setPasswordText] = useState('')

    const testAuth = async (password) => {
        const res = await fetch('https://tasktracker.alextesting.ninja/api/testAuth', {
          headers: {
            "auth": JSON.stringify({username:usernameText, password:password})
          }
        })
        return res.ok
      }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!usernameText||!passwordText) {
            alert("Please enter username and password")
            return
        }
        if (testAuth(passwordText)) {
            setUsername(usernameText)
            setAuthKey(passwordText)
            setNewAuth(true)
        } else {
            alert("Invalid Login")
        }
    }

    return (
        <form className={classes.root} onSubmit={onSubmit}>
            <TextField
                style={{ width: "95%" }}
                value={usernameText}
                onChange={(e) => setUsernameText(e.target.value)}
                label="Username"
                variant="outlined" />
                <TextField
                    style={{ width: "95%" }}
                    value={passwordText}
                    onChange={(e) => setPasswordText(e.target.value)}
                    type="password"
                    label="Password"
                    variant="outlined" />
            <Button variant="contained" type="submit">Submit</Button>
        </form>
    )
}

export default Login
