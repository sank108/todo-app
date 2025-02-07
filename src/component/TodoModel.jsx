import React, { useEffect, useState } from 'react';
import styles from "../styles/modules/modal.module.scss"
import { MdOutlineClose } from 'react-icons/md';
import Button from "../component/Button"
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import {v4 as uuid} from 'uuid';
import toast from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

const TodoModel = ({type,modelOpen,setModelOpen,todo}) => {

  const [title,setTitle] = useState('');
  const [status,setStatus] = useState('incomplete');
  const dispatch = useDispatch(); 

  useEffect(() => {
    if(type === "update" && todo){
        setTitle(todo.title);
        setStatus(todo.status);
    }else{
      setTitle("");
      setStatus('incomplete')
    }
  },[type,todo,modelOpen]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === ''){
      toast.error("Please enter the Todo!");
      return;
    }
    if(title && status){
      if(type === 'add'){

        dispatch(addTodo({
          id:uuid(),
          title,
          status,
          time:new Date().toLocaleString(),
        }));
        
        toast.success("Task Added Successfully");
      }
      if(type === 'update'){
        if(todo.title !== title || todo.status !== status){
          dispatch(updateTodo({
            ...todo,
            title,
            status
          }))
        }else{
          toast.error("No changes made");
          return;
        }
      }
      setModelOpen(false);
    }
  }
  return (

    <AnimatePresence>
    {modelOpen && (

      <motion.div className={styles.wrapper} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <motion.div className={styles.container}
        variants={dropIn}
        initial="hidden" animate="visible" exit="exit">
            <motion.div className={styles.closeButton}
            onClick={() => setModelOpen(false)}
            onKeyDown={() => setModelOpen(false)}
            tabIndex={0}
            role='button'
            initial={{top:40,opacity:0}}
            animate={{top:-10,opacity:1}}
            exit={{top:40,opacity:0}}
            >
                <MdOutlineClose></MdOutlineClose>
            </motion.div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <h1 className={styles.formTitle}>{type === 'update' ? 'Update' : 'Add'}</h1>
                    <label htmlFor='title'>
                      Title
                      <input type='text' id='title' value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      />
                    </label>

                    <label htmlFor='status'>
                      Status
                      <select name='status' id='status' value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="incomplete">
                          Incomplete
                        </option>

                        <option value="complete">
                          Complete
                        </option>
                      </select>
                    </label>

                    <div className={styles.buttonContainer}>
                      <Button type="submit" variant="primary">
                        {type === 'update' ? 'Update Task' : 'Add Task'}
                      </Button>

                      <Button type="button" variant="secondary"
                      onClick={() => setModelOpen(false)}
                      onKeyDown={() => setModelOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
            </form>
        </motion.div>

      </motion.div>
    )}
    </AnimatePresence>
  )
}

export default TodoModel