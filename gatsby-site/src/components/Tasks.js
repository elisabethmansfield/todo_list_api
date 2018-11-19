import React from 'react';
import Task from './Task';

const Tasks = (props) => (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Task List</h3>
        <button
          className="button button--link"
          onClick={props.handleDeleteTasks}
        >
          Remove All
        </button>
      </div>
  
      {props.tasks.length === 0 && <p className="widget__message">Please add a task to get started.</p>}
      
      {
        props.tasks.map((task, index) => (
          <Task
            key={task}
            taskText={task}
            count={index + 1}
            checked={props.checked}
            onChange={props.handleCheckbox}
            handleDeleteTask={props.handleDeleteTask}
          />
        ))
      }
    </div>
);

export default Tasks;
