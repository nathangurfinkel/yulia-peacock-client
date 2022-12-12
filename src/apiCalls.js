import axios from 'axios';

const apiHost = 'https://seahorse-app-cyj7w.ondigitalocean.app/api';

export function getAppointmentList() {
  const axios = require('axios');

  let config = {
    method: 'get',
    url: `${apiHost}/appointments`,
    headers: {},
  };

  return axios(config);
}

export function getAppointmentById(id) {
  let config = {
    method: 'get',
    url: `${apiHost}/appointments/${id}`,
    headers: {},
  };

  return axios(config);
}

export function postNewAppointment(data) {
  let config = {
    method: 'post',
    url: `${apiHost}/appointments/add`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config);
}

export function updateAppointmentById(id, data) {
  let config = {
    method: 'patch',
    url: `${apiHost}/appointments/update?id=${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config);
}

export function deleteAppointmentById(id) {
  let config = {
    method: 'delete',
    url: `${apiHost}/appointments/delete/${id}`,
    headers: {},
  };

  return axios(config);
}
