import express from "express";
import ViteExpress from "vite-express";

const app = express();

const appdata = []

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( appdata ) )

app.post( '/add', ( req,res ) => {
  const {yourname, assignmenttype, gradeletter, cmts} = req.body
  const newEntry = {
    yourname: yourname,
    assignmenttype: assignmenttype,
    gradeletter: gradeletter,
    cmts: cmts,
  }
  appdata.push(newEntry)
  res.json( appdata )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
