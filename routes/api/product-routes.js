const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    res.json(productData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

// Get one product by ID
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({
      where: { id: req.params.id },
      include: [{ model: Category }, { model: Tag }]
    });

    if (!productData) {
      res.status(404).json({ message: "No Product associated with this ID" });
      return;
    }

    res.json(productData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

/* req.body should look like this...
  {
    product_name: "Basketball",
    price: 200.00,
    stock: 3,
    tagIds: [1, 2, 3, 4],
    category_id: 1
  }
*/

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map(tag_id => ({
        product_id: product.id,
        tag_id,
      }));

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    // Error handling
    console.log(err);
    res.status(400).json(err);
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: { id: req.params.id },
    });

    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });

    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    if (req.body.tagIds.length > 0) {
      const newProductTags = req.body.tagIds
        .filter(tag_id => !productTagIds.includes(tag_id))
        .map(tag_id => ({
          product_id: req.params.id,
          tag_id,
        }));

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    // Error handling
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id },
    });

    if (!productData) {
      res.status(404).json({ message: "No Product associated with this ID" });
      return;
    }

    res.json(productData);
  } catch (err) {
    // Error handling
    res.status(500).json(err);
  }
});

module.exports = router;
