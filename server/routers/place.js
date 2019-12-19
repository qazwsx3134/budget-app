const express = require('express')
const Place = require('../model/place')
const router = new express.Router()


//Create place

router.post('/api/place', async (req, res)=>{
    const place = new Place(req.body)

    //await要從上面那條promise被滿足之後才會繼續執行下個await
    try {
        await place.save()
        res.status(201).send(place)
    } catch (e) {
        res.status(400).send(e)
        console.log(e);
        
    }

})

//Get All place

router.get('/api/place', async (req, res)=>{

    try {
        const users = await Place.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
        console.log(e);
        
    }
})

//Get filtered city place

router.get('/api/place/filter/:id', async (req, res)=>{
    const filter = req.params.id
    try {
        const users = await Place.find({ city: filter})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})


//Get single place
router.get('/api/place/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const place = await Place.findById(_id)

        if (!place) {
            return res.status(404).send()
        }

        res.send(place)
    } catch (e) {
        res.status(500).send(e)
    }

})

//Update single place
router.patch('/api/place/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const place = await Place.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!place) {
            return res.status(404).send()
        }

        res.send(place)
    } catch (e) {
        res.status(400).send()
    }

   
})



//Update single place comment
router.patch('/api/place/comment/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const place = await Place.findByIdAndUpdate(_id, { $push: { comment: req.body.comment }} ,{ 'upsert': true });

        if (!place) {
            return res.status(404).send('not found')
        }

        res.send(place)
    } catch (e) {
        res.status(400).send()
    }

   
})

//like place
router.patch('/api/place/comment/like/:id', async (req, res)=>{

    const _id = req.params.id
    

    try {
        const place = await Place.findByIdAndUpdate(_id, { $push: { likeby: req.body.likeby }} ,{ 'upsert': true });

        if (!place) {
            return res.status(404).send('not found')
        }

        res.send(place)
    } catch (e) {
        res.status(400).send(e)
    }

})

//dislike place
router.patch('/api/place/comment/dislike/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const place = await Place.findByIdAndUpdate(_id, { $push: { dislikeby: req.body.dislikeby }} ,{ 'upsert': true });

        if (!place) {
            return res.status(404).send('not found')
        }

        res.send(place)
    } catch (e) {
        res.status(400).send()
    }

})


//Delete single place

router.delete('/api/place/:id',async (req, res)=>{
    const _id = req.params.id

    try {
        const place = await Place.findByIdAndDelete(_id)

        if (!place) {
            return res.status(404).send()
        }

        res.send(place)

    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router