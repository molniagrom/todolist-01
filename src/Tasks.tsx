import List from "@mui/material/List";
import {Task} from "@/TodolistItem.tsx";
import {useAppSelector} from "@/app/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {TodolistType} from "@/app/App.tsx";
import TaskItem from "@/TaskItem.tsx";

type Props = {
    todolist: TodolistType,
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

