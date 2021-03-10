import { isNumValidator, formFieldsValidator } from '../validators/validators'

test('isNumValidator should return true for inputs of type number, false for other types', () => {
    expect(isNumValidator('8')).toBe(true)
    expect(isNumValidator('0')).toBe(true)
})

test('isNumValidator should return false for negative numbers', () => {
    expect(isNumValidator('-8')).toBe(false)
})

test('isNumValidator should return false for decimal numbers', () => {
    expect(isNumValidator('8.1')).toBe(false)
})

test('isNumValidator should return false for inputs of other types', () => {
    expect(isNumValidator('8o')).toBe(false)
    expect(isNumValidator('pop')).toBe(false)
    expect(isNumValidator('z')).toBe(false)
    expect(isNumValidator(' ')).toBe(false)
})

test('formFieldsValidator should take in an object of type string with attr minimum, maximum, and target. If any value is empty string should return false', () => {
    expect(formFieldsValidator({ minimum:'', maximum:'', target:''})).toBe(false)
    expect(formFieldsValidator({ minimum:'8', maximum:'', target:''})).toBe(false)
    expect(formFieldsValidator({ minimum:'', maximum:'8', target:''})).toBe(false)
    expect(formFieldsValidator({ minimum:'', maximum:'', target:'8'})).toBe(false)
    expect(formFieldsValidator({ minimum:'8', maximum:'8', target:''})).toBe(false)
    expect(formFieldsValidator({ minimum:'', maximum:'8', target:'8'})).toBe(false)
    expect(formFieldsValidator({ minimum:'8', maximum:'', target:'8'})).toBe(false)
})

