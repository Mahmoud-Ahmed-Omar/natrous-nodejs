const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status : 'success',
        results : tours.length,
        data : {tours}
    })
});

app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if(!tour){
        res.status(404).json({
            status : 'fail',
            message : 'Invalid Id'
        });
    }else{
        res.status(200).json({
            status : 'success',
            data : {tour}
        })
    }
});


app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length -1].id;
    const newTour = Object.assign({id : newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status : 'success',
            data : {
                tour : newTour
            }
        })
    })
});
app.patch('/api/v1/tours/:id', (req, res) => {
    if(req.params.id * 1 > tours.length ){
        res.status(404).json({
            status : 'fail',
            message : 'Invalid Id'
        });
    }else{
        res.status(200).json({
            status : 'success',
            data : {
                tour : '<Updated Tour>'
            }
        })
    }
   
})
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})