export default class PlateauEmptyError extends Error {
  constructor () {
    super('Plateau cant be empty')
  }
}
