export class InvalidMovementError extends Error {
  constructor () {
    super('If you perform this move you will get off the plate')
  }
}
