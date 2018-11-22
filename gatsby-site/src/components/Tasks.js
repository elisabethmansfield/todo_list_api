import React from 'react';
import Task from './Task';

const Tasks = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Task List</h3>
    </div>
    {props.tasks.length === 0 && <p className="widget__message">Please add a task to get started.</p>}
    {
      props.tasks.map((task, index) => (
        <Task
          key={task._id}
          id={task._id}
          taskText={task.name}
          count={index + 1}
          checked={task.checked}
          handleCheckbox={props.handleCheckbox}
          handleDeleteTask={props.handleDeleteTask}
        />
      ))
    }
  </div>
);

export default Tasks;
