import React, {Component} from 'react';
import '../styles/App.css';

class App extends Component {
  // PROPS AND STATE
  // Set props and state below.
  // You should set state for vehicles (empty array), value (empty string), pilot (empty) string.
  // Enter your code below:
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      vehicles: [],
      value: "",
      pilot: ""
    };
  }


  // FORM: HANDLE INPUT CHANGES
  // handleNameChange below:
  // See form lesson for details.
  // Enter your code below:

  handleNameChange(event) {
    this.setState({pilot: event.target.value});
  };


  //  FORM: SUBMIT METHOD
  // handleSubmit below:
  // See form lesson for details.
  // Once the form is sumbited, two things need to happen: set the state of pilot to the input value.
  // Then, set the value of the input back to an empty string.
  // Enter your code below:

  handleSubmit(event) {
    event.preventDefault();
    this.setState({pilotDisplay: this.state.pilot});
    this.setState({pilot: this.state.value});
  };

  // LIFECYCLE
  // Which lifecycle is best for fetching data?
  // Inside this lifecycle, you will fetch the vehicles from here: https://swapi.co/api/vehicles/
  // Once you have fetched that data, set the state of vehicles to the fetched data.
  // In your response look for 'results'. It should return this array.
  // You will want to use this array when you set the state of 'vehicles'. You will need this data in your render.
  // Enter your code below:

  componentDidMount() {
    fetch('https://swapi.co/api/vehicles/')

    .then((response) => {
      if(response.status !== 200) {
        console.log(response.status)
      };
      return response.json();
    })

    .then((data) => {
      console.log(data.results);
      this.setState({vehicles: data.results});
    });
  }

  // RENDER
  // Before you can map over the data you've fetched, you will first need to store that 'state' in a variable.
  // Map over the data.
  // Don't forget to set the 'key'. In this case, use the vehicle name.
  // You will need the following values: name, model, manufacturer, class, passengers, crew, length, max speed, and cargo capacity.
  // Rendering: create a 'card' for each of the vehicles. consult the Bootstrap 4 docs for details.
  // Enter your code below:

  render() {
    /*
    Store vehicles state in a variable.
    Map over this variable to access the values needed to render.
    */
    let SWV = this.state.vehicles.map((vehicle) => {
      return (
        <div className="col-sm-4" key={vehicle.name}>
        <div className="card">
          <div className="card-block">
            <h3 className="card-title">{vehicle.name}</h3>
            <h4 className="card-subtitle mb-2 text-muted">{vehicle.model}</h4>
            <ul className="list-group list-group-flush card-block">
              <h4 className="card-subtitle mb-2 text-muted">Specs</h4>
              <li className="list-group-item">Manufacturer: {vehicle.manufacturer}</li>
              <li className="list-group-item">Class: {vehicle.vehicle_class}</li>
              <li className="list-group-item">Passengers: {vehicle.passengers}</li>
              <li className="list-group-item">Crew: {vehicle.crew}</li>
              <li className="list-group-item">Length: {vehicle.length}</li>
              <li className="list-group-item">Max-Speed: {vehicle.max_atmosphering_speed}</li>
              <li className="list-group-item">Cargo Capacity: {vehicle.cargo_capacity}</li>
            </ul>
          </div>
        </div>
      </div>

      );
    })
    return (
      <div className="App">
        {/*
        The App component needs the following:
         jumbotron section, form section, vehicle cards section.
         Your form will also need a header in which you will pass the state of the form upon submit.
         */}
         <div className="jumbotron">
           <h1 className="display-3">Star Wars</h1>
           <hr className="my-4" />
             <p className="lead">The Vehicles of Star Wars</p>
         </div>

         <div className="card col-sm-4 text-center myForm">
           <form className="card-block" onSubmit={this.handleSubmit}>
             <h3>What is your name, pilot?</h3>
             <input className="form-control" onChange={this.handleNameChange} name="name" type="text" value={this.state.pilot} placeholder="Enter your name" /><br />
             <button className="btn btn-primary" type="submit">Submit</button>
           </form>
           <h3>{this.state.pilotDisplay}</h3>
         </div>

         <div className="row">
           {SWV}
         </div>
      </div>
    );
  }
}

export default App;
