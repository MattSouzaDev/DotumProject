const express = require('express')
const rota = express.Router();

const {
    getData,
    postData,
    getId,
    updateData,
    deleteData

} = require('../controllers/control')



rota.route('/endProj').get(getData).post(postData)
rota.route('/endProj/:id').get(getId).patch(updateData).delete(deleteData)


module.exports = rota