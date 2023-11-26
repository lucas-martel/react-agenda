import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import MainApp from './components/MainApp'
import axios, {AxiosResponse} from 'axios';
import {Task} from './interfaces/TaskInterface';

function App() {
 
  const [name, setName] = useState('');
  const [id, setId] = useState('0');
  const [tasks, setTasks] = useState<Task[]>([]);
  
  /** 
   * requisitando tarefas do id do usuario com axios
  */
  const handleTasks = async (id: string) => {
    try {
        // Fazendo a requisição e tipando a resposta
        const resp: AxiosResponse<Task[]> = await axios.get(`https://655d967e9f1e1093c5998801.mockapi.io/user/${id}/tasks`);
        if(resp.data.length > 0){
           setTasks(resp.data);
        }else if(tasks.length > 0){
           setTasks([])
        }
    }catch (error){
        console.log("erro ao fazer solicitação: "+ error);
    }
}

  const handleLogin = (data: { name: string; id: string;}) => {
    setName(data.name);
    setId(data.id);
    handleTasks(data.id);
  }

  //gerando a atualização da lista de tarefas
  const UpdateTasks = () => {
    handleTasks(id);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onSubmit={handleLogin}/>} />
        <Route path="/main" element={<MainApp name={name} idUser={id} tasks={tasks} updateTasks={UpdateTasks}/>} />
      </Routes>
    </Router>
  )
}

export default App
