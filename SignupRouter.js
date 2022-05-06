const express = require('express');
const router = express.Router();
const UserModel = require('./UserModel');

router.post('/', express.json(), async (req, res) => {
    let userName = req.body.userName; // get user email
    let email = req.body.email; // get user email
    let password = req.body.password;   // get user password

    console.log('username: ', userName)
    console.log('email: ', email)
    console.log('pword: ', password)

    try {
        const result = await UserModel.isEmailRegistered(email);  // check for availablility of email: taken / not taken
        console.log('result: ', result);
        if (!result) {    // email isn't taken / registered
            const user = await UserModel({ userName: userName, email: email, password: password });
            await user.save();
            console.log(user);
            res.json({ successful: true });
        }
        else {  //email already registered
            res.json({ successful: false });
        }
    } catch (e) {
        console.log(e.message);
    }

})

module.exports = router;

