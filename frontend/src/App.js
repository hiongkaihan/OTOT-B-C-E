import { useState, useEffect } from 'react'
import userService from './services/userService'
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import UserTable from './components/UserTable'

function App() {
    const [users, setUsers] = useState([])
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(()=> {
        userService
          .getAll()
          .then(allUsers => setUsers(allUsers))
    },[])

    const addUser = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userObject = Object.fromEntries(formData.entries());
        userService
            .addUser(userObject)
            .then(userObject => {
                setUsers(users.concat(userObject))
            })
        event.target.reset();
    }

    const deletePerson = (event) => {
        const id = event.target.id

        if (window.confirm(`Are you sure you want to delete this person?`)) {
            userService
              .removeUser(id)
              .then(() => {
                setUsers(users.filter(user => user.userId !== id))
              })
        } 
    }
    const handleSearchChange = (event) => {
        setSearchFilter(event.target.value);
        console.log(searchFilter)
    }

	return (
		<>
			<Container>
				<h1 className="text-primary mt-5 mb-5 p-3 text-center">User Database</h1>
                <Form className="mb-5" onSubmit={addUser}>
                    <Form.Group className="mb-3 w-50" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add to table
                    </Button>
                </Form>
                <h3 className="text-primary">Searchbar</h3>
                <InputGroup className="mb-5">
                    <Form.Control value={searchFilter} onChange={handleSearchChange} placeholder="Search user" aria-label="name" aria-describedby="basic-addon1"/>
                </InputGroup>
                <UserTable users={users} searchFilter={searchFilter} onClick={deletePerson}/>
			</Container>
		</>
	);
}

export default App;
