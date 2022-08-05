import { Plateau, Rover } from '@/entities'
import { chunk, FileSystem } from '@/shared'
import { ExecuteCommands } from '@/usecases'

type Command = 'L' | 'R' | 'M'
type Cardinal = 'N' | 'S' | 'W' | 'E'

type Position = {
  abscissa: number,
  ordinate: number,
  cardinal: Cardinal
}

type GridArea = {
  width: number,
  height: number
}

type RoverData = {
  position: Position,
  commands: Command[]
}

type ExecutionData = {
  gridArea: GridArea,
  roversData: RoverData[]
}

export class App {
  constructor (
    private filepath: string
  ) {}

  dispatch (): Position[] {
    const filesystem = new FileSystem()
    const text = filesystem.read(this.filepath)
    const { gridArea, roversData } = this.proccessText(text)

    const plateau = new Plateau(gridArea)

    const result = []
    for (const { position, commands } of roversData) {
      const rover = new Rover(position)

      const executeCommands = new ExecuteCommands(plateau, rover, commands)

      executeCommands.perform()

      result.push(rover.getCurrentPosition())
    }

    return result
  }

  proccessText (text: string): ExecutionData {
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '')

    const gridAreaText = lines.shift()
    if (!gridAreaText) {
      throw new Error('The first line must have 2 numbers')
    }

    const gridArea = this.normalizeGridArea(gridAreaText)
    const roversData = this.normalizeRoversData(lines)

    return {
      gridArea,
      roversData
    }
  }

  private normalizeGridArea (gridArea: string): GridArea {
    const [width, height] = gridArea
      .split(' ')
      .map(Number)

    return { width, height }
  }

  private normalizeRoversData (lines: string[]): RoverData[] {
    return chunk<string>(lines, 2)
      .map(([positionText, commandsText]) => ({
        position: positionText.split(' '),
        commands: commandsText.split('')
      }))
      .map(({ position: [abscissa, ordinate, cardinal], commands }): RoverData => ({
        position: {
          abscissa: Number(abscissa),
          ordinate: Number(ordinate),
          cardinal: cardinal as Cardinal
        },
        commands: commands as Command[]
      }))
  }
}
