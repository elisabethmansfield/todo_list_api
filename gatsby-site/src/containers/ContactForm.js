import React from 'react';
import fetch from 'node-fetch';
import SubHeader from '../components/SubHeader';

export default class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirm: undefined,
      name: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    if(this.state.confirm){
      this.setState(() => ({ 
        confirm: undefined
      }));      
    }
    const value = e.target.value.toString();
    const name = e.target.name.toString();
    this.setState({
      [name]: value
    });
    console.log('state: ',this.state.name,this.state.message);
  }

  handleSubmit(e) {
    console.log('Form submitted: ',this.state.name,this.state.message);
    e.preventDefault();
    
    try{
      const body = { 
        name: this.state.name,
        message: this.state.message
      };
      // submit form data with Zapier Webhooks
      fetch(this.props.webhook, {       
        method: 'post',
        headers: {},
        body:    JSON.stringify(body),
      })
      .then(res => res.json())
      .then(json => console.log('Zapier Webhooks: ',json))
      .then(
        this.setState(() => ({ 
          confirm: 'Submitted!'
        }))
      );
    } catch(err){
      return 'Error: ' + err;
    }
  }
  render() {
    return (
      <div>
        <SubHeader title="Contact Form" subtitle="Submit your information" />
        <div className="container">
          <div className="widget">
            <form className="contact-form" action={this.props.webhook} type="POST" onSubmit={this.handleSubmit}>
              <div className="widget-header">
                <h3 className="widget-header__title">Name</h3>
              </div>
              <input className="contact-form__input" type="text" name="name" value={this.state.value} onChange={this.handleChange} />
              <br />
              <div className="widget-header">
                <h3 className="widget-header__title">Message</h3>
              </div>              
              <textarea className="contact-form__input" name="message" value={this.state.value} onChange={this.handleChange} />
              <br />
              <input className="contact-button" type="submit" value="Submit" />
            </form>
            {this.state.confirm && <p className="contact-form__confirm">{this.state.confirm}</p>}
          </div>
        </div>
      </div>
    );
  }
}
