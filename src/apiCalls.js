import axios from 'axios';

const apiHost = 'https://seahorse-app-cyj7w.ondigitalocean.app/api';

export function getAppointmentList() {
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

// content :

// recordRoutes.route('/content').get(function (req, res) {
//     let db_connect = dbo.getDb('yulia_peacock');
//     db_connect
//       .collection('content')
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
//   });

//   // get content by id
//   recordRoutes.route('/content/:id').get(function (req, res) {
//     let db_connect = dbo.getDb('yulia_peacock');
//     let myquery = { _id: ObjectId(req.params.id) };
//     db_connect.collection('content').findOne(myquery, function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//   });

//   // create content
//   recordRoutes.route('/content/add').post(function (req, response) {
//     let db_connect = dbo.getDb('yulia_peacock');
//     let myobj = {
//       col: req.body.col,
//       body: req.body.body,
//     };
//     db_connect.collection('content').insertOne(myobj, function (err, res) {
//       if (err) throw err;
//       response.json(res);
//     });
//   });
//   // update content
//   recordRoutes.route('/content/update/:id').post(function (req, response) {
//     let db_connect = dbo.getDb('yulia_peacock');
//     let myquery = { _id: ObjectId(req.params.id) };
//     let newvalues = {
//       $set: {
//         col : req.body.col,
//         body: req.body.body,
//       },
//     };
//     db_connect
//       .collection('content')
//       .updateOne(myquery, newvalues, function (err, res) {
//         if (err) throw err;
//         response.json(res);
//       });
//   });

export function getContentList() {
  const axios = require('axios');

  let config = {
    method: 'get',
    url: `${apiHost}/content`,
    headers: {},
  };

  return axios(config);
}

export function getContentById(id) {
  let config = {
    method: 'get',
    url: `${apiHost}/content/${id}`,
    headers: {},
  };

  return axios(config);
}

export function postNewContent(data) {
  let config = {
    method: 'post',
    url: `${apiHost}/content/add`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config);
}

export function updateContentById(id, data) {
  let config = {
    method: 'patch',
    url: `${apiHost}/content/update?id=${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config);
}

export function deleteContentById(id) {
  let config = {
    method: 'delete',
    url: `${apiHost}/content/delete/${id}`,
    headers: {},
  };

  return axios(config);
}
