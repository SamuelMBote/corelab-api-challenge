import Route from '@ioc:Adonis/Core/Route'
const sqllite3 = require('sqlite3')
import { exec } from 'child_process'

new sqllite3.Database(
  './database/db.todo',
  sqllite3.OPEN_READWRITE | sqllite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message)
    } else {
      exec('node ace migration:refresh')
      console.log('Connected to database.')
    }
  }
)
Route.group(() => {
  Route.resource('/notas', 'NotasController').apiOnly()
}).prefix('/api')
