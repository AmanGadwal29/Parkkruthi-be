const express = require('express');
const router = express.Router();
const {
  addPlants,
  showPlants,
  categoryPlants,
  onePlant,
  deletePlant
} = require('../Controller/PlantsController');

// Define routes
router.post('/add', addPlants);
router.get('/all', showPlants);
router.get('/category/:category', categoryPlants);
router.get('/:id', onePlant);
router.delete('/:id', deletePlant);

module.exports = router; // ✅ MUST EXPORT THE ROUTER
