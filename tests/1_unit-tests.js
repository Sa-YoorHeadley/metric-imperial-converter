const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Read a whole number input', () => {
        assert.strictEqual(convertHandler.getNum('2kg'), 2, 'convertHandler should correctly read a whole number input.')
    })
    test('Read a decimal number input', () => {
        assert.strictEqual(convertHandler.getNum('2.5kg'), 2.5, 'convertHandler should correctly read a decimal number input.')
    })
    test('Read a fractional input', () => {
        assert.strictEqual(convertHandler.getNum('1/2kg'), 0.5, 'convertHandler should correctly read a fractional input.')
    })
    test('Read a fractional input with decimal', () => {
        assert.strictEqual(convertHandler.getNum('0.2/0.5kg'), 0.4, 'convertHandler should correctly read a fractional input with decimal.')
    })
    test('Correctly return an error on a double-fraction', () => {
        assert.strictEqual(convertHandler.getNum('2/2/3kg'), 'invalid number', 'convertHandler should correctly return an error on a double-fraction.')
    })
    test('Correctly default to a numerical input of 1 when no numerical input is provided', () => {
        assert.strictEqual(convertHandler.getNum(undefined), 1, 'convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.')
    })
    test('Correctly read each valid input unit', () => {
        assert.strictEqual(convertHandler.getUnit('1gal'), 'gal', 'convertHandler should correctly read each valid input unit.')
    })
    test('Correctly return an error for an invalid input unit', () => {
        assert.strictEqual(convertHandler.getUnit('1lego'), 'invalid unit', 'convertHandler should correctly return an error for an invalid input unit.')
    })
    test('Correctly return the correct return unit for each valid input unit', () => {
        assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'convertHandler should correctly return the correct return unit for each valid input unit.')
    })
    test('Correctly return the spelled-out string unit for each valid input unit', () => {
        assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', 'convertHandler should correctly return the spelled-out string unit for each valid input unit.')
    })
    test('Correctly convert gal to L', () => {
        assert.strictEqual(convertHandler.convert(1, 'gal'), '3.78541 L', 'convertHandler should correctly convert gal to L.')
    })
    test('Correctly convert L to gal', () => {
        assert.strictEqual(convertHandler.convert(3.78541, 'L'), '1 gal', 'convertHandler should correctly convert L to gal.')
    })
    test('Correctly convert mi to km', () => {
        assert.strictEqual(convertHandler.convert(1, 'mi'), '1.60934 km', 'convertHandler should correctly convert mi to km.')
    })
    test('Correctly convert km to mi', () => {
        assert.strictEqual(convertHandler.convert(1.60934, 'km'), '1 mi', 'convertHandler should correctly convert km to mi.')
    })
    test('Correctly convert lbs to kg', () => {
        assert.strictEqual(convertHandler.convert(1, 'lbs'), '0.453592 kg', 'convertHandler should correctly convert lbs to kg.')
    })
    test('Correctly convert kg to lbs', () => {
        assert.strictEqual(convertHandler.convert(0.453592, 'kg'), '1 lbs', 'convertHandler should correctly convert kg to lbs.')
    })

});