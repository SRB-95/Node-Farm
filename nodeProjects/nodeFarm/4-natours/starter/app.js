const express = require("express");
const morgan = require("morgan");

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// MIDDLE WARE
// we can use a middleware by app.use() method
app.use(morgan('dev'));
app.use(express.json());

// Create own middleware
app.use((req, res, next)=>{
    // console.log(`Hello from the middleware!`);
    next();
});
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
});

// ROUTES
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Better way
app.use('/api/v1/tours', tourRouter);   //mounting the route
app.use('/api/v1/users', userRouter);

// START SERVER
port = 3000;
app.listen(port, ()=>{
    console.log(`Server running at ${port}`);
});