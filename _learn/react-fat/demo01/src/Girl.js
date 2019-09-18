import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Item from './Item'
import Boss from './Boss'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './index.css'
class Girl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: [
      ]
    }
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')

    axios.get('http://rap2api.taobao.org/app/mock/231087/list')
      .then(res => {
        console.log(JSON.stringify(res))
        this.setState({
          list: res.data.data
        })
      })
      .catch(err => console.log(JSON.stringify(err)))
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }

  render() {
    console.log('render')
    return (
      <Fragment>
        {/* 注释 */}
        <Boss />
        <label htmlFor="service">服务</label>
        <input
          ref={input => this.input = input}
          id="service"
          className="input"
          value={this.state.inputValue}
          onChange={this.inputChange.bind(this)}></input>
        <button onClick={this.add.bind(this)}>submit</button>
        <ul ref={ul => this.ul = ul}>
          <TransitionGroup>
            {
              this.state.list.map((item, index) => (
                // <li onClick={this.delete.bind(this, index)} key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                <CSSTransition
                  timeout={2000}
                  classNames={'boss-text'}
                  unmountOnExit
                  appear={true}
                >
                  <Item key={index + item} content={item} index={index} delete={this.delete.bind(this)} />
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        </ul>
      </Fragment>
    )
  }
  inputChange(e) {
    // console.log(e.target.value)
    this.setState({
      // inputValue: e.target.value
      inputValue: this.input.value
    })
  }
  add() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    }, () => {
      console.log(this.ul.querySelectorAll('li').length)
    })
  }
  delete(index) {
    const { list } = this.state
    list.splice(index, 1)
    this.setState({
      list
    })
  }
}

export default Girl