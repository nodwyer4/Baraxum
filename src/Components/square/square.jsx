import React, { Component } from 'react';
import blank from "../../images/sprites/blank.png";
import goblin from "../../images/sprites/goblin.png";
import target from "../../images/sprites/target.png";

import SquareCss from "./Square.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  handleSquareClicked() {

    let index = this.props.id;

    this.props.clickFunction(index);

  }

  render() {
    let imageLocation = "";
    if ( this.props.value.imageName === undefined ) {
      imageLocation = blank;
    } else if ( this.props.value.imageName === "goblin" ) {
      imageLocation = goblin;
    } else if ( this.props.value.imageName === "target" ) {
      imageLocation = target;
    } else {
      imageLocation = blank;
    }

    return (
      <div className={ "" + SquareCss.square } onClick={ (e) => {this.handleSquareClicked()}} >
        <img className={ "" + SquareCss.squareImage } src={imageLocation}/>
      </div>
    );
  }
}

export default Square;