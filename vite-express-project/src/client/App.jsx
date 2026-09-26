import React, { useState, useEffect } from 'react'

// const Entry = props => (
//   <li>{props.name} : 
//     <input
//       type="checkbox"
//       defaultChecked={props.completed}
//       onChange={ e => props.onclick( props.name, e.target.checked )
//     }/>
//   </li>
// )


const App = () => {
  const [formData, setFormData] = useState({
    yourname: '',
    assignmenttype: '',
    gradeletter: '',
    cmts: ''
  })

  const [entries, setEntries] = useState([ ]) 

  // function toggle( name, completed ) {
  //   fetch( '/change', {
  //     method:'POST',
  //     body: JSON.stringify({ name, completed }),
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  // }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function add() {
    // const value = document.querySelector('input').value

    fetch( '/add', {
      method:'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
       setEntries( json )
    })
  }
  
  // make sure to only do this once
  if( entries.length === 0 ) {
    fetch( '/read' )
      .then( response => response.json() )
      .then( json => {
        setEntries( json ) 
      })
  }
    
  // useEffect( ()=> {
  //   document.title = `${entries.length} todo(s)`
  // })

  return (
    <div className="App">
      <label htmlFor="yourname" id="labels">What's your name? </label>
      <input type='text' 
      id='yourname'
      name='yourname'
      value={formData.yourname}
      onChange={handleChange} 
      />
      <br/> <br/>
      <label htmlFor="assignment" id="labels">Assignment Type: </label>
      <select name="assignmenttype" 
      id="assignmenttype" 
      value={formData.assignmenttype} 
      onChange={handleChange} >
        <option value="">--Please choose an option--</option>
        <option value="hw">hw</option>
        <option value="quiz">quiz</option>
        <option value="test">test</option>
        <option value="project">project</option>
      </select>
      <br/><br/>
      <label htmlFor="grade" id="labels">Letter Grade: </label>
      <select name="gradeletter" 
      id="gradeletter" 
      value={formData.gradeletter}
      onChange={handleChange} >
        <option value="">--Please choose an option--</option>
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
        <option value="d">d</option>
      </select>
      <br/>
      <br/>
      <label htmlFor="cmts" id="labels">Any comments? </label>
      <textarea id="cmts" 
      name="cmts" 
      value={formData.cmts}
      onChange={handleChange} >
      </textarea>
      <br/><br/>
    <button onClick={ e => add()}>add</button>
      <ul>
        { entries.map( (entry,i) =>
          <li key={i}>
            name: {entry.yourname} <br/> 
            assignment type: {entry.assignmenttype} <br/> 
            grade: ({entry.gradeletter}) <br/> 
            comments: {entry.cmts} <br/> 
          </li>
        )}
     </ul> 
    </div>
  )
}

export default App
