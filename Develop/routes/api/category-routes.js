const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint



router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});



router.get('/:id',async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!categoryData) {
      res.status(404).json({message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});



router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json({ status: "success", payload: newCategory});
  } catch(err) {
    console.log(err)
    res.status(400).json({status: "error"});
  }
  // create a new category
});



router.put('/:id', async (req, res) => {
  try {
    const createCategory = await Category.update(req.body, {where: { id: req.params.id } } )
    res.json({ status: "success", payload: createCategory})
  } catch(err){
    res.status(400).json({ status: "error"})
  }
  // update a category by its `id` value
});




router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy ({
      where: {
        id: req.params.id
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
