import { Request, Response } from 'express'
import { prisma } from '../database'
import bcrypt from 'bcrypt'

export default {

    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body
            const userExist = await prisma.user.findUnique({ where: { email } })

            if (userExist) {
                res.json({
                    err: true,
                    msg: 'Erro: Email ja cadastrado!'
                })
            }
            const passHash = await bcrypt.hash(password, 10)
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: passHash
                },
                select: {
                    name: true,
                    email: true,
                    password: false
                }
            })

            return res.json({
                err: false,
                msg: 'Usuário cadastrado com sucesso',
                user
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },

    async listAllUser(req: Request, res: Response) {
        try {
            const user = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                }
            })
            if (!user) {
                res.json({
                    err: true,
                    msg: 'Não existe users'
                })
            }

            return res.json({
                err: false,
                user
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },

    async listUsersAndPost(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await prisma.user.findMany({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    name: true,
                    email: false,
                    password: false,
                    Post: true
                }
            })
            if (!user) {
                res.json({
                    err: true,
                    msg: 'Não existe users'
                })
            }

            return res.json({
                err: false,
                user
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },

    async listUser(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await prisma.user.findMany({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                }
            })
            if (!user) {
                res.json({
                    err: true,
                    msg: 'Não existe users'
                })
            }

            return res.json({
                err: false,
                user
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params
            const userExists = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!userExists) {
                res.json({
                    err: true,
                    msg: 'Usuário não encontrado'
                })
            }

            const user = await prisma.user.deleteMany({
                where: {
                    id: Number(req.params.id)
                }

            })

            return res.json({
                err: true,
                msg: 'Usuário deletado com sucesso',
                user

            })
        } catch (err) {
            res.json({ msg: err.message })
        }
    }
}
