const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/users.model')

const initialUsers = [
    {
        name: "timmy",
        email: "timmy123@gmail.com"
    },
    {
        name: "sam",
        email: "sam765@gmail.com"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

describe('GET Users test', () => {

    test('Users are returned as json', async () => {
        await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('all Users are returned', async () => {
        const response = await api.get('/api/users')
    
        expect(response.body).toHaveLength(initialUsers.length)
    })
})

describe('POST Users test', () => {

    test('Succeeds with valid data', async () => {
        const newUser = {
            name: "timothy",
            email: "timothy567@mail.com"
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const usersInDb = await User.find({})
        expect(usersInDb).toHaveLength(initialUsers.length + 1)
    })
})

describe('DELETE Users test', () => {

    test('Users can be deleted', async () => {
        const usersAtStart = await User.find({})
        const userToDelete = usersAtStart[0]

        await api
            .delete(`/api/users/${userToDelete.userId}`)
            .expect(204)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(initialUsers.length - 1)
    })
}) 

describe('PUT Users test', () => {
    test('Users email is updated', async () => {
        const usersAtStart = await User.find({})
        const userToUpdate = usersAtStart[0]

        updatedUser = {
            name: "timmy",
            email: "timmy999@gmail.com"
        }

        await api
            .put(`/api/users/${userToUpdate.userId}`)
            .send(updatedUser)
            .expect(200)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd[0].email).toBe("timmy999@gmail.com")
    })
})

afterAll(() => {
    mongoose.connection.close()
})