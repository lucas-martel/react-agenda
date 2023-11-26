import React, { useState } from "react";
//import {Link} from 'react-router-dom'
import TaskView from "./TaskView";
import { Task as TaskInterface } from "../interfaces/TaskInterface";
import ManagerTask, { TaskAction } from "./ManagerTask";
import axios from "axios";

interface UserData {
  name: string;
  idUser: string;
  tasks: Array<TaskInterface>;
  updateTasks: () => void;
}

const MainApp: React.FC<UserData> = (props) => {
  //lida com a abertura de modal para criação de nova tarefa
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  //lista com ids de tarefas a serem deletadas do usuario
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const openManagerTaskOpen = () => {
    setIsCreateTaskModalOpen(true);
  };

  const closeManagerTask = () => {
    setIsCreateTaskModalOpen(false);
  };

  const addIdTasksToDelete = (id: string) => {
    setSelectedTasks((prev) => [...prev, id]);
  };

  const removeIdTasksToDelete = (id: string) => {
    const updateTasksToDelete = selectedTasks.filter((idTask) => idTask != id);
    setSelectedTasks(updateTasksToDelete);
  };

  /** requisita criação de nova tarefa no sistema */
  const handleCreateTask = async (task: TaskInterface) => {
    try {
      const resp = await axios.post(
        `https://655d967e9f1e1093c5998801.mockapi.io/user/${props.idUser}/tasks`,
        task
      );

      if (resp.data) {
        console.log("Dado criado com sucesso");
      }

      props.updateTasks();
      setIsCreateTaskModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  /**requisita destruição de tarefas e atualiza lista de tarefas*/
  const handleDeleteTasks = async () => {
    try {
      for (let i = 0; i < selectedTasks.length; i++) {
        await axios.delete(
          `https://655d967e9f1e1093c5998801.mockapi.io/user/${props.idUser}/tasks/${selectedTasks[i]}`
        );
      }
      setSelectedTasks([]);
      props.updateTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefas:", error);
    }
  };

  return (
    <div id="main-app">
      <p>bem vindo {props.name}</p>
      <div className="create-delete-tasks-buttons-container">
        <button onClick={openManagerTaskOpen}>Criar Tarefa</button>
        {selectedTasks.length != 0 && (
          <button onClick={handleDeleteTasks}>Deletar Selecionados</button>
        )}
      </div>
      <TaskView
        tasks={props.tasks}
        onUpdateTask={props.updateTasks}
        onAddSelectedTask={addIdTasksToDelete}
        onRemoveSelectedTask={removeIdTasksToDelete}
      />
      <ManagerTask
        action={TaskAction.Create}
        task={{
          id: "",
          userId: props.idUser,
          status: false,
          title: "",
          desc: "",
        }}
        OnSubmit={handleCreateTask}
        onClose={closeManagerTask}
        isOpen={isCreateTaskModalOpen}
      />
    </div>
  );
};

export default MainApp;
