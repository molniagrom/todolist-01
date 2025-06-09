import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = "all" | "active" | "completed";

function App() {
    const todolistTitle_1 = "What to learn"

const [filter, setFilter] = useState<FilterValues>("all")

    const [tasks, setTasks] = useState<Task[]>([
        {
            title: " HTML&CSS",
            isDone: true,
            id: v1(),
        },
        {
            title: "JS",
            isDone: false,
            id: v1(),
        }, {
            title: "CSS",
            isDone: true,
            id: v1(),
        },
    ])

    const deleteTask = (taskId: Task["id"]) => {
        const nextState = tasks.filter(t => t.id !== taskId);
        setTasks(nextState);
    }

    const createTask = (taskName: Task["title"]) => {
        const nextState: Task[] = [
            {
                title: taskName,
                id: v1(),
                isDone: false,
            },
            ...tasks,
        ]
        setTasks(nextState);
    }
    const changeHandler = (nextFilter: FilterValues) => {
        setFilter(nextFilter)
    }
    const changeTaskStatus = (taskId: Task["id"], newStatus: Task["isDone"]) => {
       let newTask = tasks.map(t => t.id === taskId ? {...t, isDone: newStatus } : t);
       setTasks(newTask);
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
                filter={filter}
                changeTaskStatus={changeTaskStatus}
                changeFilter={changeHandler}
                createTask={createTask}
                deleteTask={deleteTask}
                deleteAllTask={deleteAllTask}
                tasks={filteredTasks}
                title={todolistTitle_1}/>
        </div>
    )
}

export default App
