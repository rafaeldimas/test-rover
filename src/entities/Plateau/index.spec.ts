import { Plateau, GridArea } from '@/entities/Plateau'
import { PlateauEmptyError } from '@/entities/Plateau/errors'

describe('Should create and use Plateau', () => {
  it('Should create Plateau without errors', () => {
    const gridArea: GridArea = {
      width: 5,
      height: 5
    }

    expect(new Plateau(gridArea)).toBeInstanceOf(Plateau)
  })

  it("Shouldn't create Plateau", () => {
    const gridArea: GridArea = {
      width: 0,
      height: 0
    }

    expect(() => new Plateau(gridArea)).toThrow(new PlateauEmptyError())
  })

  it('Should use Plateau to get grid area', () => {
    const gridArea: GridArea = {
      width: 5,
      height: 5
    }

    const plateau = new Plateau(gridArea)

    expect(plateau.getGridArea()).toStrictEqual(gridArea)
  })
})
