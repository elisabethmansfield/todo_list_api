import React from 'react';
import { Link } from 'gatsby';

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: '#8357c5',
      marginBottom: '1.45rem',
    }}>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}>
      <h1 style={{ margin: '0 0 0 5rem' }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}>
          {siteTitle}
        </Link>
        <span style={{
          paddingLeft: '25%'
        }}>
          <Link to="/">
            <button className="button" >
              About Me
            </button>
          </Link>
        </span>
        <span style={{
          paddingLeft: '10px'
        }}>        
          <Link to="/todolist/">
            <button className="button" >
              To Do List
            </button>
          </Link>
        </span>
        <span style={{
          paddingLeft: '10px'
        }}>        
          <Link to="/contact/">
            <button className="button" >
              Contact Form
            </button>
          </Link> 
        </span>
      </h1>
    </div>
  </div>
);

export default Header;
