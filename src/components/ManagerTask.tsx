import React, { useState } from "react";
import Modal from "react-modal";
import { Task as TaskInterface } from "../interfaces/TaskInterface";

export enum TaskAction {
  Create = "create",
  Update = "update",
}

interface ManagerTaskProps {
  isOpen: boolean;
  onClose: () => void;
  action: TaskAction.Create | TaskAction.Update;
  OnSubmit: (date: TaskInterface) => void;
  task: TaskInterface;
}
/**
*component modal para criação e atualização de tarefas
*/
const ManagerTask: React.FC<ManagerTaskProps> = (props) => {
  const [title, setTitle] = useState(
    props.action === TaskAction.Create ? "" : props.task.title
  );
  const [description, setDescription] = useState(
    props.action === TaskAction.Create ? "" : props.task.desc
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (event) => {
    setDescription(event.currentTarget.value);
  };

 /**
  * função de submissao na criacao ou atualizacao de tarefa
 */ 
 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTask();
  };

  const updateTask = async () => {
    //cria ou atualiza atividade
    const newTask: TaskInterface = {
      ...props.task,
      title: title,
      desc: description,
    };
    setTitle("");
    setDescription("");
    props.OnSubmit(newTask);
  };

  const mainAppElement = document.getElementById("main-app");
  if (mainAppElement) {
    Modal.setAppElement(mainAppElement);
  }

  const handleClose = () => {
    if (props.action === TaskAction.Create) {
      setTitle("");
      setDescription("");
    }
    props.onClose();
  };

  return (
    <Modal className="modal" isOpen={props.isOpen} contentLabel="Modal">
      <div className="modal-content">
        <h2 className="modal-title">Nova Tarefa</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            onChange={handleTitleChange}
            type="text"
            name="title"
            className="modal-input"
            placeholder="Novo título"
            value={title}
          />
          <textarea
            onChange={handleDescriptionChange}
            name="description"
            className="modal-textarea"
            cols={30}
            rows={10}
            value={description}
            placeholder="Sobre a tarefa"
          />
          <div className="button-container">
            <button type="submit" className="modal-submit">
              {props.action === TaskAction.Create ? "criar" : "alterar"}
            </button>
            <button onClick={handleClose} className="modal-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ManagerTask;
