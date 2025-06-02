import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {useRef} from "react";

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

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickHandler = () => {
        if (inputRef.current) {
            inputRef.current.value && createTask(inputRef.current.value)
            inputRef.current.value = ""
        }
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
                <input placeholder={"max 15 symbol"} ref={inputRef}/>
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







