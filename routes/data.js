const Joi = require('joi');
const express = require('express');
const router = express.Router();

const dummyData = [
    { id: 1, name: 'some data 1' },
    { id: 2, name: 'some data 2' },
    { id: 3, name: 'some data 3' },
    { id: 4, name: 'some data 4' }
];

const dummySchema = Joi.object({
    name: Joi.string().min(3).required()
});

const validateDummyDataSchema = (data) => {
    let result;
    const { error } = dummySchema.validate(data);
    if (error) {
        result = { message: error.details.map(err => err.message).join('. ') };
    };

    return result;
}

const findData = (id) => {
    return dummyData.find(data => data.id === parseInt(id));
}

router.get('/', (req, res) => {
    res.status(200).send(dummyData);
});


router.get('/:id', (req, res) => {
    const data = findData(req.params.id);
    if (!data) return res.status(404).send({ message: 'Data not found' });
    
    res.status(200).send(data);
});

router.post('/', (req, res) => {
    const validationResult = validateDummyDataSchema(req.body);
    if (validationResult) return res.status(400).send(validationResult);
    
    const newData = {
        id: dummyData.length + 1,
        name: req.body.name
    }
    dummyData.push(newData);
    res.status(201).send({ message: 'New data created', data: newData });
});

router.patch('/:id', (req, res) => {
    const data = findData(req.params.id);
    if (!data) return res.status(404).send({ message: 'Data not found' });
    
    const validationResult = validateDummyDataSchema(req.body);
    if (validationResult) return res.status(400).send(validationResult);

    data.name = req.body.name;

    res.status(200).send({ message: 'Data was modified' });
});

router.delete('/:id', (req, res) => {
    const data = findData(req.params.id);
    if (!data) return res.status(404).send({ message: 'Data not found' });
    
    const index = dummyData.indexOf(data);
    dummyData.splice(index, 1);
    res.status(204).send({ message: `Data ${req.params.id} was deleted` });
});

module.exports = router;