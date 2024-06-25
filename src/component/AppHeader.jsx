import React, { useState } from 'react'
import Button from './Button'
import { SelectButton } from './Button'
import styles from "../styles/modules/app.module.scss"
import TodoModel from './TodoModel'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterStatus } from '../slices/todoSlice'

function AppHeader() {
  const[modelOpen,setModelOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  }
 
  return (
    <div className={styles.appHeader}>
        <Button variant='primary'
        onClick = {() => setModelOpen(true)}
        >Add Task</Button>

        <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
        </SelectButton>

        <TodoModel type="add" modelOpen={modelOpen} setModelOpen={setModelOpen}></TodoModel>
    </div>
  )
}

export default AppHeader