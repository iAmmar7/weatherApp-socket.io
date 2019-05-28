import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("ting", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    console.log(response);
    return (
        <div className="container">
          {response
              ? <p>
                The temperature in Los Angeles is: {response.temperature} °F
                <br/>
                {response.summary}
                <br/>
                Humidity: {response.humidity}
              </p>
              : <p>Loading...</p>}
        </div>
    );
  }
}
export default App;