const router = require('express').Router();
const Person = require('../models/Person');

//READ ALL
router.get('/person', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);

  } catch (err) {
    res.status(400).json({
      err: err.message
    });
  }
})

//READ one person
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id })
    if (!person) {
      res.status(422).json({ message: "Usuário não encontrado" })
      return
    }

    res.status(200).json(person);
  }
  catch (error) {
    res.status(500).json({ error: error })
  }
})

//CREATE Person
router.post('/person', async (req, res) => {
  const { name, salary, approved } = req.body;
  const person = { name, salary, approved };

  if (!name) {
    res.status(422).json({ error: "O campo name é obrigatório." })
  }
  if (!salary) {
    res.status(422).json({ error: "O campo salary é obrigatório." })
  }
  if (!approved) {
    res.status(422).json({ error: "O campo approved é obrigatório." })
  }

  try {
    await Person.create(person);
    res.status(200).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//UPDATE - Atualização de dados (PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;

  const person = {
    name, salary, approved
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);
    if(updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "Usuário não encontrado" })
      return
    }
    return res.status(200).json(person);
  }
  catch (err) {
    res.status(500).json({ err: err });
  }
})

//DELETE 
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if(!person) {
    res.status(404).json({ message: "Usuário não encontrado"});
    return
  }

  try{
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário removido com sucesso"});
  }
  catch(err) {
    res.status(500).json({ err: err });
  }
})


module.exports = router;