import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';
import { connect } from 'react-redux';
import { toggleCardDetail } from '../actions/card';

let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName} is longer than 80 characters`
      );
    }
  }
};

class Card extends Component {
  render() {
    let cardDetails;
    if (this.props.showDetails) {
      cardDetails = (
        <div className="card_detail">
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
          <CheckList cardId={this.props.id} tasks={this.props.tasks} />
        </div>
      );
    };
    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color,
    };
    return (
      <div className="card" draggable="true" onDragStart={(e) => {
        e.dataTransfer.setData('text', this.props.id);
      }}>
        <div style={sideColor} />
        <div className={ this.props.showDetails ? "card__title card__title--is-open" : "card__title" } onClick={
          () => { this.props.dispatch(toggleCardDetail(this.props.id)) }
        }>{this.props.title}</div>
        { cardDetails }
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

export default connect()(Card);
