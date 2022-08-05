import { Plateau, Rover } from '@/entities'
import { ExecuteCommands, Command } from '@/usecases'
import { InvalidMovementError } from '@/usecases/errors'

describe('Should create and use ExecuteCommands', () => {
  it('Should execute all commands without errors', () => {
    const plateau = new Plateau({ width: 5, height: 5 })
    const rover = new Rover({ abscissa: 1, ordinate: 2, cardinal: 'N' })
    const commands: Command[] = ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']

    const usecase = new ExecuteCommands(plateau, rover, commands)

    usecase.perform()

    expect(rover.getPositionsHistory().length).toEqual(commands.length + 1)
    expect(rover.getCurrentPosition()).toEqual({ abscissa: 1, ordinate: 3, cardinal: 'N' })
  })

  it('Should throw an error of InvalidMovementError', () => {
    const plateau = new Plateau({ width: 5, height: 5 })
    const rover = new Rover({ abscissa: 1, ordinate: 5, cardinal: 'N' })
    const commands: Command[] = ['M']

    const usecase = new ExecuteCommands(plateau, rover, commands)

    expect(() => usecase.perform()).toThrow(new InvalidMovementError())
  })
})
