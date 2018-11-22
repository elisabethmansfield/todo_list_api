import React from 'react';
import SubHeader from '../components/SubHeader';
import AddTask from '../components/AddTask';
import Tasks from '../components/Tasks';
import { GET_TODOS,
         GET_TODO,
} from './queries/queries';
import { ADD_TODO,
         DELETE_TODO,
         CHECK_TODO,
         UNCHECK_TODO,
} from './queries/mutations';

export default class ToDoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      client: this.props.client || false,
      tasks: (this.props.data) ? this.props.data.todos : []
    };
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }
  
  handleDeleteTask = (task) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((filtertask) => filtertask._id !== task)
    }));     
    this.state.client.mutate({
      mutation: DELETE_TODO,
      variables: { _id: task }
    });
  };
  
  handleAddTask = (task) => {
    if (!task) {
      return 'Enter valid value to add item';
    } else if (this.state.tasks.indexOf(task) > -1) {
      return 'This task already exists';
    }
    this.state.client.mutate({
      mutation: ADD_TODO,
      variables: { 
        name: task.toString(), 
        checked: false }
    })
    .then(response => {
      this.setState((prevState) => ({
        tasks: prevState.tasks.concat(response.data.addToDo)
      }));    
    });
  };
  
  handleCheckbox = (task) => {
    let obj = this.state.tasks.find(o => o._id === task);
    let mutation;
    if(obj.checked){
      mutation = UNCHECK_TODO;
    } else{
      mutation = CHECK_TODO;
    }
    this.state.client.mutate({
      mutation: mutation,
      variables: { _id: task }
    })
    .then(response => {
  		const newTasks = (() => {
  		  const arr = this.state.tasks;
  		  arr.forEach((o) => {
    			if(o == obj)
    				o.checked = !o.checked;
  		  });
  			return arr;		
  		})();
  		this.setState((prevState) => ({
  		  tasks: newTasks
  		}));
    });
  };
  
  componentDidMount() {
    if(this.state.client){
      this.state.client.query({
        query: GET_TODOS
      })
      .then(response => {
        this.setState((prevState) => ({
           tasks: response.data.todos
        }));
      });
    }
    else{
      console.log('Apollo client is not connected.');
    }
  }
  
  render() {
    const subtitle = this.props.subtitle || 'Add and remove tasks';
    return (
      <div>
        <SubHeader subtitle={subtitle} />
        <div className="container">
          <div className="widget">
            <Tasks
              tasks={this.state.tasks}
              handleDeleteTask={this.handleDeleteTask}
              handleCheckbox={this.handleCheckbox}
            />
            <AddTask
              handleAddTask={this.handleAddTask}
            />
          </div>
        </div>
      </div>
    );
  }
}

