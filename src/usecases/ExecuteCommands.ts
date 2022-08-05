import { GridArea, Plateau, Position, Rover } from '@/entities'
import { InvalidMovementError } from '@/usecases/errors'

export type Command = 'L' | 'R' | 'M'

export class ExecuteCommands {
  constructor (
    private plateau: Plateau,
    private rover: Rover,
    private commands: Command[]
  ) {}

  perform () {
    this.commands.forEach(command => {
      if (command !== 'M') {
        return this.rover.spin(command)
      }

      this.validateMovement(this.rover.getCurrentPosition(), this.plateau.getGridArea())

      this.rover.move()
    })
  }

  private validateMovement (currentPosition: Position, gridArea: GridArea) {
    const isMovementOrdinate = ['N', 'S'].includes(currentPosition.cardinal)

    if (isMovementOrdinate && currentPosition.ordinate === gridArea.height) {
      throw new InvalidMovementError()
    }

    const isMovementAbscissa = ['W', 'E'].includes(currentPosition.cardinal)

    if (isMovementAbscissa && currentPosition.abscissa === gridArea.width) {
      throw new InvalidMovementError()
    }
  }
}
