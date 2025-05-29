import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";

type TodolistPropsType = {
    title: string
    tasks: Array<Task>
    deleteTask: (id: Task["id"]) => void
    addTask: (title: Task["title"]) => void
    changeFilter: (filter: FilterValues) => void
    deleteAllTask: () => void
}

export type Task = {
    title: string
    isDone: boolean
    id: number
}

export const Todolist = ({title, deleteAllTask, tasks, deleteTask, changeFilter}: TodolistPropsType) => {


    const tasksList = tasks.length === 0
        ? <span>Your tasksList is empty</span>
        : <ul>
            {
                tasks.map((task: Task) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button text={"x"} onClickHandler={() => {
                            deleteTask(task.id)
                        }}/>
                    </li>))
            }
        </ul>

    return (
        <div className="todo">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button text={"+"}/>
            </div>
            {tasksList}
            <div>
                <Button
                    onClickHandler={() => changeFilter("all")}
                    text={"Все"}/>
                <Button
                    onClickHandler={() => changeFilter("active")}
                    text={"не выполнено"}/>
                <Button
                    onClickHandler={() => changeFilter("completed")}
                    text={"сделано"}/>
            </div>
            <div>
                <button onClick={() => {
                    deleteAllTask()
                }}>Delete all tasks
                </button>
            </div>
        </div>
    )
}







