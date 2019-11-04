import React from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './components/content';
import Header from './components/header';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Create from './components/create';
import Read from './components/read';
import Edit from './components/edit';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar bg="primary" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/read">Read</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Content} />
            <Route path="/create" component={Create} />
            <Route path="/read" component={Read} />
            <Route path="/edit/:id" component={Edit} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
