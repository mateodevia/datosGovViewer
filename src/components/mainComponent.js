// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// eslint-disable-next-line no-unused-vars
import Navio from "./navio";
import "./styles/styles.css";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      data: [],
      pidioPaginas: false,
      pagina: 1
    };
  }

  handleClick() {
    this.setState({ pagina: 1 });
    const promesa1 = fetch(this.state.url,
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
    const promesa2 = promesa1.then((res) => {
      return res.json();
    });
    promesa1.catch(() => {
      alert("Lo siento la url no es valida");
    });
    promesa2.then((res) => {
      this.setState({ data: res, pidioPaginas: true });
    });

    promesa2.catch(() => {
      alert("Lo siento la url no es valida");
    });
  }

  handleClick2() {

    this.setState({ pidioPaginas: false });

    const promesa1 = fetch(this.state.url + "?$select=count(*)",
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
    const promesa2 = promesa1.then((res) => {
      return res.json();
    });
    promesa1.catch(() => {
      alert("Lo siento la url no es valida");
    });
    promesa2.then((res) => {
      this.pedirTodos(res[0].count);
    });

    promesa2.catch(() => {
      alert("Lo siento la url no es valida");
    });
  }

  handleChange() {
    this.setState({
      url: this.myIn.value
    });
  }

  pedirPagina(numPagina) {

    console.log("NUM PAGINA", numPagina);


    let offSet = 1000 * numPagina;

    let request = this.state.url + "?$offset=" + offSet;

    console.log(request);


    const promesa1 = fetch(request,
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
    const promesa2 = promesa1.then((res) => {
      return res.json();
    });
    promesa1.catch(() => {
      alert("Lo siento la url no es valida");
    });
    promesa2.then((res) => {
      this.setState({ data: res });
    });

    promesa2.catch(() => {
      alert("Lo siento la url no es valida");
    });
  }

  pedirTodos(numeroRegistros) {

    let request = this.state.url + "?$limit=" + numeroRegistros;

    const promesa1 = fetch(request,
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
    const promesa2 = promesa1.then((res) => {
      return res.json();
    });
    promesa1.catch(() => {
      alert("Lo siento la url no es valida");
    });
    promesa2.then((res) => {
      this.setState({ data: res });
    });

    promesa2.catch(() => {
      alert("Lo siento la url no es valida");
    });
  }

  siguiente() {

    let nuevaPagina = this.state.pagina + 1;

    this.setState({ pagina: nuevaPagina });
    this.pedirPagina(nuevaPagina - 1);
  }

  anterior() {

    let nuevaPagina = this.state.pagina - 1;

    this.setState({ pagina: nuevaPagina });
    this.pedirPagina(nuevaPagina - 1);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Bienvenido a Datos Gov View</h1>
        <h3>Por favor ingresa el link del data set que deseas visualizar y nosotros haremos el resto</h3>
        <input ref={myIn => this.myIn = myIn} type="text" placeholder="url" value={this.state.url} onChange={this.handleChange.bind(this)} />
        <button className="botonBonito" onClick={this.handleClick.bind(this)}>Traer Datos</button>
        <button className="botonBonito" onClick={this.handleClick2.bind(this)}>Traer Todos los Datos</button>
        <p>NOTA: si desea que la consulta sea mas rapida oprima el boton de traer datos. Esto le mostrara paginas de 1000 datos cada una y podra ir avanzando en las paginas. Tenga en cuenta que si una pagina le sale vacia es porque el set de datos que escogio ya no tiene mas datos. Si quere visualizar todos los datos en una sola visualizacion, oprima Traer Todos los datos</p>
        <Navio data={this.state.data}></Navio>
        {this.state.pidioPaginas &&
          <React.Fragment>
            <h1>Pagina</h1>
            <h3>{this.state.pagina}</h3>
            {(this.state.pagina > 1) &&
              <button className="botonBonito" onClick={this.anterior.bind(this)}>Anterior</button>
            }
            <button className="botonBonito" onClick={this.siguiente.bind(this)}>Siguiente</button>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
export default MainComponent;