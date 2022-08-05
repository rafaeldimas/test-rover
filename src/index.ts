import { App } from '@/main'

const app = new App('/path/to/file.txt')

const result = app.dispatch()
const output = result
  .map(({ abscissa, ordinate, cardinal }) => (
    [abscissa, ordinate, cardinal].join(' ')
  )).join('\n')

console.log(output)
