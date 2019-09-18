import React, { Component } from 'react';

import { CSSTransition } from 'react-transition-group'

class Boss extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: true
    }
    this.toggle = this.toggle.bind(this)
  }
  render() {
    return (
      <div>
        {/* <div className={this.state.isShow ? 'show' : 'hide'}>
          hello
        </div> */}
        <CSSTransition
          in={this.state.isShow}
          timeout={2000}
          classNames={'boss-text'}
          unmountOnExit
        >
          <div>hello</div>
        </CSSTransition>
        <button onClick={this.toggle}>
          click
        </button>
      </div>
    );
  }

  toggle() {
    this.setState({
      isShow: !this.state.isShow
    })
  }
}

export default Boss;