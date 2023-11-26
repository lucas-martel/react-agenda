import React, { useState } from "react";
import Task from "./Task";
import { Task as TaskInterface } from "../interfaces/TaskInterface";
import ManagerTask, { TaskAction } from "./ManagerTask";
import axios from "axios";

interface TasksProp {
  tasks: Array<TaskInterface>;
  onUpdateTask: () => void;
  onAddSelectedTask: (id: string) => void;
  onRemoveSelectedTask: (id: string) => void;
}

const TaskView: React.FC<TasksProp> = ({
  tasks,
  onUpdateTask,
  onAddSelectedTask,
  onRemoveSelectedTask,
}) => {
  const [isManagerTaskOpen, setIsManagerTaskOpen] = useState<boolean>(false);
  const [taskEdit, setTaskEdit] = useState<TaskInterface>({
    title: "",
    desc: "",
    status: false,
    userId: "0",
    id: "0",
  });

  const handleSelectChange = (id: string, isSelect: boolean) => {
    isSelect ? onAddSelectedTask(id) : onRemoveSelectedTask(id);
  };

  const openManagerTaskOpen = (task: TaskInterface) => {
    setTaskEdit((prevTask) => {
      return { ...prevTask, ...task };
    });
    setIsManagerTaskOpen(true);
  };

  const closeManagerTask = () => {
    setIsManagerTaskOpen(false);
  };

  /**
   * Função assíncrona para atualizar uma tarefa por meio de uma requisição HTTP PUT usando axios.
   */
  const handleUpdateTask = async (updatedTask: TaskInterface) => {
    await axios.put(
      `https://655d967e9f1e1093c5998801.mockapi.io/user/${updatedTask.userId}/tasks/${updatedTask.id}`,
      updatedTask
    );
    onUpdateTask();
  };

  return (
    <>
      {tasks.length > 0 && (
        <div className="tasks-container">
          {tasks.map((task) => (
            <Task
              openTaskEditor={openManagerTaskOpen}
              key={task.id}
              task={task}
              handleUpdateTask={handleUpdateTask}
              onSelectChange={handleSelectChange}
            />
          ))}
        </div>
      )}
      <ManagerTask
        isOpen={isManagerTaskOpen}
        action={TaskAction.Update}
        OnSubmit={(newTask: TaskInterface) => {
          handleUpdateTask(newTask);
          setIsManagerTaskOpen(false);
        }}
        task={taskEdit}
        onClose={closeManagerTask}
      />
    </>
  );
};

export default TaskView;
