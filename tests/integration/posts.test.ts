import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { cleanDb } from "../helpers";
import prisma from "@/config/database";
import app from "app";

beforeAll(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('GET /posts', () => {
    beforeAll(async () => {
        await cleanDb();
    });

    const generateValidUser = () => ({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.image.imageUrl(),
        password: faker.internet.password(6),
    });
})
