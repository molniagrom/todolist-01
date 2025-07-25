import {useAppDispatch} from '@/common/hooks/useAppDispatch'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '@/model/tasks-reducer'
import {selectTasks} from '@/model/tasks-selectors'
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from '@/model/todolists-reducer'
import {TodolistTitle} from '@/TodolistTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import type {ChangeEvent} from 'react'
import type {FilterValues, Todolist} from './app/App'
import {CreateItemForm} from './CreateItemForm'
import {EditableSpan} from './EditableSpan'
import {containerSx, getListItemSx} from './TodolistItem.styles'

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
  const {id, title, filter} = todolist

  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === 'active') {
    filteredTasks = todolistTasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter(task => task.isDone)
  }

  const changeFilterHandler = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({id, filter}))
  }

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({todolistId: id, title}))
  }

  return (
      <div>
        <TodolistTitle/>
        <CreateItemForm onCreateItem={createTaskHandler}/>
        {filteredTasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <List>
              {filteredTasks.map(task => {
                const deleteTaskHandler = () => {
                  dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  dispatch(changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: newStatusValue}))
                }

                const changeTaskTitleHandler = (title: string) => {
                  dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, title}))
                }

                return (
                    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                      <div>
                        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                      </div>
                      <IconButton onClick={deleteTaskHandler}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                )
              })}
            </List>
        )}
        <Box sx={containerSx}>
          <Button variant={filter === 'all' ? 'outlined' : 'text'}
                  color={'inherit'}
                  onClick={() => changeFilterHandler('all')}>
            All
          </Button>
          <Button variant={filter === 'active' ? 'outlined' : 'text'}
                  color={'primary'}
                  onClick={() => changeFilterHandler('active')}>
            Active
          </Button>
          <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                  color={'secondary'}
                  onClick={() => changeFilterHandler('completed')}>
            Completed
          </Button>
        </Box>
      </div>
  )
}
