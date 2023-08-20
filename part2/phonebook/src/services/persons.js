import axios from 'axios'

const BASEURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(BASEURL)
    .then(resp => resp.data)
}

const create = (person) => {
  return axios
    .post(BASEURL, person)
    .then(resp => resp.data)
}

const remove = (id) => {
  return axios
    .delete(`${BASEURL}/${id}`)
    .then(resp => resp.data)
}

const update = (person) => {
  return axios
    .put(`${BASEURL}/${person.id}`, person)
    .then(resp => resp.data)
}

export default {
  getAll,
  create,
  remove,
  update
}
