import React from 'react';

const handleCheckbox = (e) => {
  if(this.checked){
    // style={"text-decoration: line-through"}
  }
};

const Task = (props) => (
  <div className="task">
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id={props.count} name={props.count} onChange={handleCheckbox}/>
      <label class="task__text" for={props.count}>{props.taskText}</label>
    </div>
    <button
      className="button button--link"
      onClick={(e) => {
        props.handleDeleteTask(props.taskText);
      }} >
      Remove
      </button>
  </div>
);

export default Task;
