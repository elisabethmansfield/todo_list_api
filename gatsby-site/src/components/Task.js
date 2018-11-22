import React from 'react';

const Task = (props) =>  (
  <div className="task" id={props.id}>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" checked={props.checked} class="custom-control-input" id={props.count} name={props.count} 
      onChange={(e) => {
        props.handleCheckbox(props.id);
      }}/>
      <label class="task__text" for={props.count}>{props.taskText}</label>
    </div>
    <button
      className="button button--link"
      onClick={(e) => {
        props.handleDeleteTask(props.id);
      }} >
      Remove
    </button>
  </div>    
);

export default Task;
