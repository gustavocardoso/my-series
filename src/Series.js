import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './Api'

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Asistir'
}

class Series extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      series: []
    }
  }

  componentDidMount = () => {
    this.loadData()
  }

  loadData = () => {
    this.setState({ isLoading: true })

    api.loadSeriesByGenre(this.props.match.params.genre)
      .then(res => {
        this.setState({
          isLoading: false,
          series: res.data
        })
      })
  }

  deleteSerie = id => {
    api.deleteSerie(id)
      .then(res => this.loadData())
  }

  renderSeries = serie => {
    return (
      <div className="item  col-xs-4 col-lg-4" key={serie.id}>
        <div className="thumbnail">
          <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
          <div className="caption">
            <h4 className="group inner list-group-item-heading">
              { serie.name }
            </h4>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <p className="lead">{ serie.genre } / { statuses[serie.status] }</p>
              </div>
              <div className="col-xs-12 col-md-6">
                <Link className="btn btn-success" to={ `/series/edit/${serie.id}` }>Gerenciar</Link>
                <a className="btn btn-success" onClick={ () => this.deleteSerie(serie.id) }>Excluir</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <section id="intro" className="intro-section">
        <h1>Séries: { this.props.match.params.genre }</h1>

        {
          this.state.isLoading &&
          <p>Carregando, aguarde...</p>
        }

        {
          !this.state.isLoading && this.state.series.length === 0 &&
          <p className="alert alert-info">Nenhuma série cadastrada!</p>
        }

        <div id="series" className="row list-group">
          { !this.state.isLoading &&
            this.state.series.map(this.renderSeries) }
        </div>
      </section>
    )
  }
}

export default Series
