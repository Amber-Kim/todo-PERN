const express = require('express');
const app = express();
const port = process.env.PROT || 5000;
const cors = require('cors') // connect to client:3000 and server:4000
const pool = require('./db')

// middleware
app.use(cors())

// body-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
// Create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    )
    res.json(newTodo.rows)
  
  } catch (error) {
    console.log(error.message)
  }
})

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo",
    )
    res.json(allTodos.rows)

  } catch (error) {
    console.log(error.message)
  }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id
    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [id]
    )

      res.json(todo.rows[0])
  } catch (error) {
    console.log(error.message)
  }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {description} = req.body
    const updateTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id = $2",
      [description, id]
    )
    res.json("수정 완")

  } catch (error) {
    console.log(error.message)
  }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    )
    res.json("삭제 완")

  } catch (error) {
    console.log(error.message)
  }
})









app.listen(port, () => 
console.log(`Listening on Port ${port}`));
