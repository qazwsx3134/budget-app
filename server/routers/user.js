const express = require('express')
const User =require('../model/user')
const router = new express.Router()
const passport = require('passport')


//FACEBOOK login

router.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email'] }));


router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
                                    session: true , 
                                    successRedirect: '/',
                                    failureRedirect: '/login' }));


//Login 

router.post('/api/users/login', passport.authenticate('local', { session: true ,failureRedirect: '/login' }),
            (req,res)=>{
                try {
                    res.send(req.user)
                } catch (e) {
                    res.status(400).send(e)
                }
            }
            )

//Logout

router.get('/api/users/logout', function(req, res){
                req.logout();
                res.redirect('/');
                });



//Create User

router.post('/api/users', async (req, res)=>{
    const user = new User(req.body)

    //await要從上面那條promise被滿足之後才會繼續執行下個await
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        console.log(e);
        
        res.status(400).send(e.messge)
    }

    


    // user.save().then(()=>{
    //     res.send(user)
    // }).catch(()=>{
    //     res.status(400).send(e)
    // })
})


// get info

// router.get('api/users', (req,res)=>{
    
//     try {
//        res.send('good')
//     } catch (e) {
//         console.log(e);
        
//     }
    
// })
//Get All User

router.get('/api/users', async (req, res)=>{

    try {
        const user = req.user
        
        if (!user) {
            res.status(404).send()
            return
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }


    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})


//Get single user
router.get('/api/users/:id', async (req, res)=>{

    const _id = req.params.id


    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.findById(_id).then((user)=>{
    //     //沒找到user的情況
    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

//Update single user
// router.patch('/api/users/:id', async (req, res)=>{

//     const _id = req.params.id


//     try {

//         const user = await User.findById(_id)


//         // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send()
//     }

   
// })

//Delete single user

router.delete('/api/users/:id',async (req, res)=>{
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router