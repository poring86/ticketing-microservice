import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.log("Something went wrong", err);

    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        message: [{ message: "Something went wrong" }],
    });
};
