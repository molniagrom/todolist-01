import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: Array<Task>
    deleteTask: (id: Task["id"]) => void
    createTask: (title: Task["title"]) => void
    changeFilter: (filter: FilterValues) => void
    deleteAllTask: () => void
}

export type Task = {
    title: string
    isDone: boolean
    id: string
}

export const Todolist = ({
                             title,
                             deleteAllTask,
                             tasks,
                             deleteTask,
                             changeFilter,
                             createTask
                         }: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState("")
    const createTaskCondition = taskTitle === "" || taskTitle.length > 15

    const onClickHandler = () => {
        createTask(taskTitle)
        setTaskTitle("")
    }

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
                <input
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !createTaskCondition) {
                            onClickHandler()
                        }
                    }}
                    onChange={e => setTaskTitle((e.currentTarget.value))}
                    value={taskTitle} placeholder={"max 15 symbol"}/>
                <Button disabled={createTaskCondition}
                        onClickHandler={onClickHandler} text={"+"}/>
                {taskTitle && taskTitle.length <= 15 && <p>"max 15 symbol"</p>}
                {taskTitle && taskTitle.length > 15 && <p style={{color: "red"}}>"title is too long"</p>}
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







