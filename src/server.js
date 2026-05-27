/* eslint-disable no-console */
import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '@/config/mongodb'
import { env } from '@/config/environment'
import { APIs_V1 } from '@/routes/v1'

const START_SERVER = () => {
  const app = express()

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  process.on('SIGINT', async () => {
    console.log('4. Conected to MongoDB Cloud Atlas...!')
    await CLOSE_DB()
    process.exit(0)
  })
}

(async () => {
  try {
    await CONNECT_DB()
    console.log('1. Conecting to MongoDB Cloud Atlas!')
    START_SERVER()
    console.log('2. Conected to MongoDB Cloud Atlas!')
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Conected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })