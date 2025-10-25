module.exports = {
    testEnvironment: 'node',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^modules/(.*)$': '<rootDir>/src/modules/$1',
        '^bootstrap/(.*)$': '<rootDir>/src/bootstrap/$1',
        '^core/(.*)$': '<rootDir>/src/core/$1',
        '^@auth$': '<rootDir>/src/modules/auth/index.ts',
        '^@bootstrap$': '<rootDir>/src/bootstrap/index.ts',
        '^@core$': '<rootDir>/src/core/index.ts',
        '^@role$': '<rootDir>/src/modules/role/index.ts',
        '^@user$': '<rootDir>/src/modules/user/index.ts',
    },
    moduleDirectories: ['node_modules', 'src'],
    roots: ['<rootDir>/src/', '<rootDir>/test/'],
    bail: true,
    verbose: true,
    setupFilesAfterEnv: ['jest-extended', '<rootDir>/test/setup.ts'],
    reporters: [
        `default`,
        [
            `jest-html-reporters`,
            {
                publicPath: `reports`,
                filename: `test.v2.html`,
            },
        ],
        [
            `../../node_modules/jest-html-reporter`,
            {
                pageTitle: `Test API`,
                outputPath: `reports/test.v1.html`,
            },
        ],
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts',
        '!**/node_modules/**',
        '!src/**/*.entity.ts',
    ],
    coverageReporters: [`json`, `text`, `html`, 'lcov'],
    coverageDirectory: `reports/coverage`,
    testPathIgnorePatterns: [`/node_modules/`],
    testMatch: ['<rootDir>/test/**/*.spec.ts'],
    preset: `ts-jest`,
    transform: {
        '^.+\\.ts$': ['ts-jest', {
            tsconfig: 'tsconfig.test.json'
        }]
    },
};
