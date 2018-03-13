import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Asistir'
}

class EditSerie extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      serie: {},
      isLoading: false,
      redirect: false
    }

    this.saveSeries = this.saveSeries.bind(this)
  }

  componentDidMount = () => {
    this.setState({ isLoading: true })

    api.loadSerieById(this.props.match.params.id)
      .then(res => {
        this.setState({ serie: res.data })
        this.refs.name.value = this.state.serie.name
        this.refs.genre.value = this.state.serie.genre
        this.refs.status.value = this.state.serie.status
        this.refs.comments.value = this.state.serie.comments
      })

    api.loadGenres()
      .then(response => {
        this.setState({
          genres: response.data,
          isLoading: false
        })
      })
  }

  saveSeries() {
    const serie = {
      id: this.props.match.params.id,
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }

    api.updateSerie(serie)
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

        <h1>Editar Série</h1>

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

export default EditSerie
