import Express from 'express'
import routerUser from './routes/userRoutes'
import routerPost from './routes/PostRoutes'

const app = Express()
const PORT = 8000

app.use(Express.json())

app.get('/', (req, res) => {
    res.send({ message: 'home' })
})

routerUser(app)
routerPost(app)

app.listen(PORT, () => {
    console.log('servidor rodando na porta: ' + PORT)
})