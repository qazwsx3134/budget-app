const express = require('express')
const Event = require('../model/event')
const router = new express.Router()


//Create Event

router.post('/api/event', async (req, res)=>{
    const event = new Event(req.body)

    //await要從上面那條promise被滿足之後才會繼續執行下個await
    try {
        await event.save()
        res.status(201).send(event)
    } catch (e) {
        res.status(400).send(e)
        
    }

})

//Get All Food

router.get('/api/event', async (req, res)=>{

    try {
        const event = await Event.find({})
        res.send(event)
    } catch (e) {
        res.status(500).send()
    }
})

//Get filtered city food

router.get('/api/event/filter/:id', async (req, res)=>{
    const filter = req.params.id
    try {
        const event = await Event.find({ city: filter})
        res.send(event)
    } catch (e) {
        res.status(500).send(e)
        console.log(e);
        
    }
})

//Get single food
router.get('/api/event/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const event = await Event.findById(_id)

        if (!event) {
            return res.status(404).send()
        }

        res.send(event)
    } catch (e) {
        res.status(500).send(e)
    }

})

//Update single food
router.patch('/api/event/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const event = await Event.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!event) {
            return res.status(404).send()
        }

        res.send(event)
    } catch (e) {
        res.status(400).send()
    }

   
})

//Delete single food

router.delete('/api/event/:id',async (req, res)=>{
    const _id = req.params.id

    try {
        const event = await Event.findByIdAndDelete(_id)

        if (!event) {
            return res.status(404).send()
        }

        res.send(event)

    } catch (e) {
        res.status(500).send()
    }
})





module.exports = router