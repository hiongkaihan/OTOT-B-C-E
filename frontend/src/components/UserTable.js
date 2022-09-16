import { Table, Button } from 'react-bootstrap'

const UserTable = ({ users, searchFilter, onClick} ) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {(users.filter((user) => user.name.toLowerCase().includes(searchFilter.toLowerCase()))).map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Button id={user.userId} onClick={onClick} variant="danger">Delete</Button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default UserTable