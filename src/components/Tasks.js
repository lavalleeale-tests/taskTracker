import Task from './Task'

const Tasks = ({ tasks, onDelete, onUpdate }) => {
    return (
        <>
            {tasks.map((task, id) => (
            <Task key={id} task={{id, ...task}} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
        </>
    )
}

export default Tasks
