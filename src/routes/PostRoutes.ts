import PostController from '../controllers/PostController'

const routerPost = app => {
    app.post('/createPost', PostController.createPost)
    app.get('/listPost/:id', PostController.listPost)
    app.put('/updatePost', PostController.updatePost)
    app.delete('/deletePost/:id', PostController.deletePost)
    app.get('/listAllPost', PostController.listAllPost)
}

export default routerPost