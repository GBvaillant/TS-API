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
    },
    async listPost(req: Request, res: Response) {
        try {
            const { id } = req.params
            const post = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!post) {
                res.json({
                    err: true,
                    msg: 'Post não encontrado'
                })
            }

            return res.json({
                err: false,
                post
            })

        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    async updatePost(req: Request, res: Response) {
        try {
            const { id, title, content } = req.body
            const postExists = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!postExists) {
                res.json({
                    err: true,
                    msg: 'Post não encontrado'
                })
            }
            const post = await prisma.post.update({
                where: {
                    id: Number(req.body.id)
                },
                data: {
                    title,
                    content
                }
            })
            return res.json({
                err: false,
                msg: 'Post atualizado com sucesso',
                post
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }

    },

    async deletePost(req: Request, res: Response) {
        try {
            const { id } = req.params

            const postExists = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!postExists) {
                res.json({
                    err: true,
                    msg: 'Post não encontrado !'
                })
            }
            const post = await prisma.post.delete({
                where: {
                    id: Number(req.params.id)
                }
            })
            return res.json({
                err: false,
                msg: 'Post deletado com sucesso!',
                post
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }

    }

}