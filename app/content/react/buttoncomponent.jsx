import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ChatContainer from './ChatContainer.jsx';
import ShadowDOM from 'react-shadow';
import rootPath from './httpServer';

class ButtonComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayChat: false
    }
    this.toggleChatDisplay = this.toggleChatDisplay.bind(this);
    this.animateButtonIn = this.animateButtonIn.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount(){
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'displayChatboxFalse') {
        if (this.state.displayChat) {
          TweenLite.to(this.button, 1.5, {height: 100, width: 100, borderRadius: '50%', ease: Elastic.easeOut});
          TweenLite.to(this.img, 1.5, {height: 60, width: 60, ease: Elastic.easeOut});
        }
        this.setState( {displayChat: false} )
      }
    });
    TweenLite.set(this.xImg, {height: 0, width: 0, autoAlpha: 0});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) this.animateButtonIn();
    else this.animateButtonOut();
  }

  animateButtonIn() {
    TweenLite.to(this.button, 1.5, {y: -155, ease: Elastic.easeOut});
  }

  animateButtonOut() {
    TweenLite.to(this.button, 1.5, {y: 155, ease: Power1.easeOut})
  }

  handleMouseEnter() {
    document.body.style.overflow = 'hidden';
  }

  handleMouseLeave() {
    document.body.style.overflow = 'scroll';

  }

  joinRoom(){chrome.runtime.sendMessage({type: 'joinRoom'}, null)}

  toggleChatDisplay(e){
    e.preventDefault();
    if (!this.state.displayChat) {
      TweenLite.to(this.button, 1.5, {height: 35, width: 75, borderRadius: 3, ease: Elastic.easeOut});
      TweenLite.to(this.bubImg, 1.5, {height: 0, width: 0, autoAlpha: 0, ease: Elastic.easeOut});
      TweenLite.to(this.xImg, 1.5, {height: 20, width: 20, autoAlpha: 1, ease: Elastic.easeOut});
      this.joinRoom(this.props.user.id)
    } else {
      TweenLite.to(this.button, 1.5, {height: 100, width: 100, borderRadius: '50%', ease: Elastic.easeOut});
      TweenLite.to(this.xImg, 0.5, {height: 0, width: 0, autoAlpha: 0});
      TweenLite.to(this.bubImg, 1.5, {height: 60, width: 60, autoAlpha: 1, ease: Elastic.easeOut});
    }


    this.setState( {displayChat: !this.state.displayChat} );

  }


  render(){
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={el => {this.mainComponent = el;}}>
        <ShadowDOM include={[`${rootPath}style.css`]}>
          <div className="cleanslate">
            <ChatContainer
              store={this.props.store}
              mounted={this.state.displayChat}
              joinRoomMessage={this.joinRoom}
              />
              <button ref={el => {this.button = el;}}
                className="chat-button shadow"
                onClick={this.toggleChatDisplay}>
                <img
                  className="button-img"
                  src={`${rootPath}messagebubble.png`}
                  ref={el => {this.bubImg = el;}}
                  />
                <img
                  className="button-img"
                  src={`${rootPath}close_50.png`}
                  ref={el => {this.xImg = el;}}
                  />
              </button>
          </div>
        </ShadowDOM>
      </div>
    )
  }
}

export default connect(({auth})=>({user: auth}))(ButtonComponent);
