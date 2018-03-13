import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './Api'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    api.loadGenres()
      .then(response => {
        this.setState({
          genres: response.data,
          isLoading: false
        })
      })
  }

  renderGenreLink(genre) {
    return (
      <span key={genre}>&nbsp;<Link to={`/series/list/${genre}`}>{ genre }</Link>&nbsp;</span>
    )
  }

  render() {
    return (
      <div>
        <section id="intro" className="intro-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1><img src="/images/logo.png" alt="logo" /></h1>
                <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          {
            this.state.isLoading &&
            <span>Aguarde, carregando gêneros... </span>
          }
          {
            !this.state.isLoading &&
            <span>{this.state.genres.map(this.renderGenreLink)}</span>
          }
        </section>
      </div>
    )
  }
}

export default Home
