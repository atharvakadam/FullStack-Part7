import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useHistory, useRouteMatch } from 'react-router-dom'
import './css/App.css';

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  );
}

const Note = ({note}) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important': ''}</strong></div>
    </div>
  )
}

const Notes = (props) => {
  return(
    <div>
      <h2>Notes</h2>
        <ul>
          {props.notes.map(note => <li key={note.id}><Link to={`/notes/${note.id}`}>{note.content}</Link></li>)}
        </ul>
    </div>
  );
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <li>Matti Luukkainen</li>
        <li>Atharva Kadam</li>
        <li>Gustavo Pezzi</li>
      </ul>
    </div>
  );
}

const Login = (props) => {
  const history = useHistory()
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>username: <input /></div>
        <div>password: <input type="password" /></div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const App = () => {

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Atharva Kadam'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const padding  = {
    padding: 5
  }

  const match = useRouteMatch('/notes/:id')
  const note = match ? notes.find(note => note.id === Number(match.params.id)) : null

  return (
    <div>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/notes">notes</Link>
          <Link style={padding} to="/users">users</Link>
          {user ? <em>{user} logged in</em> : <Link style={padding} to="/login">login</Link>}
        </div>

        <Switch>
          <Route path="/notes/:id">
            <Note note={note}/>
          </Route>
          <Route path="/notes">
            <Notes notes={notes}/>
          </Route>
          <Route path="/users">
            {user ? <Users /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login onLogin={login}></Login>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      <div>
        <br />
        <i>Note app, Department of Computer Science 2020</i>
      </div>
    </div>
  )
}

export default App;
