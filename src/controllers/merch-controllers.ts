import { Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandler } from "../middlewares/error-handler-middlware.js";
import { ApplicationError, CheckId, NewMerch } from "../utils/protocols.js";
import { merchSchema } from "../schemas/merch-schema.js";
import { userServices } from "../services/users-services.js";
import { merchServices } from "../services/merch-services.js";

async function newMerch(req: Request, res: Response) {
    const merch = req.body as NewMerch
    const userToken = res.locals.user;

    const { error } = merchSchema.validate(merch)
    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });

    const { image, title, price } = req.body;

    try {
        const userId = await userServices.retrieveSession(userToken);
        if (!userId) return res.status(httpStatus.UNAUTHORIZED);

        const result = await merchServices.createMerch({ image, title, price, userId });
        return res.status(httpStatus.CREATED).send({ result });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    }
};

async function deleteMerch(req: Request, res: Response) {
    const { id } = req.params as CheckId;
    const userToken = res.locals.user;

    try {
        const merchExists = await merchServices.getMerchById(id);
        if (!merchExists) return res.status(httpStatus.BAD_REQUEST).send("Merch does not exist");

        const userId = await userServices.retrieveSession(userToken);
        if (merchExists.userId !== userId) return res.status(httpStatus.UNAUTHORIZED).send("Invalid request");

        await merchServices.deleteMerch(id);
        return res.status(httpStatus.OK).send("Merch deleted");
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

async function updateMerch(req: Request, res: Response) {
    const { id } = req.params as CheckId;
    const userToken = res.locals.user;
    const merch = req.body as NewMerch;

    const { error } = merchSchema.validate(merch);
    if (error) return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });

    const { image, title, price } = req.body;

    try {
        const merchExists = await merchServices.getMerchById(id);
        if (!merchExists) return res.status(httpStatus.BAD_REQUEST).send("Merch does not exist");

        const userId = await userServices.retrieveSession(userToken)
        if (merchExists.userId !== userId) return res.status(httpStatus.UNAUTHORIZED).send("Invalid request");

        const result = await merchServices.updateMerch({ image, title, price, id });
        return res.status(httpStatus.OK).send({ result });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

async function getMerch(req: Request, res: Response) {
    try {
        const merch = await merchServices.getMerch();
        return res.status(httpStatus.OK).send({ merch });
    } catch (err) {
        const error = err as ApplicationError | Error;
        errorHandler(error, req, res);
    };
};

export const merchControllers = {
    newMerch,
    getMerch,
    updateMerch,
    deleteMerch,
}