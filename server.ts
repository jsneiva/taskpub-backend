import app from 'src/start/app'
import 'dotenv/config'

const port = process.env.APP_PORT || 3000

const server = app.listen(port, () => {
  console.log('O Taskpub Backed está rodando na porta ' + port)
})

process.on('SIGINT', () => {
  server.close()
  console.log('O servidor foi encerrado.')
})
