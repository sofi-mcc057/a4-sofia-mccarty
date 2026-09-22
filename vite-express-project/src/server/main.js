import express from "express";
import ViteExpress from "vite-express";

const app = express();

const todos = [
  {name: 'buy groceries', complete:false}
]
app.use(express.json)

app.get('/read', (req, res) => res.json(todos))

app.post('/add', (req,res) =>{
  todos.push(req.body)
  res.json(todos)
})

app.post('/change', function(req,res){
  const idx = todos.findIndex(v => v.name === req.body.name)
  todos[idx].completed = req.body.completed
  res.sendStatus(200)
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
