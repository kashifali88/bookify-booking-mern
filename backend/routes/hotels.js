import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from '../controllers/hotelController.js';


const hotelsRouter = express.Router()

hotelsRouter.post('/',createHotel )
hotelsRouter.put('/:id', updateHotel)
hotelsRouter.delete('/:id',deleteHotel )
hotelsRouter.get('/find/:id',getHotel )
hotelsRouter.get('/', getHotels)
hotelsRouter.get('/countByCity', countByCity)
hotelsRouter.get('/countByType', countByType)
hotelsRouter.get('/room/:id', getHotelRooms)

































// // Update
// hotelsRouter.put('/:id', async (req,res) => {

//     try {
//         const updatedHotel = await Hotels.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true })
//         res.status(200).json(updatedHotel)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

// // Delete
// hotelsRouter.delete('/:id', async (req,res) => {

//      await Hotels.findByIdAndDelete(req.params.id)
//     try {

//         res.status(200).json('Hotel has been deleted')
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })
// // get
// hotelsRouter.get('/:id', async (req,res) => {

//     try {
//        const hotel =  await Hotels.findById(req.params.id)
//         res.status(200).json(hotel)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

// // get all
// hotelsRouter.get('/', async (req,res) => {

//     try {
//        const hotels =  await Hotels.find()
//         res.status(200).json(hotels)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })









export default hotelsRouter;