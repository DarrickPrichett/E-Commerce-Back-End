const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product]
  })
    .then(tag => res.json(tag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(Product => {
      if (!Product) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(Product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.username,
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(Product => {
      if (!Product[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(Product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(Product => {
      if (!Product) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(Product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
