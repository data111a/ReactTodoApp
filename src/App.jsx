import { useState } from 'react';
import React from 'react';
import { ReactDOM } from 'react';
let TasksList = [];


function App(){
    if(JSON.parse(localStorage.getItem('data'))!== null){
        TasksList = JSON.parse(localStorage.getItem('data'));
    }

    const [todoList, setTodoList] = useState(TasksList);
    const [newTask, setInputValue] = useState("");
    
    const setInput = (event) =>{
        setInputValue(event.target.value)
    }
    const addTask = ()=>{
        const task = {
            id : todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
            taskName : newTask
        }
        setTodoList([...todoList,task])
        TasksList.push(task);
        localStorage.setItem('data',JSON.stringify(TasksList))
        setInputValue('');
    }
    const DeleteTask = (taskID) => {
        setTodoList(todoList.filter((task) => task.id !== taskID));
        TasksList = TasksList.filter((task) => task.id !== taskID);
        localStorage.setItem('data',JSON.stringify(TasksList))

    }
    console.log(TasksList);
    return(
        <div className='main_contsiner'>
            <header className='inputHeader'>
                <div className='inputDiv'>
                    <input className='todoInput' onChange={setInput} value={newTask}></input>
                    <button onClick={addTask} type='submit'>Submit</button>
                </div>
            </header>
            <div className='tasks'>
                {todoList.length == 0 && <p>Make a note of your plans</p>}
                {todoList.map((value) => {
                    return (
                        <div className="task">
                            <p>{value.taskName}</p>
                            <button onClick={() => DeleteTask(value.id)}> X </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default App
