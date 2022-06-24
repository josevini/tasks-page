import { useState, useEffect } from 'react'
import './App.css'
import api from './api/api'

export default function App() {

  const [newTask, setNewTask] = useState([])
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    async function getAll() {
      const response = await api.get('/task/all')
      setAllTasks(response.data)
    }
    getAll()
  }, [])

  return (
    <>
      <div className='container'>
        <input className='form'
          onBlur={(event) => {
            setNewTask(event.target.value)
          }} name='title' placeholder='Nova tarefa' />

        <button className='btn'
          onClick={() => {
            api.post('/task/add', {
              title: newTask
            })
            
          }}
        >
          Cadastrar
        </button>

        {allTasks.map((value, key) => (
          <div key={key} id={value.id} className='task'>
            <p>{value.title}</p>
          </div>    
        ))}
      </div>
    </>
  )
}