import React from 'react';
import SubHeader from '../components/SubHeader';

export default class ContactForm extends React.Component {
  render() {
    const title = 'Contact Form';
    const subtitle = 'Submit your information';
    return (
      <div>
        <SubHeader title={title} subtitle={subtitle} />
        <div className="container">
          <div className="widget">
            Insert form here.
          </div>
        </div>
      </div>
    );
  }
}

