const express = require('express');
const router = express.Router();
const UserModel = require('./UserModel');

router.post('/', express.json(), async (req, res) => {
    let userEmail = req.body.userEmail;
    let noteId = req.body.noteId;

    console.log('email: ', userEmail);
    console.log('noteId: ', noteId);

    try {
        const updatedNotes = await UserModel.findOneAndUpdate(    // delete note and return new notes array
            {
                email: userEmail
            },
            {
                $pull: {
                    notes: {
                        _id: noteId
                    }
                }
            },
            {
                new: true
            }
        );

        console.log('-------------');
        console.log('updatedNotes: ', updatedNotes.notes);
        res.json({ userName: updatedNotes.userName, email: updatedNotes.email, notes: updatedNotes.notes });
    } catch (e) {
        console.log(e.message);
    }

})

module.exports = router