const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.json(tagData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Get one tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }]
    });

    if (!tagData) {
      res.status(404).json({ message: "No Tag associated with this ID" });
      return;
    }

    res.json(tagData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });

    res.json(tagData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Update a tag's name by ID
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );

    if (!tagData) {
      res.status(404).json({ message: "No Tag associated with this ID" });
      return;
    }

    res.json(tagData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!tagData) {
      res.status(404).json({ message: "No Tag associated with this ID" });
      return;
    }

    res.json(tagData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

module.exports = router;
