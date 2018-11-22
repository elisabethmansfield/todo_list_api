import React from 'react';

// const handleCheckbox = (e) => {
//   if(this.checked){
//     // style={"text-decoration: line-through"}
//   }
// };

const Task = (props) =>  (
      <div className="task" id={props.id}>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" checked={props.checked} class="custom-control-input" id={props.count} name={props.count} 
          onChange={(e) => {
            console.log('Checkbox was checked: ',e);
            props.handleCheckbox(props.id);
          }}/>
          <label class="task__text" for={props.count}>{props.taskText}</label>
        </div>
        <button
          className="button button--link"
          onClick={(e) => {
            console.log('Task props: ',props);
            props.handleDeleteTask(props.id);
          }} >
          Remove
        </button>
      </div>    
);

export default Task;

  // if (props.checked) {
  //   return (
  //     <div className="task">
  //       <div class="custom-control custom-checkbox">
  //         <input type="checkbox" checked class="custom-control-input" id={props.count} name={props.count} onChange={props.onChange}/>
  //         <label class="task__text" for={props.count}>{props.taskText}</label>
  //       </div>
  //       <button
  //         className="button button--link"
  //         onClick={(e) => {
  //           props.handleDeleteTask(props.taskText);
  //         }} >
  //         Remove
  //       </button>
  //     </div>    
  //   );
  // }