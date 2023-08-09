import { Request, Response } from 'express'
import { prisma } from '../database'

export default {
    async createPost(req: Request, res: Response) {
        try {
            const { title, content, userId } = req.body
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    userId
                }
            })
            res.json({
                err: false,
                msg: 'Post criado com sucesso !',
                post
            })
        } catch (err) {
            res.json({ msg: err.message })
        }
    }
}