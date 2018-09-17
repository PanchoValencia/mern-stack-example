const express = require('express');
const router  = express.Router();
const Task    = require('../models/task');

router.get('/' , async (req , res) => { //cuando pidan la ruta inicial respondemos con algo
    const tasks = await Task.find(); //el await es parte del async await que hace trabajar algo mas mientras esto tarda en hacer su proceso
    res.json(tasks); //devuelve todas las tareas
});

router.get('/:id' , async (req , res) => { //obtiene solo una tarea por el id
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/' , async (req , res) => { //insertando datos
    const { title , description } = req.body;
    const task = new Task({title , description});
    await task.save();
    res.json({status : "task saved"});
});

router.put('/:id' , async (req , res) => { //para actualizar necesitaremos el id
    const { title , description } = req.body; //recibimos los datos del form
    const newTask = {title , description}; //se guardan en una nueva constante
    await Task.findByIdAndUpdate(req.params.id , newTask); //se actualizan en la bd con la funcion que recibe dos parametros, el id a buscar y los nuevos datos
    res.json({status : "task updated"});
});

router.delete('/:id' , async (req , res) => { //elimina una tarea por su id
    await Task.findByIdAndRemove(req.params.id);
    res.json({status : "task deleted"});
});

module.exports = router;
