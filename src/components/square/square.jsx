import React, { Component } from 'react';

import blank from "../../images/sprites/blank.png";
import goblin from "../../images/sprites/goblin.png";
import target from "../../images/sprites/target.png";
import graphite from "../../images/sprites/graphite.png";
import stump from "../../images/sprites/stump.png";
import dirt from "../../images/sprites/dirt.png";

let images = {
  "blank": blank,
  "goblin": goblin,
  "target": target,
  "graphite": graphite,
  "stump": stump,
  "dirt": dirt,
}

import SquareCss from "./Square.css";

export class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSquareClicked() {
    this.props.clickFunction(this.props.value.x, this.props.value.y);
  }

  render() {
    let imageLocation = "";
    if ( this.props.value.imageName === undefined ) {
      imageLocation = blank;
    } else {
      imageLocation = images[this.props.value.imageName];
    }

    return (
      <div className={ "" + SquareCss.square } onClick={ (e) => {this.handleSquareClicked()}} >
        <img className={ "" + SquareCss.squareImage } src={imageLocation}/>
      </div>
    );
  }
}
