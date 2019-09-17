import React, { Component } from 'react';
import Navio from "./navio";

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

  handleClick = () => {
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
    promesa1.catch((err) => {
      alert("Lo siento la url no es valida");
    });
    promesa2.then((res) => {
      this.setState({ data: res, pidioPaginas: true });
    });

    promesa2.catch((err) => {
      alert("Lo siento la url no es valida");
    });
  }

  handleClick2 = () => {

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
    promesa1.catch((err) => {
      alert("Lo siento la url no es valida");
    });
    promesa2.then((res) => {
      this.pedirTodos(res[0].count);
    });

    promesa2.catch((err) => {
      alert("Lo siento la url no es valida");
    });
  }

  handleChange() {
    this.setState({
      url: this.myIn.value
    });
  }

  pedirPagina = (numPagina) => {

    console.log("NUM PAGINA", numPagina);


    let offSet = 1000 * numPagina;

    let request = this.state.url + "?$offset=" + offSet

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
    promesa1.catch((err) => {
      alert("Lo siento la url no es valida");
    });
    promesa2.then((res) => {
      this.setState({ data: res });
    });

    promesa2.catch((err) => {
      alert("Lo siento la url no es valida");
    });
  }

  pedirTodos = (numeroRegistros) => {

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
    promesa1.catch((err) => {
      alert("Lo siento la url no es valida");
    });
    promesa2.then((res) => {
      this.setState({ data: res });
    });

    promesa2.catch((err) => {
      alert("Lo siento la url no es valida");
    });
  }

  siguiente = () => {

    let nuevaPagina = this.state.pagina + 1

    this.setState({ pagina: nuevaPagina })
    this.pedirPagina(nuevaPagina - 1)
  }

  anterior = () => {

    let nuevaPagina = this.state.pagina - 1

    this.setState({ pagina: nuevaPagina })
    this.pedirPagina(nuevaPagina - 1)
  }

  render() {
    return (
      <React.Fragment>
        <h1>Bienvenido a Datos Gov View</h1>
        <h3>Por favor ingresa el link del data set que deseas visualizar y nosotros haremos el resto</h3>
        <input ref={myIn => this.myIn = myIn} type="text" placeholder="url" value={this.state.url} onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleClick}>Traer Datos</button>
        <button onClick={this.handleClick2}>Traer Todos los Datos</button>
        <p>NOTA: si deseas que la consulta sea mas rapida oprime el boton de traer datos. Esto te mostrara paginas de 1000 datos y podra ir avanzando en las paginas. Ten en cuenta que si una pagina le sale vacia es porque el set de datos que escogio ya no tiene mas datos. Si queres visualizar todo, oprime Traer Todos los datos</p>
        <Navio data={this.state.data}></Navio>
        {this.state.pidioPaginas &&
          <React.Fragment>
            <h1>Pagina</h1>
            <h3>{this.state.pagina}</h3>
            {(this.state.pagina > 1) &&
              <button onClick={this.anterior}>Anterior</button>
            }
            <button onClick={this.siguiente}>Siguiente</button>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
export default MainComponent;