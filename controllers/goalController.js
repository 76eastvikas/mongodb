const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc    GET goals
// @route   GET/api/goals
// @access  Private

const getGoal = asyncHandler(async(req,res) => {

    const goals = await Goal.find()

    res.status(200).json(goals)
    // res.status(200).json({message:"get goals"})
})

// @desc    set goals
// @route   POST/api/goals
// @access  Private

const setGoal = asyncHandler(async(req,res) => {
    // console.log(req.body);
    if(!req.body.text){
    // res.status(400).json({message:"please add a text field"})
    throw new Error('please add a text field')
    }

    const goals = await Goal.create({
        text:req.body.text
    })
    res.status(200).json(goals)

    // res.status(200).json({message:"set goals"})
})

// @desc    update goals
// @route   PUT/api/goals/:id
// @access  Private

const updateGoal = asyncHandler(async(req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    
    // res.status(200).json({message:`update goals ${req.params.id}`})
    res.status(200).json(updatedGoal)

})

// @desc    delete goals
// @route   DELETE/api/goals/:id
// @access  Private

const deleteGoal = asyncHandler(async(req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    await goal.remove()

    // res.status(200).json(DeleteGoal)
    res.status(200).json({id: req.params.id})
    // res.status(200).json({message:`delete goals ${req.params.id}`})



})



module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal   
}