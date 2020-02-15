const express = require('express')
const router = express.Router();
const Course = require('../models/courseModel')
const verify = require('./verifyToken')


//GETS BACK ALL THE COURSE
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses);

    } catch (err) {
        res.json({ message: err })
    }
})


//POST THE COURSE
router.post('/',verify, async (req, res) => {
    // console.log(req.body)
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });
    try {
        const savedCourse = await course.save()
        res.json(savedCourse);
    } catch (err) {
        res.json({ message: err })
    }
});


//GETSPECIFIC COURSSE
router.get('/:courseId', async (req, res) => {
    try {
        // console.log(req.params.courseId )
        const course = await Course.findById(req.params.courseId)
        res.json(course)
    } catch (err) {
        res.json({ message: err })
    }
})


//DELETE COURSE
router.delete('/:courseId', async (req, res) => {
    try {
        const removedCourse = await Course.deleteOne({ _id: req.params.courseId })
        res.json(removedCourse)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router;