import express from 'express';
import { registerUser, loginUser } from '../controllers/c1.js';
import { createTask } from '../controllers/c2.js';
import { isLoggedIn} from '../middleware/auth.js';
import { getUserTasks } from '../controllers/c2.js';
import {  deleteTask ,postEditTask ,getEditForm} from '../controllers/c2.js';



const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
//router.get('/', (_, res) => res.send("🎉 Server is running"));
router.get('/', (_, res) => res.render('index'));
router.get('/register', (_, res) => res.render('index'));
router.get('/login', (_, res) => res.render('login'));
router.get('/profile', (req, res) => res.render('profile'));
router.post('/create-task', isLoggedIn, createTask);
router.get('/tasks', isLoggedIn, getUserTasks);
router.get('/logout', (_, res) => res.render('login'));
router.get('/edit-task/:id', isLoggedIn, getEditForm);
router.post('/edit-task/:id', isLoggedIn, postEditTask);
router.post('/delete-task/:id', isLoggedIn, deleteTask);




export default router;
