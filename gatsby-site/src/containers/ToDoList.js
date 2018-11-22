import React from 'react';
// import { Location } from '@reach/router';
import SubHeader from '../components/SubHeader';
import AddTask from '../components/AddTask';
import Tasks from '../components/Tasks';
// import { Query } from 'react-apollo';
import { GET_TODOS,
         GET_TODO,
} from './queries/queries';
import{ ADD_TODO,
        DELETE_TODO,
        CHECK_TODO,
        UNCHECK_TODO,
} from './queries/mutations';
// import gql from 'graphql-tag';

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
    console.log('task parameter: ',task);
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((filtertask) => filtertask._id !== task)
    }));     
    this.state.client.mutate({
      mutation: DELETE_TODO,
      variables: { _id: task }
    })
    .then(response => {
      console.log('GraphQL delete: ',response); 
    });
  };
  handleAddTask = (task) => {
    try{
      if (!task) {
        return 'Enter valid value to add item';
      } else if (this.state.tasks.indexOf(task) > -1) {
        return 'This task already exists';
      }
      this.state.client.mutate({
        mutation: ADD_TODO,
        variables: { name: task.toString(), checked: false }
      })
      .then(response => {
        console.log('GraphQL add: ',response); 
        this.setState((prevState) => ({
          tasks: prevState.tasks.concat(response.data.addToDo)
        }));    
        console.log('this.state.tasks: ',this.state.tasks);
      });
    } catch(err){
      return 'Error: ' + err;
    }
  };
  handleCheckbox = (task) => {
    let obj = this.state.tasks.find(o => o._id === task);
    console.log('obj: ',obj);
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
      console.log('GraphQL checkbox response: ',response); 
  		const newTasks = (() => {
  		  const arr = this.state.tasks;
  		  arr.forEach((o) => {
  			if(o == obj)
  				o.checked = !o.checked;
  		  });
  			return arr;		
  		})();
  		console.log('newTasks: ',newTasks);
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
        console.log('GraphQL query: ',response.data.todos); 
        this.setState((prevState) => ({
           tasks: response.data.todos
        }));
        console.log('this.state.tasks: ',this.state.tasks);
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
              {/* <Location>
                {({ location }) => {
                  console.log(location)
                  return <p>The location is {location.pathname}</p>
                }}
              </Location> */}
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

  // handleDeleteTasks = () => {
  //   this.setState(() => ({ tasks: [] }));
  // };
  
// apolloClient.mutate({
//   variables: { text: "hello" },
//   mutation: gql`
//     mutation AddComment($text: String!){
//       addComment(text: $text) {
//         id
//         text
//       }
//     }
//   `,
// }) 
// handleDeleteTasks={this.handleDeleteTasks}
