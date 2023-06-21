import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from '@faker-js/faker';
import { cleanDb } from "../helpers";
import { createSession } from "../factories/sessions-factory";
import { createUser } from "../factories/users-factory";
import prisma from "config/database";
import app from "app";

beforeAll(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('POST /login', () => {
    it('should respond with status 400 when body is not given', async() => {
        const response = await server.post('/login')
        
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    })
});
