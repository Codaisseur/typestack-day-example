import 'reflect-metadata'
import {createKoaServer, Action} from 'routing-controllers'
import PageController from './pages/controller'
import UserController from './users/controller'
import LoginController from './logins/controller'
import { verify } from './jwt'

export default createKoaServer({
  controllers: [
    PageController,
    UserController,
    LoginController
  ],
  authorizationChecker: (action: Action) => {
      const header: string = action.request.headers.authorization
      if (header && header.startsWith('Bearer ')) {
          const [ , token ] = header.split(' ')
          return !!(token && verify(token))
      }
      return false
  }
})
