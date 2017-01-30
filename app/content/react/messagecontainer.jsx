import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import MessageComponent from './messagecomponent.jsx';


class MessageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }

    this.messageContainerBox = {
      width: '97%',
      height: '57%',
      backgroundColor: 'lightgrey',
      border: '1px solid grey',
      borderRadius: '3px',
      overflow: 'scroll',
      margin: '5px auto 0px auto',
    }
    
  }

  


  render(){
    console.log(this.props.messages)
    return (
      <div style={this.messageContainerBox}>
        {
          this.props.messages.map(message => {
            return (
              <div key={`${this.props.sender}${this.props.time}`}>
                <MessageComponent content={message.content} 
                                    sender={message.sender} 
                                    time={message.time} 
                                    messageOwner={this.props.user.user_id === message.sender}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    messages: state.messages,
    user: state.auth
  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);