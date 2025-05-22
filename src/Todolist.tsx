import {Button} from "./Button.tsx";

type TodolistPropsType = {
    title: string
    tasks: Array<Task>
}

export type Task = {
    title: string
    isDone: boolean
    id: number
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {
    const tasksList = tasks.length === 0
        ? <span>Your tasksList is empty</span>
        : <ul>
            {
                tasks.map((task: Task) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
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
                <Button text={"All"}/>
                <Button text={"Active"}/>
                <Button text={"Completed"}/>
            </div>
        </div>
    )
}







