import express from 'express'
import {  deleteUser, findAllUsers, findUser, updateUser } from '../controllers/userController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/VerifyToken.js'

const usersRouter = express.Router()



usersRouter.put('/:id', verifyUser, updateUser)
usersRouter.get('/:id', verifyUser, findUser)
usersRouter.get('/', verifyAdmin, findAllUsers)
usersRouter.delete('/:id',verifyUser, deleteUser)




export default usersRouter;