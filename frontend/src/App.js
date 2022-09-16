import { useState, useEffect } from 'react'
import userService from './services/userService'
import { Container, Form, Button, InputGroup, Navbar } from 'react-bootstrap'
import UserTable from './components/UserTable'
import temperatureService from './services/temperatureService'

function App() {
    const [users, setUsers] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    const [temperatureReading, setTemperatureReading] = useState('')

    useEffect(()=> {
        userService
            .getAll()
            .then(allUsers => setUsers(allUsers))
        
        temperatureService
            .getHottestAreaInSG()
            .then(res => setTemperatureReading(res))
    },[])

    const addUser = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userObject = Object.fromEntries(formData.entries());

        if (users.some((user) => user.name === userObject.name)) {
            const existingUser = users.find((user) => user.name === userObject.name)
      
            if (window.confirm(`${existingUser.name} has already added to the database, update user email?`)) {
              userService
                .updateUser(existingUser.userId, userObject)
                .then(() => {
                  setUsers(users.map(user => user.userId === existingUser.userId ? userObject : user))
                })
                event.target.reset();
            }
            return
        }

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
            <Navbar bg="dark">
                <Container>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end align-">
                        <Navbar.Text className="text-light">
                            <p className="mb-0">Hottest area in Singapore right now is <span className="text-warning">{temperatureReading.name} at {temperatureReading.value} degrees celsius.</span></p>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
			<Container>
				<h1 className="text-primary mt-5 mb-5 p-3 text-center">User Database</h1>
                <h2 className="text-primary">Add user to database</h2>
                <p className="text-secondary">*Update user email by entering same name and new email</p>
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
                        Add user
                    </Button>
                </Form>
                <h3 className="text-primary">Searchbar</h3>
                <InputGroup className="mb-3">
                    <Form.Control value={searchFilter} onChange={handleSearchChange} placeholder="Search user" aria-label="name" aria-describedby="basic-addon1"/>
                </InputGroup>
                <UserTable users={users} searchFilter={searchFilter} onClick={deletePerson}/>
			</Container>
		</>
	);
}

export default App;
