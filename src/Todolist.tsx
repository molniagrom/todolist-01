import {Button} from "./Button.tsx";
import {FilterValues, TodolistType} from "./App.tsx";
import "./App.css"
import CreateItemForm from "./components/CreateItemForm.tsx";
import {EditableSpan} from "./components/EditableSpan.tsx";


type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValues
    tasks: Array<Task>
    deleteTodolist: (todolistId: string) => void
    deleteTask: (id: Task["id"], todolistId: string) => void
    changeTaskStatus: (id: Task["id"], newStatus: Task["isDone"], todolistId: string) => void
    createTask: (title: Task["title"], todolistId: string) => void
    changeTodolistFilter: (filter: FilterValues, todolistId: string) => void
    deleteAllTask: (todolistId: string) => void
    changeTaskTitle: (taskId: Task["id"], newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: TodolistType["title"], todolistId: string) => void
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
                             todolistId,
                             filter,
                             changeTodolistTitle,
                             changeTaskTitle,
                             deleteTodolist,
                             changeTodolistFilter,
                             changeTaskStatus,
                             createTask
                         }: TodolistPropsType) => {

    const tasksList = tasks.length === 0
        ? <span>Your tasksList is empty</span>
        : <ul>
            {
                tasks.map((task: Task) => {

                    const changeTaskStatusHandler = (newTitle: string) => {
                        changeTaskTitle(task.id, newTitle, todolistId)
                    }

                    return <li className={task.isDone ? "taskDone" : "task"} key={task.id}>
                        <input onChange={() => changeTaskStatus(task.id, !task.isDone, todolistId)} type="checkbox"
                               checked={task.isDone}/>
                        <EditableSpan title={task.title} changeItemTitle={changeTaskStatusHandler}
                                      classes={task.isDone ? "task-done" : "task"}/>
                        <Button text={"x"} onClickHandler={() => {
                            deleteTask(task.id, todolistId)
                        }}/>
                    </li>
                })
            }
        </ul>

    const createTaskHandler = (taskTitle: string) => {
        createTask(taskTitle, todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }

    return (
        <div className="todo">
            <h3>
                <EditableSpan title={title} changeItemTitle={changeTodolistTitleHandler}/>
                <Button onClickHandler={() => deleteTodolist(todolistId)}>x</Button>
            </h3>
            <CreateItemForm itemTitleLength={15} createItem={createTaskHandler}/>
            {tasksList}
            <div>
                <Button
                    className={filter === "all" ? "btnFilterActive" : undefined}
                    onClickHandler={() => changeTodolistFilter("all", todolistId)}
                    text={"Все"}/>
                <Button
                    className={filter === "active" ? "btnFilterActive" : undefined}
                    onClickHandler={() => changeTodolistFilter("active", todolistId)}
                    text={"не выполнено"}/>
                <Button
                    className={filter === "completed" ? "btnFilterActive" : undefined}
                    onClickHandler={() => changeTodolistFilter("completed", todolistId)}
                    text={"сделано"}/>
            </div>
            <div>
                <button onClick={() => {
                    deleteAllTask(todolistId)
                }}>Delete all tasks
                </button>
            </div>
        </div>
    )
}







