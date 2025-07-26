import List from "@mui/material/List";
import {Task} from "@/features/todolists/ui/TodoLists/TodolistItem/TodolistItem.tsx";
import {Todolist} from "@/app/App.tsx";
import TaskItem from "./TaskItem/TaskItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";

type Props = {
    todolist: Todolist,
}

export const Tasks = ({todolist}: Props) => {
    const tasks = useAppSelector(selectTasks)

    const {id, filter} = todolist

    let filteredTasks = tasks[id]
    if (filter === "active") {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    }

    return (
        <>
            {
                filteredTasks.length === 0
                ? <span>Your tasksList is empty</span>
                : <List>
                    {
                        filteredTasks.map((task: Task) =>
                             <TaskItem
                                task={task}
                                todolistId={id}
                                key={task.id}/>
                        )
                    }
                </List>
            }
        </>
    );
};

