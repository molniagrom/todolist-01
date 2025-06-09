import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import "./App.css"


type TodolistPropsType = {
    title: string
    filter: FilterValues
    tasks: Array<Task>
    deleteTask: (id: Task["id"]) => void
    changeTaskStatus: (id: Task["id"], newStatus: Task["isDone"]) => void
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
                             filter,
                             changeFilter,
                             changeTaskStatus,
                             createTask
                         }: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState(false)
    const createTaskCondition = taskTitle === "" || taskTitle.length > 15

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTaskTitle("")
    }
    const createTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle((e.currentTarget.value))
    }
    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !createTaskCondition) {
            createTaskHandler()
        }
    }

    const tasksList = tasks.length === 0
        ? <span>Your tasksList is empty</span>
        : <ul>
            {
                tasks.map((task: Task) => (
                    <li className={task.isDone ? "taskDone" : "task"} key={task.id}>
                        <input onChange={() => changeTaskStatus(task.id, !task.isDone)} type="checkbox"
                               checked={task.isDone}/>
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
                    className={error ? "inputError" : ""}
                    onKeyDown={onKeyDownCreateTaskHandler}
                    onChange={createTaskTitle}
                    value={taskTitle} placeholder={"max 15 symbol"}/>
                <Button disabled={createTaskCondition}
                        onClickHandler={createTaskHandler} text={"+"}/>
                {taskTitle && taskTitle.length <= 15 && <p>"max 15 symbol"</p>}
                {taskTitle && taskTitle.length > 15 && <p style={{color: "red"}}>"title is too long"</p>}
                {error && <><br/> <div style={{color: "red"}}>Title must be valid </div></>}
            </div>
            {tasksList}
            <div>
                <Button
                    className={filter === "all" ? "btnFilterActive" : undefined}
                    onClickHandler={() => changeFilter("all")}
                    text={"Все"}/>
                <Button
                    className={filter === "active" ? "btnFilterActive" : undefined}
                    onClickHandler={() => changeFilter("active")}
                    text={"не выполнено"}/>
                <Button
                    className={filter === "completed" ? "btnFilterActive" : undefined}
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







