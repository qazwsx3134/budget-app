const express = require('express')
const Qanda = require('../model/qanda')
const router = new express.Router()


//Create qanda

router.post('/api/qanda', async (req, res)=>{
    const qanda = new Qanda(req.body)

    //await要從上面那條promise被滿足之後才會繼續執行下個await
    try {
        await qanda.save()
        res.status(201).send(qanda)
    } catch (e) {
        res.status(400).send(e)
    }

})

//Get All qanda

router.get('/api/qanda', async (req, res)=>{

    try {
        const qanda = await Qanda.find({})
        res.send(qanda)
    } catch (e) {
        res.status(500).send(e)
        console.log(e);
        
    }
})

//Get filtered city qanda

router.get('/api/qanda/filter/:id', async (req, res)=>{
    const filter = req.params.id
    try {
        const qanda = await Qanda.find({ city: filter})
        res.send(qanda)
    } catch (e) {
        res.status(500).send()
    }
})


//Get single qanda
router.get('/api/qanda/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const qanda = await Qanda.findById(_id)

        if (!qanda) {
            return res.status(404).send()
        }

        res.send(qanda)
    } catch (e) {
        res.status(500).send(e)
    }

})

//Update single qanda
router.patch('/api/qanda/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const qanda = await Qanda.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!qanda) {
            return res.status(404).send()
        }

        res.send(qanda)
    } catch (e) {
        res.status(400).send()
    }

   
})

//Update single qanda comment
router.patch('/api/qanda/comment/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const qanda = await Qanda.findByIdAndUpdate(_id, { $push: { comment: req.body.comment }} ,{ 'upsert': true });

        if (!qanda) {
            return res.status(404).send('not found')
        }

        res.send(qanda)
    } catch (e) {
        res.status(400).send()
    }

   
})

//like qanda
router.patch('/api/qanda/comment/like/:id', async (req, res)=>{

    const _id = req.params.id
    

    try {
        const qanda = await Qanda.findByIdAndUpdate(_id, { $push: { likeby: req.body.likeby }} ,{ 'upsert': true });

        if (!qanda) {
            return res.status(404).send('not found')
        }

        res.send(qanda)
    } catch (e) {
        res.status(400).send(e)
    }

})

//dislike qanda
router.patch('/api/qanda/comment/dislike/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const qanda = await Qanda.findByIdAndUpdate(_id, { $push: { dislikeby: req.body.dislikeby }} ,{ 'upsert': true });

        if (!qanda) {
            return res.status(404).send('not found')
        }

        res.send(qanda)
    } catch (e) {
        res.status(400).send()
    }

})


//Delete single place

router.delete('/api/qanda/:id',async (req, res)=>{
    const _id = req.params.id

    try {
        const qanda = await Qanda.findByIdAndDelete(_id)

        if (!qanda) {
            return res.status(404).send()
        }

        res.send(qanda)

    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router