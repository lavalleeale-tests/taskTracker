import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import {
    Link,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: "10px"
    },
}))


const Header = ({ title, onAdd, showAdd, authActive }) => {
    const classes = useStyles();
    return (
        <header>
            <h1 style={{ display: "inline", "vertical-align": "top" }}>{title}</h1>
            {authActive ?
                <>
                    <Button className={classes.button} disabled variant="contained" onClick={onAdd} style={{ float: "right", "vertical-align": "middle" }} >
                        {showAdd ? "Close" : "Add"}
                    </Button>
                    <Link to="/" >
                        <Button className={classes.button} variant="contained" style={{ float: "right" }}>
                            Back
                    </Button>
                    </Link>
                </>
                :
                <>
                    <Button className={classes.button} variant="contained" onClick={onAdd} style={{ float: "right", "vertical-align": "middle" }} >
                        {showAdd ? "Close" : "Add"}
                    </Button>
                    <Link to="/login">
                        <Button className={classes.button} variant="contained" style={{ float: "right" }}>
                            Login
                    </Button>
                    </Link>
                </>
            }
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
    onAdd: PropTypes.func,
}

export default Header 
