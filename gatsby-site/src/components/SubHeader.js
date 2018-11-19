import React from 'react';

const SubHeader = (props) => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">{props.title}</h1>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
    </div>
  </div>
);

SubHeader.defaultProps = {
  title: 'To Do List'
};

export default SubHeader;
