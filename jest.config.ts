module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"],
    transform: {
        ".+\.(ts|js)$": "ts-jest",
    },
    testMatch: ['<rootDir>/tests/**/*.(test|spec).(ts|js)'],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1"
    },
    forceExit: true,
};