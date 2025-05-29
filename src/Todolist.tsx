import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, useState} from "react";

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

export const Todolist = ({title, deleteAllTask, tasks, deleteTask, changeFilter, addTask}: TodolistPropsType) => {

    const [inputTitle, setInputTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (inputTitle === "") {
            alert("Add the name of the task")
            return
        }
        addTask(inputTitle)
        setInputTitle("")
    }

    console.log(inputTitle)

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
                <input value={inputTitle} onChange={onChangeHandler}/>
                <Button onClickHandler={onClickHandler} text={"+"}/>
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







