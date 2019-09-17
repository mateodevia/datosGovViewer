import React, { Component } from 'react';
import Navio from "./navio";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      data: {}
    };
  }

  handleClick = () => {
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
      this.state.data = res;
    });

    promesa2.catch((err) => {
      alert(err);
    });
  }

  handleChange() {
    this.setState({
      url: this.myIn.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <input ref={myIn => this.myIn = myIn} type="text" placeholder="url" value={this.state.url} onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleClick}></button>
        <Navio data={this.state.data}></Navio>
      </React.Fragment>
    );
  }
}

export default MainComponent;