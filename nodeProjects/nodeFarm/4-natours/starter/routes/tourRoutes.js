const express = require("express");
const fs = require('fs')

// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// ROUTE HANDLERS
// get all tours
const getAllTours = (req, res)=>{
    console.log(`Current Time: ${req.requestTime}`);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {tours}
    });
}

// create new tours
const createTour = (req,res)=>{
    console.log(req.body);
    // Again save that data to the json file.
    const newId = tours[tours.length-1].id + 1; //id if new object
    const newTour = Object.assign({id: newId}, req.body); //new object
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(201).json({
            status: "success",
            data: {
                newTour
            }
        });
    });
}

// get tours/5
const getTour = (req, res)=>{
    // console.log(req.params);
    const id = req.params.id*1; //string id converted to integer
    const tour = tours.find(el=>el.id === id);  //id=req.params

    // if (id>tours.length){ 
    if (!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id!'
        });
    };

    res.status(200).json({
        status: 'success',
        data: {tour}
    });
}

// Patch data
const updateTour = (req, res)=>{
    const id = req.params.id*1;
    if (id>tours.length){ 
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id!'
        });
    };    
    res.status(200).json({
        status: "success",
        data: {
            tour: '<tour updated !>'
        }
    });
}

// Delete data
const deleteTour = (req, res)=>{
    const id = req.params.id*1;
    if (id>tours.length){ 
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id!'
        });
    };    
    res.status(204).json({
        status: "success",
        data: null
    });
}

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;