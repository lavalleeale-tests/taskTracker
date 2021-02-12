import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import LoginForm from './components/LoginForm'
import AddTask from './components/AddTask'
import { io } from 'socket.io-client';
import { Card } from '@material-ui/core';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
const apiURL = "https://alextesting.ninja/taskTracker/api"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [authKey, setAuthKey] = useState("")
  const [username, setUsername] = useState("")
  const [newAuth, setNewAuth] = useState(false)
  

  var webSocket = io("wss://alextesting.ninja", {
    path: "/taskTracker/socket"
  })
  webSocket.on('update', function (data) { setTasks(JSON.parse(data)) });

  const theme = createMuiTheme({
    palette: {
      type: "dark",
    }
  });
  const useStyles = makeStyles({
    root: {
      margin: "auto",
      "margin-top": "10px",
      "margin-bottom": "10px",
      maxWidth: 500,
      padding: "30px",
    },
    header: {
      display: "inline-block"
    }
  });

  const fetchTasks = async () => {
    const res = await fetch(`${apiURL}/tasks`, {
      headers: {
        "auth": JSON.stringify({username:username, password:authKey})
      }
    })
    const data = await res.json()
    return data
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
  

  const addTask = async (task) => {
    const res = await fetch(`${apiURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth": JSON.stringify({username:username, password:authKey})
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`${apiURL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "auth": JSON.stringify({username:username, password:authKey})
      }
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }
  const updateTask = async (task) => {

    const res = await fetch(`${apiURL}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth": JSON.stringify({username:username, password:authKey})
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks(tasks.map((updatedTask) => updateTask.id === task.id ? { ...task, reminder: data.reminder } : task))
  }
  function Notes() {
    if (newAuth) {
      setNewAuth(false)
      getTasks()
    }
    return (
      <>
        <Card variant="outlined" className={classes.root}>
          <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} authActive={false}/>
        </Card>
        {tasks.length > 0 && <Tasks tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />}
        {showAddTask && <Card variant="outlined" className={classes.root}>
          <AddTask onAdd={addTask} setShowAddTask={setShowAddTask} />
        </Card>}
        <Card variant="outlined" className={classes.root}>
          <Footer />
        </Card>
      </>
    )
  }
  function Login() {
    return (
      <>
        <Card variant="outlined" className={classes.root}>
          <Header title="Login" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} authActive={true} />
        </Card>
        <Card variant="outlined" className={classes.root}>
          <LoginForm setAuthKey={setAuthKey} setUsername={setUsername} setNewAuth={setNewAuth} />
        </Card>
        <Card variant="outlined" className={classes.root}>
          <Footer />
        </Card>
      </>
    )
  }
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={"/taskTracker"}>
        <Route exact path="/" component={Notes} />
        <Route exact path="/login" component={Login} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
