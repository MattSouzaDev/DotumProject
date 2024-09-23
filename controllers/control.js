const ContaData = require('../models/model')

const getData = async (req, res) => {
    const data = await ContaData.find()
    res.status(201).json(data)
}

const postData = async (req, res) => {
    const newData = await ContaData.create(req.body)
    res.status(201).json(newData)
}

const getId = async(req, res) => {
    const {id: ID} = req.params
    const singleData = await ContaData.findOne({_id: ID})
    res.json(singleData)
}

const updateData = async (req, res) => {
    const  {id: ID } = req.params
    const  updData = await ContaData.findOneAndUpdate({ _id: ID}, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({updData})
}

const deleteData = async (req, res ) => {
    const {id: ID} = req.params
    const delData = await ContaData.findOneAndDelete({_id: ID})
    res.status(200).json({ delData })
}

module.exports = {
    getData,
    postData,
    getId,
    updateData,
    deleteData
}