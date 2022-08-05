import PlateauEmptyError from '@/entities/Plateau/errors/PlateauEmpty'

export type GridArea = {
  width: number,
  height: number
}

export class Plateau {
  constructor (private gridArea: GridArea) {
    if (!gridArea.width || !gridArea.height) {
      throw new PlateauEmptyError()
    }
  }

  getGridArea (): GridArea {
    return this.gridArea
  }
}
