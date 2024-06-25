import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';
import styles from "../styles/modules/app.module.scss"
import { AnimatePresence, motion } from 'framer-motion';


const containerVariant = {
  hidden:{opacity:1},
  visible:{
    opacity:1,
    scale:1,
    trasition:{
      staggerChildren:0.2,
    }
  }
}

const child = {
  hidden:{y:20,opacity:0},
  visible:{
    y:0,
    opacity:1
  }
}

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a,b) => new Date(b.time) - new Date(a.time));

  const filterTodoList = sortedTodoList.filter(item => {
    if(filterStatus === 'all'){
      return true;
    }
    return item.status === filterStatus;
  })
  return (
    <motion.div 
    variants={containerVariant}
    initial='hidden'
    animate='visible'
    className={styles.content__wrapper}>
      <AnimatePresence>
        
        {filterTodoList && filterTodoList.length > 0 ? 
          filterTodoList.map((todo) => (
            <TodoItem todo = {todo} key={todo.id}/>
          ))
          : 
          <motion.p className={styles.emptyText} variants={child}>No Todo Found</motion.p>
          
        }
      </AnimatePresence>
    </motion.div>
  )
}

export default AppContent