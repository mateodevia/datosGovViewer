import React, { Component } from 'react';
import navio from "navio";

class Navio extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  requestData = () => {
    this.state.cargo = true;
    const promesa1 = fetch(this.state.url,
      {
        headers: {
          "Content-Type": "application/json"
        }
      });

    const promesa2 = promesa1.then((res) => {
      return res.json();
    });

    promesa1.catch((err) => {
      alert(err);
    });

    promesa2.then((res) => {
      console.log(res);

      this.setState({ data: res });
    });

    promesa2.catch((err) => {
      alert(err);
    });
  }

  componentDidUpdate() {
    console.log("DATA", this.props.data);
    let nv = navio(this.myDiv, 600);

    if (this.props.data.length) {
      nv.data(this.props.data);
      nv.addAllAttribs();
    }
  }

  render() {
    return (
      <div ref={myDiv => this.myDiv = myDiv}>

      </div>
    );
  }
}

export default Navio;