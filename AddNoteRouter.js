const express = require('express');
const router = express.Router();
const UserModel = require('./UserModel');

router.post('/', express.json(), async (req, res) => {
    let noteTitle = req.body.noteTitle;
    let userEmail = req.body.userEmail;
    let note = req.body.note;

    console.log('noteTitle: ', noteTitle);
    console.log('email: ', userEmail);
    console.log('note: ', note);

    try {
        const updatedNotes = await UserModel.findOneAndUpdate(    // delete note and return new notes array
            {
                email: userEmail
            },
            {
                $push: {
                    notes: {
                        noteTitle: noteTitle,
                        note: note
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