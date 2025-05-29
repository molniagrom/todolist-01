import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useState} from "react";

export type FilterValues = "all" | "active" | "completed";

function App() {
    const todolistTitle_1 = "What to learn"

const [filter, setFilter] = useState<FilterValues>("all")

    const [tasks, setTasks] = useState<Task[]>([
        {
            title: " HTML&CSS",
            isDone: true,
            id: 1,
        },
        {
            title: "JS",
            isDone: false,
            id: 2,
        }, {
            title: "CSS",
            isDone: true,
            id: 3,
        },
    ])

    const deleteTask = (taskId: Task["id"]) => {
        const nextState = tasks.filter(t => t.id !== taskId);
        setTasks(nextState);
    }

    const addTask = (taskName: Task["title"]) => {
        const nextState = [
            {
                title: taskName,
                id: 4,
                isDone: false,
            },
            ...tasks,
        ]
        setTasks(nextState);
    }
    const changeHandler = (nextFilter: FilterValues) => {
        setFilter(nextFilter)
    }

    function deleteAllTask (): void {
        setTasks([])
    }

    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    return (
        <div className="app">
            <Todolist
                changeFilter={changeHandler}
                addTask={addTask}
                deleteTask={deleteTask}
                deleteAllTask={deleteAllTask}
                tasks={filteredTasks}
                title={todolistTitle_1}/>
        </div>
    )
}

export default App
