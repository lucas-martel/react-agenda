import React, { useState } from "react";
import { Task as TaskInterface } from "../interfaces/TaskInterface";
import { FiEdit } from "react-icons/fi";

interface TaskProp {
  task: TaskInterface;
  onSelectChange: (id: string, isSelect: boolean) => void; //envia o id da tarefa selecionada
  openTaskEditor: (taskEdit: TaskInterface) => void; //envia a tarefa a ser editada
  handleUpdateTask: (updatedTask: TaskInterface) => void; //mada tarefa para atualizacao
}

const Task: React.FC<TaskProp> = ({
  task,
  handleUpdateTask,
  onSelectChange,
  openTaskEditor,
}) => {
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [showDesc, setShowDesc] = useState<boolean>(false);

  /*
  *adiciona tarefa a lista de tarefas selecionadas
  */
  const handleIsSelect = () => {
    const newState = !isSelect;
    setIsSelect(newState);
    onSelectChange(task.id, newState);
  };

  return (
    <div className="task-container">
      <div className="task-menu">
        <div>
          <input
            className="task-select"
            checked={isSelect}
            onChange={handleIsSelect}
            type="checkbox"
            name="selection"
          />
          <button
            onClick={() => {
              openTaskEditor(task);
            }}
          >
            <FiEdit />
          </button>
        </div>
        <span className="task-title">{task.title}</span>
        <button
          onClick={() => {
            //atualiza estado da tarefa, se pendente ou concluida
            task.status = !task.status;
            handleUpdateTask(task);
          }}
          className={
            "status-task " + (task.status ? "task-concluded" : "task-pending")
          }
        >
          {task.status ? "concluida" : "pendente"}
        </button>
        {task.desc != "" && (
          <button onClick={() => setShowDesc((prev) => !prev)}>
            descrição
          </button>
        )}
      </div>
      {showDesc && (
        <textarea
          className="task-desc"
          name=""
          cols={30}
          rows={10}
          readOnly
          value={task.desc}
        ></textarea>
      )}
    </div>
  );
};

export default Task;
