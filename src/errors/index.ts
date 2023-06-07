function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "Invalid credentials"
    };
};

function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "You must be logged in to continue",
    };
};

function duplicatedEmail() {
    return {
        name: "DuplicatedEmailError",
        message: "E-mail already in use",
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
