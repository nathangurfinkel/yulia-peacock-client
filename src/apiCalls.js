import axios from 'axios';
// mongo db connection
// This section will help you get a list of all the records.
// recordRoutes.route('/record').get(function (req, res) {
//     let db_connect = dbo.getDb('yulia_appointments');
//     db_connect
//       .collection('records')
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
//   });
const apiHost = '/api';

export function getAppointmentList() {
  return axios.get(`${apiHost}/record`);
}

export function postAppointment() {
  return axios.post(`${apiHost}/record/add`);
}
