import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from '@faker-js/faker';
import { cleanDb } from "../helpers";
import { createUser } from "../factories/users-factory";
import prisma from "config/database";
import app from "app";

beforeAll(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('POST /register', () => {
    it('should respond with status 400 when body is not given', async () => {
        const response = await server.post('/register')

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    })

    it('should respond with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
        const response = await server.post('/register').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    })

    describe('when body is valid', () => {
        beforeAll(async () => {
            await prisma.sessions.deleteMany();
            await prisma.users.deleteMany({});
        })

        const generateValidBody = () => ({
            name: faker.internet.userName(),
            email: faker.internet.email(),
            image: faker.image.imageUrl(),
            password: faker.internet.password(6),
        })

        it('should respond with status 409 when there is already a user with the same email', async () => {
            const body = generateValidBody();
            await createUser(body);
            const response = await server.post('/register').send(body);

            expect(response.status).toBe(httpStatus.CONFLICT);
        });

        it(`should respond with status 201 if image isn't submitted`, async () => {
            const body = {
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(6),
            }

            const response = await server.post('/register').send(body);

            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body).toEqual({
                name: body.name,
                email: body.email
            })
        });

        it('should respond with status 201 and create user when email is unique', async () => {
            const body = generateValidBody();
            const response = await server.post('/register').send(body);

            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body).toEqual({
                name: body.name,
                email: body.email,
                image: body.image
            })
        });

        it('should not return user password on body', async () => {
            const body = generateValidBody();
            const response = await server.post('/register').send(body);

            expect(response.body).not.toHaveProperty('password');
        });

        it('should save user on db', async () => {
            const body = generateValidBody();
            await server.post('/register').send(body);

            const user = await prisma.users.findUnique({
                where: { email: body.email },
            });

            expect(user).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: body.name,
                    email: body.email,
                    image: body.image,
                    password: user.password,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                })
            );
        });
    });
});

describe('POST /login', () => {
    it('should respond with status 400 when body is not given', async () => {
        const response = await server.post('/login');

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

        const response = await server.post('/login').send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
        beforeAll(async () => {
            await prisma.sessions.deleteMany();
            await prisma.users.deleteMany({});
        })

        const generateValidBody = () => ({
            name: faker.internet.userName(),
            email: faker.internet.email(),
            image: faker.image.imageUrl(),
            password: faker.internet.password(6),
        })

        it(`should respond with status 401 if email is correct and password isn't`, async () => {
            const body = generateValidBody();
            await server.post('/register').send(body);

            const incorrectPassword = {
                email: body.email,
                password: faker.internet.password(7),
            }

            const response = await server.post('/login').send(incorrectPassword)
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        })

        it(`should respond with status 401 if password is correct and email isn't`, async () => {
            const body = generateValidBody();
            await server.post('/register').send(body);

            const incorrectEmail = {
                email: faker.internet.email(),
                password: body.password,
            }

            const response = await server.post('/login').send(incorrectEmail)
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        })

        it('should respond with status 200 and correct body with token', async () => {
            const body = generateValidBody();
            await server.post('/register').send(body);

            const login = {
                email: body.email,
                password: body.password
            }

            const response = await server.post('/login').send(login)
            expect(response.status).toBe(httpStatus.OK)
            expect(response.body).toEqual({
                token: expect.any(String),
                image: {
                    id: expect.any(Number),
                    name: body.name,
                    email: body.email,
                    password: expect.any(String),
                    image: body.image,
                    createdAt: response.body.image.createdAt,
                    updatedAt: response.body.image.updatedAt
                }
            })
        })
    })
})
