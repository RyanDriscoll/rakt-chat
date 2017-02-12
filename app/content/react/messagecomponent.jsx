import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
const moment = require('moment');

class MessageComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userColor: '',
      colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#558b2f', '#ef6c00', '#ff5722', '#795548']
    }
    this.time = moment(this.props.time).format("MMM Do YYYY, h:mm a");
    this.hashUsernameToColorsIndex = this.hashUsernameToColorsIndex.bind(this);
  }

  componentWillMount() {
    const index = this.hashUsernameToColorsIndex(this.props.sender);
    this.setState({
      userColor: this.state.colors[index]
    });
  }

  componentDidMount() {
    if (this.props.messageOwner) {
      TweenLite.fromTo(this.message, 0.3, {
        x: 300
      }, {
        x: 0
      });
    } else {
      TweenLite.fromTo(this.message, 0.3, {
        x: -300
      }, {
        x: 0
      });
    }
  }

  hashUsernameToColorsIndex(username){
    let total = 0;
    for (let i = 0; i < username.length; i++) {
      total += username.charCodeAt(i);
    }
    return total % this.state.colors.length;
  }

  render(){
    const color = this.state.userColor;
    return (
      <div
        className="message-component"
        ref={el => {this.message = el;}}
        >
        {
          this.props.messageOwner ?
          <div className="message-component-self shadow">

            <div className="message-component-content-self" >{this.props.content}</div>
            <div className="message-component-date" >{this.time}</div>
          </div>
          :
          <div
            className="message-component-others shadow"
            style={{backgroundColor: color}}>
            <div className="message-component-username" >{this.props.sender}</div>
            <div className="message-component-content-others" >{this.props.content}</div>
            <div className="message-component-date" >{this.time}</div>
          </div>
        }
      </div>
    )
  }
}



export default MessageComponent;