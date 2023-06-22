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
