import React, { useState, useEffect } from 'react'

const Todo = props => (
  <li>{props.name} : 
    <input
      type="checkbox"
      defaultChecked={props.completed}
      onChange={ e => props.onclick( props.name, e.target.checked )
    }/>
  </li>
)

const App = () => {
  const [todos, setTodos] = useState([ ]) 

  function toggle( name, completed ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  function add() {
    const value = document.querySelector('input').value

    fetch( '/add', {
      method:'POST',
      body: JSON.stringify({ name:value, completed:false }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
       setTodos( json )
    })
  }
  
  // make sure to only do this once
  if( todos.length === 0 ) {
    fetch( '/read' )
      .then( response => response.json() )
      .then( json => {
        setTodos( json ) 
      })
  }
    
  useEffect( ()=> {
    document.title = `${todos.length} todo(s)`
  })

  return (
    <div className="App">
      <label for="yourname" id="labels">What's your name? </label>
      <input type='text' id='yourname'/>
      <br/>
      <br/>
      <label for="assignment" id="labels">Assignment Type: </label>
      <select name="assignment-type" id="assignmenttype">
        <option value="">--Please choose an option--</option>
        <option value="hw">hw</option>
        <option value="quiz">quiz</option>
        <option value="test">test</option>
        <option value="project">project</option>
      </select>
      <br/>
      <br/>
      <label for="grade" id="labels">Letter Grade: </label>
      <select name="grade-letter" id="gradeletter">
        <option value="">--Please choose an option--</option>
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
        <option value="d">d</option>
      </select>
      <br/>
      <br/>
      <label for="cmts" id="labels">Any comments? </label>
      <textarea id="cmts" name="comments"></textarea>
      <br/>
      <br/>
    <button onClick={ e => add()}>add</button>
      <ul>
        { todos.map( (todo,i) =>
          <Todo
            key={i}
            name={todo.name}
            completed={todo.completed}
            onclick={ toggle }
          />
        )}
     </ul> 
    </div>
  )
}

export default App
