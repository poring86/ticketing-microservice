import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.log("Something went wrong", err);

    if (err instanceof RequestValidationError) {
        const formattedErrors = err.errors.map((error) => {
            return { message: error.msg, field: error.param };
        });

        return res.status(400).send({ errors: formattedErrors });
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(500).send({ errors: [{ message: err.reason }] });
    }

    res.status(400).send({
        message: [{ message: "Something went wrong" }],
    });
};
