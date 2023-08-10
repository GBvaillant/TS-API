import UserController from '../controllers/UserController'

const routerUser = app => {
    app.post('/createUser', UserController.createUser)
    app.get('/listAlluser', UserController.listAllUser)
    app.get('/listUsersAndPost/:id', UserController.listUsersAndPost)
    app.get('/listUser/:id', UserController.listUser)
    app.delete('/deleteUser/:id', UserController.deleteUser)
}

export default routerUser