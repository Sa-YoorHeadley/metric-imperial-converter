'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const { input } = req.query
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    if(initNum === 'invalid number' && initUnit === 'invalid unit') {return res.json({error: 'invalid number and unit'})}
    if(initNum === 'invalid number') {return res.json({error: 'invalid number'})}
    if(initUnit === 'invalid unit') {return res.json({error: 'invalid unit'})}
    const returnNum = +Number(convertHandler.getReturnNum(input)).toFixed(5)
    const returnUnit = convertHandler.getReturnUnit(input)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    console.log({initNum, initUnit, returnNum, returnUnit, string})
    res.json({initNum, initUnit, returnNum, returnUnit, string})
  })

};
