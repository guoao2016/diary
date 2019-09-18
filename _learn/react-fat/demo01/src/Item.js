import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Item extends Component {

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (nextProps.context !== this.props.context) {
      return true;
    }
    return false;
  }

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    console.log('child render')
    return (
      <div>
        <li onClick={this.handleClick}>{this.props.name} {this.props.content}</li>
      </div>
    )
  }
  handleClick() {
    this.props.delete(this.props.index)
  }
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  index: PropTypes.number,
  delete: PropTypes.func
}

Item.defaultProps = {
  name: 'hello '
}