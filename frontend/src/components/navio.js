import React, { Component } from 'react';
import navio from "navio";

class Navio extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    console.log("DATA", this.props.data);
    let nv = navio(this.myDiv, 600);
    nv.data(this.props.data);
    nv.addAllAttribs();
  }

  render() {
    return (
      <div ref={myDiv => this.myDiv = myDiv}>

      </div>
    );
  }
}

export default Navio;