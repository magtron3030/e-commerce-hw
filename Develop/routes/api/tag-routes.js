const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});




router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});





router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
      res.json({ status: "success", payload: newTag})
  } catch(err) {
      console.log(err)
      res.status(400).json({status: "error"})
  }
  // create a new tag
});





router.put('/:id', async (req, res) => {
  try {
    const createTag = await Tag.update(req.body, {where: { id: req.params.id } } )
    res.json({ status: "success", payload: createTag})
  } catch(err){
    res.status(400).json({ status: "error"})
  }
  // update a tag's name by its `id` value
});






router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy ({
      where: {
        id: req.params.id
      },
    });

    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
