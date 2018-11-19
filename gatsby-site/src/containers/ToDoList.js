import React from 'react';
// import { Location } from '@reach/router';
import SubHeader from '../components/SubHeader';
import AddTask from '../components/AddTask';
import Tasks from '../components/Tasks';
// import { Query } from 'react-apollo';
import { GET_TODOS } from './queries/queries';
import gql from 'graphql-tag';

export default class ToDoList extends React.Component {
  state = {
    tasks: [],
  //   graphql: function(queryName, queryString) {
  // 		$.ajax({
  // 			method: 'POST',
  // 			contentType: 'application/graphql',
  // 			url: '/api',
  // 			data: queryString
  // 		}).done(function(response, code) {
  // 			this.todos = response.data[queryName] || [];
  // 			this.inform();
  // 		}.bind(this));
	 // }
  };
  handleDeleteTasks = () => {
    this.setState(() => ({ tasks: [] }));
  };
  handleDeleteTask = (taskToRemove) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => taskToRemove !== task)
    }));
  };
  handleAddTask = (task) => {
    if (!task) {
      return 'Enter valid value to add item';
    } else if (this.state.tasks.indexOf(task) > -1) {
      return 'This task already exists';
    }
    this.setState((prevState) => ({
      tasks: prevState.tasks.concat(task)
    }));
  };
  handleCheckbox = (taskToUpdate) => {
    // TODO
  }
  componentDidMount() {
    this.props.client.query({
      query: gql`
        query {
          todos {
            _id
            name
            checked
          }
        }
      `
    })
    // .then(response => {
    //   console.log(response); 
    //   this.setState( (prevState) => {
    //     {tasks: response.data.todos}
    //   });
    // });
  }
  // componentDidMount() {
  //   try {
  //     const json = localStorage.getItem('tasks');
  //     const tasks = JSON.parse(json);

  //     if (tasks) {
  //       this.setState(() => ({ tasks }));
  //     }
  //   } catch (e) {
  //     // Do nothing at all
  //   }
  // }
  componentDidMount() {
    const url = window.location.origin.toString() + "/api";
    console.log(
    'my url: ',url,
  //   '\nhash: ',location.hash,
  //   '\nhost: ',location.host,	
  //   '\nhostname: ',location.hostname,	
  //   '\nhref: ',location.href,	
  //   '\norigin: ',location.origin,	
  //   '\npathname: ',location.pathname,	
  //   '\nport: ',location.port,	
  //   '\nprotocol: ',location.protocol,	
  //   '\nsearch: ',location.search,	
  )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks.length !== this.state.tasks.length) {
      const json = JSON.stringify(this.state.tasks);
      // localStorage.setItem('tasks', json);
    }
  }
  render() {
    const subtitle = 'Add and remove tasks';
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
                handleDeleteTasks={this.handleDeleteTasks}
                handleDeleteTask={this.handleDeleteTask}
                onChange={this.handleCheckbox}
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

/*
      <Query query={GET_TODOS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
    
          return data.todos.map(({ _id, name, checked }) => (
            <Task
              key={_id}
              taskText={name}
              checked={checked}
              onChange={props.handleCheckbox}
              handleDeleteTask={props.handleDeleteTask}
            />
          ));
        }}
      </Query>
      */
/*
<Query query={GET_TODOS}>
                {({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;
                  return (
                    <Tasks
                      tasks={data}
                      handleDeleteTasks={this.handleDeleteTasks}
                      handleDeleteTask={this.handleDeleteTask}
                      onChange={this.handleCheckbox}
                    />
                  );}}
              </Query>
*/
/*
  componentDidMount() {
    function getData(url) {
      try {
        // Default options are marked with *
        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "same-origin", // no-cors, cors, *same-origin
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(response => {
          response.json();
          this.setState({
            isLoaded: true,
            items: response.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
        ); 
      }
      catch(e){
        console.error(e);
      }
    }
  }
  */
  
