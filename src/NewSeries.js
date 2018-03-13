import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Asistir'
}

class NewSeries extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      isLoading: false,
      redirect: false
    }

    this.saveSeries = this.saveSeries.bind(this)
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

  saveSeries() {
    const newSerie = {
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }

    api.saveSerie(newSerie)
      .then(res => {
        this.setState({ redirect: `/series/list/${this.refs.genre.value}`})
      })
  }

  render() {
    return (
      <section id="intro" className="intro-section">
        {
          this.state.redirect &&
          <Redirect to={this.state.redirect} />
        }

        <h1>Nova Série</h1>

        <form>
          <label>Nome</label>
          <input type="text" className="form-control" ref="name" />

          <br />

          <label>Status</label>
          <select ref="status">
            { Object
                .keys(statuses)
                .map(key => <option key={key} value={key}>{statuses[key]}</option>)
            }
          </select>

          <br />

          <label>Gênero</label>
          <select ref="genre">
            { this.state.genres
                .map(key => <option key={key} value={key}>{key}</option>)
            }
          </select>

          <br />

          <label>Comentários</label>
          <textarea type="text" className="form-control" ref="comments"></textarea>

          <br />

          <button type="button" onClick={this.saveSeries}>Salvar</button>
        </form>
      </section>
    )
  }
}

export default NewSeries
