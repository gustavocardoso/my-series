import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const loadGenres = () => api.get('genres')

export const saveSerie = (newSerie) => api.post('series', newSerie)

export const updateSerie = (serie) => api.put(`series/${serie.id}`, serie)

export const loadSeriesByGenre = (genre) => api.get(`series?genre=${genre}`)

export const deleteSerie = (id) => api.delete(`series/${id}`)

export const loadSerieById = (id) => api.get(`series/${id}`)

export default {
  loadGenres,
  saveSerie,
  updateSerie,
  loadSeriesByGenre,
  deleteSerie,
  loadSerieById
}
