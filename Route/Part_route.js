const express = require('express');
const router = express.Router();
const Part_Control = require('../Controler/Part_Control');

router.get('/', Part_Control.getAllParts);
router.get('/:id', Part_Control.getPartById);
router.post('/', Part_Control.addPart);
router.put('/:id', Part_Control.updatePart);
router.delete('/:id', Part_Control.deletePart);


