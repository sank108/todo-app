import React, { useState,useEffect } from 'react'
import styles from "../styles/modules/todoItem.module.scss"
import { getClasses } from '../utils/getClasses'
import { format } from 'date-fns'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../slices/todoSlice'
import toast from 'react-hot-toast'
import TodoModel from './TodoModel'
import CheckButton from './CheckButton'
import { motion } from 'framer-motion'


const child = {
  hidden:{y:20,opacity:0},
  visible:{
    y:0,
    opacity:1
  }
}

const TodoItem = ({todo}) => {
    const parts = todo.time.split(/[\/, :]+/); // Splitting by '/', ',', ' ', and ':'
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months in JavaScript are 0-indexed (0 - January, 1 - February, ...)
    const year = parseInt(parts[2]);
    let hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);
    const second = parseInt(parts[5]);
    const ampm = parts[6].toLowerCase();

if (ampm === "pm" && hour < 12) {
    hour += 12; // Convert to 24-hour format if it's PM
}

const formattedDate = new Date(year, month, day, hour, minute, second);

const dispatch = useDispatch();
const [checked,setChecked] = useState(false);

useEffect(() => {
    if(todo.status === "complete"){
        setChecked(true);
    }else{
        setChecked(false);
    }
},[todo.status]);

const [updateModelOpen,setUpdateModelOpen] = useState(false);

const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo deleted successfully")
}
const handleUpdate = () => {
    setUpdateModelOpen(true);
}

const handleCheck = () => {
    setChecked(!checked);
    dispatch(updateTodo({
        ...todo,
        status:checked ? 'incomplete' : 'complete'
    }))
}
  return (
    <>
    <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
            <CheckButton checked={checked} handleCheck={handleCheck}/>
            <div className={styles.text}>
                <p className={getClasses([styles.todoText,todo.status === 'complete' && styles['todoText--completed']])}>{todo.title}</p>
                <p className={styles.time}>

                    {format(new Date(formattedDate),'p, MM/dd/yyyy')}
                </p>
            </div>
        </div>

        <div className={styles.todoActions}>
            <div className={styles.icon} onClick={handleDelete} role='button'
            tabIndex={0}
            onKeyDown={handleDelete}
            >
                <MdDelete />
            </div>
            <div className={styles.icon} onClick={handleUpdate} role='button'
            tabIndex={0}
            onKeyDown={handleUpdate}>
                <MdEdit onClick={handleUpdate}/>
            </div>
        </div>

    </motion.div>
    <TodoModel modelOpen={updateModelOpen} setModelOpen={setUpdateModelOpen} type="update" todo={todo}/>
    </>
  )
}

export default TodoItem