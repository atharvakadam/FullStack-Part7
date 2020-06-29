import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useHistory, useRouteMatch } from 'react-router-dom'
import './css/App.css';
import { Table, Form, Button, Alert, Nav, Navbar } from 'react-bootstrap'

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
      <Table striped>
        <tbody>
          {props.notes.map(note => 
            <tr key={note.id}>
              <td><Link to={`/notes/${note.id}`}>{note.content}</Link></td> 
              <td>{note.user}</td>
            </tr>
          )}
        </tbody>
      </Table>
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
      <br />
      <h2>Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username: </Form.Label> 
          <Form.Control type="text" name="username"/>
          <br />
          <Form.Label>password: </Form.Label> 
          <Form.Control type="password"/>
          <br />
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
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
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage( `welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding  = {
    padding: 5
  }

  const match = useRouteMatch('/notes/:id')
  const note = match ? notes.find(note => note.id === Number(match.params.id)) : null

  return (
    <div className="container" >
        {(message &&
          <Alert variant="success">
            {message}
          </Alert>
        )}
        <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/notes">notes</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user
                  ? <em>{user} logged in</em>
                  : <Link to="/login">login</Link>
                }
            </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />

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
