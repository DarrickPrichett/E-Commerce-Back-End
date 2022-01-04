const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  Category.findAll({
    include: [Product]
  })
    .then(category => res.json(category))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Category.update(req.body, {
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
  Category.destroy({
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
