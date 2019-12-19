const express = require('express')
const Food = require('../model/Food')
const router = new express.Router()


//Create Food

router.post('/api/food', async (req, res)=>{
    const food = new Food(req.body)

    //await要從上面那條promise被滿足之後才會繼續執行下個await
    try {
        await food.save()
        res.status(201).send(food)
    } catch (e) {
        res.status(400).send(e)
    }

})

//Get All Food

router.get('/api/food', async (req, res)=>{

    try {
        const food = await Food.find({})
        res.send(food)
    } catch (e) {
        res.status(500).send()
    }
})

//Get filtered city food

router.get('/api/food/filter/:id', async (req, res)=>{
    const filter = req.params.id
    try {
        const food = await Food.find({ city: filter})
        res.send(food)
    } catch (e) {
        res.status(500).send(e)
        console.log(e);
        
    }
})

//Get single food
router.get('/api/food/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const food = await Food.findById(_id)

        if (!food) {
            return res.status(404).send()
        }

        res.send(food)
    } catch (e) {
        res.status(500).send(e)
    }

})

//Update single food
router.patch('/api/food/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const food = await Food.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!food) {
            return res.status(404).send()
        }

        res.send(food)
    } catch (e) {
        res.status(400).send()
    }

   
})


//Update single food comment
router.patch('/api/food/comment/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const food = await Food.findByIdAndUpdate(_id, { $push: { comment: req.body.comment }} ,{ 'upsert': true });

        if (!food) {
            return res.status(404).send('not found')
        }

        res.send(food)
    } catch (e) {
        res.status(400).send()
    }

   
})

//like food
router.patch('/api/food/comment/like/:id', async (req, res)=>{

    const _id = req.params.id
    

    try {
        const food = await Food.findByIdAndUpdate(_id, { $push: { likeby: req.body.likeby }} ,{ 'upsert': true });

        if (!food) {
            return res.status(404).send('not found')
        }

        res.send(food)
    } catch (e) {
        res.status(400).send(e)
    }

})

//dislike place
router.patch('/api/food/comment/dislike/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const food = await Food.findByIdAndUpdate(_id, { $push: { dislikeby: req.body.dislikeby }} ,{ 'upsert': true });

        if (!food) {
            return res.status(404).send('not found')
        }

        res.send(food)
    } catch (e) {
        res.status(400).send()
    }

})

//Delete single food

router.delete('/api/food/:id',async (req, res)=>{
    const _id = req.params.id

    try {
        const food = await Food.findByIdAndDelete(_id)

        if (!food) {
            return res.status(404).send()
        }

        res.send(food)

    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router