import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import NewSeries from './NewSeries'
import Series from './Series'
import EditSerie from './EditSerie'

// functional-stateless component
const About = () => <section id="intro" className="intro-section"><h1>Sobre</h1></section>

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header page-scroll">
                <a className="navbar-brand page-scroll" href="#page-top">
                  <img src="/images/logo.png" height="30" alt="logo" />
                </a>
              </div>

              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">Sobre</Link>
                  </li>
                  <li>
                    <Link to="/new">Nova série</Link>
                  </li>
                </ul>
              </div>

            </div>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/series/edit/:id" component={EditSerie} />
          <Route path="/series/list/:genre" component={Series} />
          <Route exact path="/about" component={About} />
          <Route exact path="/new" component={NewSeries} />
        </div>
      </Router>
    )
  }
}

export default App
