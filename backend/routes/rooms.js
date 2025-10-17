import express from 'express'
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controllers/roomController.js';
import { verifyAdmin } from '../utils/VerifyToken.js';

const roomsRouter = express.Router()


roomsRouter.post('/:hotelid',verifyAdmin, createRoom)
roomsRouter.put('/:id',verifyAdmin, updateRoom)
roomsRouter.put('/availability/:id', updateRoomAvailability)
roomsRouter.delete('/:id/:hotelid',verifyAdmin, deleteRoom)
roomsRouter.get('/:id', getRoom)
roomsRouter.get('/', getAllRooms)





export default roomsRouter;