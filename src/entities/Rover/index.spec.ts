import { Position, Rover } from '@/entities/Rover'
import { InvalidAbscissaAxisPositionError, InvalidOrdinateAxisPositionError } from '@/entities/Rover/errors'

describe('Should create and use Rover', () => {
  it('Should use Rover to get current position after initialize', () => {
    const initialPosition: Position = {
      abscissa: 3,
      ordinate: 3,
      cardinal: 'N'
    }

    const rover = new Rover(initialPosition)

    expect(rover.getCurrentPosition()).toStrictEqual(initialPosition)
  })

  it('Should use Rover to move by ordinate North', () => {
    const initialPosition: Position = {
      abscissa: 3,
      ordinate: 3,
      cardinal: 'N'
    }

    const rover = new Rover(initialPosition)

    rover.move()

    expect(rover.getCurrentPosition().ordinate).toEqual(4)
  })

  it('Should use Rover to move by ordinate South', () => {
    const initialPosition: Position = {
      abscissa: 3,
      ordinate: 3,
      cardinal: 'S'
    }

    const rover = new Rover(initialPosition)

    rover.move()

    expect(rover.getCurrentPosition().ordinate).toEqual(2)
  })

  it('Should use Rover to move by abscissa East', () => {
    const rover = new Rover({
      abscissa: 3,
      ordinate: 3,
      cardinal: 'E'
    })

    rover.move()

    expect(rover.getCurrentPosition().abscissa).toEqual(4)
  })

  it('Should use Rover to move by abscissa West', () => {
    const rover = new Rover({
      abscissa: 3,
      ordinate: 3,
      cardinal: 'W'
    })

    rover.move()

    expect(rover.getCurrentPosition().abscissa).toEqual(2)
  })

  it("Shouldn't use Rover to move by abscissa West", () => {
    const rover = new Rover({
      abscissa: 0,
      ordinate: 3,
      cardinal: 'W'
    })

    expect(() => rover.move()).toThrow(new InvalidAbscissaAxisPositionError())
  })

  it("Shouldn't use Rover to move by ordinate South", () => {
    const rover = new Rover({
      abscissa: 3,
      ordinate: 0,
      cardinal: 'S'
    })

    expect(() => rover.move()).toThrow(new InvalidOrdinateAxisPositionError())
  })

  it('Should use Rover to spin to Lest', () => {
    const rover = new Rover({
      abscissa: 3,
      ordinate: 3,
      cardinal: 'W'
    })

    rover.spin('L')

    expect(rover.getCurrentPosition().cardinal).toEqual('S')
  })

  it('Should use Rover to spin to Right', () => {
    const rover = new Rover({
      abscissa: 3,
      ordinate: 3,
      cardinal: 'W'
    })

    rover.spin('R')

    expect(rover.getCurrentPosition().cardinal).toEqual('N')
  })
})
