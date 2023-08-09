import UserController from '../controllers/UserController'

const routerUser = app => {
    app.post('/createUser', UserController.createUser )
}

export default routerUser