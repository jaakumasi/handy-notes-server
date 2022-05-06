const express = require('express');
const router = express.Router();
const UserModel = require('./UserModel');

router.post('/', express.json(), async (req, res) => {
    let email = req.body.email; // get user email
    let password = req.body.password;   // get user password

    console.log('email: ', email)
    console.log('pword: ', password)

    try {
        const match = await UserModel.findOne({ email: email, password: password });
        console.log('match: ', match);
        if (match) {
            console.log('registered user');
            res.json({ userName: match.userName, email: match.email, notes: match.notes });
            console.log('res sent');
        }
        else {
            res.json(null);
        }
    } catch (e) {
        console.log(e.message);
    }

})

module.exports = router;

/*
const user = await UserModel.findOneAndUpdate({ email: email }, 
            { $pull: 
                { 
                    notes: {
                        note: 'test note 1', 
                    } 
                }
            }
        );
        // const user = await UserModel({ email: email, password: password });
        await user.save();
        console.log(user);
*/