const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categoryData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Get one category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No Category associated with this ID" });
      return;
    }

    res.json(categoryData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });

    res.json(categoryData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );

    if (!categoryData) {
      res.status(404).json({ message: "No Category associated with this ID" });
      return;
    }

    res.json(categoryData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No Category associated with this ID" });
      return;
    }

    res.json(categoryData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

module.exports = router;
