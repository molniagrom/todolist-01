import './App.css'
import {Task, Todolist} from "./Todolist.tsx";

function App() {
    const todolistTitle_1 = "What to learn"

    const tasks_1: Task[] = [
        {
            title: " HTML&CSS",
            isDone: true,
            id: 1,
        },
        {
            title: "JS",
            isDone: true,
            id: 2,
        },
    ];

    return (
        <div className="app">
            <Todolist tasks={tasks_1} title={todolistTitle_1}/>
        </div>
    )
}

export default App
