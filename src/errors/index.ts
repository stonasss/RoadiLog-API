function invalidCredentialsError(message: string) {
    return {
        name: "InvalidCredentialsError",
        message,
    };
};

function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "You must be logged in to continue",
    };
};

function duplicatedEmail(email: string) {
    return {
        name: "DuplicatedEmailError",
        message: "E-mail already in use",
        email,
    };
};

function conflictError() {
    return {
        name: "ConflictError",
        message: "Invalid submission",
    };
};

function notFoundError() {
    return {
        name: "NotFoundError",
        message: "No results found",
    };
};

export const errors = {
    invalidCredentialsError,
    unauthorizedError,
    duplicatedEmail,
    conflictError,
    notFoundError,
};
