/**
 * Pseudo classe para lidar com a leitura de arquivos
 * para manter um pouco mais simples a implementação
 * vou passar os dados fixos
 */
export class FileSystem {
  read (filepath: string) {
    return `
    5 5
    1 2 N
    LMLMLMLMM
    3 3 E
    MMRMMRMRRM    
    `
  }
}
