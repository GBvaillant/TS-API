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

    }
}
