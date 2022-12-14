import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

const deleteEntry = id => {
	//data is always empty on delete, so probably makes more sense to do something else here
	return axios.delete(`${baseUrl}/${id}`);
  // const request = axios.delete(`${baseUrl}/${id}`)
  // return request.then(response => response.data)
}

const exportable = { getAll, create, update, deleteEntry }

export default exportable