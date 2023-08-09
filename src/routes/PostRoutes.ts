import PostController from '../controllers/PostController'

const routerPost = app => {
    app.post('/createPost', PostController.createPost)
}

export default routerPost