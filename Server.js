const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
// app.use(express.urlencoded({extended: false}))   // allow access to form body

mongoose.connect('mongodb+srv://jaakumasi:0208060268Ab@users-cluster.p8dcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    () => console.log('connected to mongodb'));

const LoginRouter = require('./LoginRouter');  // router to handle logins
const SignupRouter = require('./SignupRouter');  // router to handle signups
const AddNoteRouter = require('./AddNoteRouter');  // router to handle addition of notes 
const UpdateNoteRouter = require('./UpdateNoteRouter');  // router to handle note updates
const DeleteNoteRouter = require('./DeleteNoteRouter');  // router to handle note deletion

app.use('/login', LoginRouter);
app.use('/signup', SignupRouter);
app.use('/addnote', AddNoteRouter);
app.use('/updatenote', UpdateNoteRouter);
app.use('/deletenote', DeleteNoteRouter);

app.listen(process.env.PORT || 63013, () => console.log('listening'));