function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    if(!input || input === ''){ return 1 }
    
    result = input.split(/[a-zA-Z]/)[0]
    if(!result || result == ''){ return 1 }
    if(result == parseInt(result)){ return parseInt(result) }
    if(result == parseFloat(result)){ return parseFloat(result) }

    const resultArray = result.split('/')
    
    if(resultArray.length === 2){
      if(resultArray.some(value => value === '')) { return 'invalid number' }
      const numerator = parseFloat(resultArray[0])
      const denominator = parseFloat(resultArray[1])

      return numerator/denominator
    }

    if(resultArray.length === 3) { return 'invalid number' }

  };
  
  this.getUnit = function(input) {
    let result;
    if(!input || input == ''){ return 'invalid unit' }
    const regex = /[a-zA-Z]/
    const unitArray = ['l', 'gal', 'kg', 'mi', 'km', 'lbs']
    result = input.toString().slice(input.split('').findIndex(char => regex.test(char)))

    if(!unitArray.includes(result.toLowerCase())){ return 'invalid unit' }
    if(result === 'l'){
      result = 'L'
    }
    return result !== 'L' ? result.toLowerCase() : result;
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    result = this.getUnit(initUnit).toLowerCase()
    if(result !== 'invalid unit'){
      if(result === 'gal') { return 'L' }
      if(result === 'l') { return 'gal' }
      if(result === 'kg') { return 'lbs' }
      if(result === 'lbs') { return 'kg' }
      if(result === 'mi') { return 'km' }
      if(result === 'km') { return 'mi' }
    }

    return result;
  };

  this.getReturnNum = function(input) {
    let result;
    
    const initNum = this.getNum(input)
    const initUnit = this.getUnit(input)
    if(result !== 'invalid number'){
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      if(initUnit === 'gal'){ return initNum * galToL }
      if(initUnit === 'L'){ return initNum / galToL }
      if(initUnit === 'lbs'){ return initNum * lbsToKg }
      if(initUnit === 'kg'){ return initNum / lbsToKg }
      if(initUnit === 'mi'){ return initNum * miToKm }
      if(initUnit === 'km'){ return initNum / miToKm }
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit){
      case 'lbs' :
        result = 'pounds'
        break ;
      case 'kg' :
        result = 'kilograms'
        break ;
      case 'L' :
        result = 'litres'
        break ;
      case 'gal' :
        result = 'gallons'
        break ;
      case 'mi' :
        result = 'miles'
        break ;
      case 'km' :
        result = 'kilometers'
        break ;
      default :
        result = 'invalid unit'
        break ;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if(initUnit === 'gal'){ return `${initNum * galToL} ${this.getReturnUnit(initUnit)}` }
    if(initUnit === 'L'){ return `${initNum / galToL} ${this.getReturnUnit(initUnit)}` }
    if(initUnit === 'lbs'){ return `${initNum * lbsToKg} ${this.getReturnUnit(initUnit)}` }
    if(initUnit === 'kg'){ return `${initNum / lbsToKg} ${this.getReturnUnit(initUnit)}` }
    if(initUnit === 'mi'){ return `${initNum * miToKm} ${this.getReturnUnit(initUnit)}` }
    if(initUnit === 'km'){ return `${initNum / miToKm} ${this.getReturnUnit(initUnit)}` }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
