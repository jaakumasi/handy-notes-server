const express = require('express');
const router = express.Router();
const UserModel = require('./UserModel');

router.post('/', express.json(), async (req, res) => {
    let note = req.body.note;
    let noteId = req.body.noteId;
    let noteTitle = req.body.noteTitle;
    let userEmail = req.body.userEmail;

    console.log('newNote: ', note);
    console.log('noteId: ', noteId);
    console.log('email: ', userEmail);
    console.log('noteTitle: ', noteTitle);

    try {
        await UserModel.findOneAndUpdate(    // first delete the old note 
            {
                email: userEmail
            }, 
            {
                $pull: {
                    notes: {
                        _id: noteId
                    }
                }
            }
        );
        const updatedNotes = await UserModel.findOneAndUpdate(    // then add the updated note 
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

// let r = await UserModel.findOneAndUpdate(    
        //     {
        //         email: userEmail
        //     },
        //     {
        //         $pullAll: {notes}
        //     },
        //     {
        //         new: true
        //     }
        // )
        // console.log(r);