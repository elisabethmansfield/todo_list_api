import React from 'react';
import SubHeader from '../components/SubHeader';
import Image from '../components/image';
import Social from '../components/Social';

export default class AboutMe extends React.Component {
  render() {
    const title = 'About Me';
    const subtitle = 'Meet Elisabeth';
    return (
      <div>
        <SubHeader title={title} subtitle={subtitle} />
        <div className="container">
          <div className="widget">
            <div className="image">
              <Image />
            </div>
            <br />
            <div className="header__subtitle">
              Elisabeth is a professional interested in software engineering and development. <br/>
              Trained in the design, coding and implementation of web-based applications. <br/>
              For more information, visit my Github Portfolio and LinkedIn at the links below. 
            </div>
            <br />
            <Social />
          </div>
        </div>
      </div>
    );
  }
}

