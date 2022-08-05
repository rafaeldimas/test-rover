import { InvalidAbscissaAxisPositionError, InvalidOrdinateAxisPositionError } from '@/entities/Rover/errors'

type Cardinal = 'N' | 'S' | 'W' | 'E'

export type Position = {
  abscissa: number,
  ordinate: number,
  cardinal: Cardinal
}

export type Direction = 'L' | 'R'

export class Rover {
  private positionsHistory: Position[] = []

  constructor (private currentPosition: Position) {
    this.positionsHistory.push(currentPosition)
  }

  getCurrentPosition (): Position {
    return this.currentPosition
  }

  private setCurrentPosition (currentPosition: Position): void {
    this.positionsHistory.push(currentPosition)
    this.currentPosition = currentPosition
  }

  getPositionsHistory (): Position[] {
    return this.positionsHistory
  }

  move (): void {
    const newPosition: Position = ['N', 'S'].includes(this.currentPosition.cardinal)
      ? this.moveOrdinate(this.currentPosition)
      : this.moveAbscissa(this.currentPosition)

    this.setCurrentPosition(newPosition)
  }

  private moveAbscissa ({ abscissa, ordinate, cardinal }: Position): Position {
    const newAbscissa = cardinal === 'E' ? ++abscissa : --abscissa

    if (newAbscissa === -1) {
      throw new InvalidAbscissaAxisPositionError()
    }

    return {
      abscissa: newAbscissa,
      ordinate,
      cardinal
    }
  }

  private moveOrdinate ({ abscissa, ordinate, cardinal }: Position): Position {
    const newOrdinate = cardinal === 'N' ? ++ordinate : --ordinate

    if (newOrdinate === -1) {
      throw new InvalidOrdinateAxisPositionError()
    }

    return {
      abscissa,
      ordinate: newOrdinate,
      cardinal
    }
  }

  spin (direction: Direction): void {
    const newPosition: Position = direction === 'L'
      ? this.spinLeft(this.currentPosition)
      : this.spinRight(this.currentPosition)

    this.setCurrentPosition(newPosition)
  }

  private spinLeft ({ cardinal, ...rest }: Position): Position {
    const directionsOfCardinal: Record<Cardinal, Cardinal> = {
      N: 'W',
      W: 'S',
      S: 'E',
      E: 'N'
    }

    return {
      ...rest,
      cardinal: directionsOfCardinal[cardinal]
    }
  }

  private spinRight ({ cardinal, ...rest }: Position): Position {
    const directionsOfCardinal: Record<Cardinal, Cardinal> = {
      N: 'E',
      E: 'S',
      S: 'W',
      W: 'N'
    }

    return {
      ...rest,
      cardinal: directionsOfCardinal[cardinal]
    }
  }
}
