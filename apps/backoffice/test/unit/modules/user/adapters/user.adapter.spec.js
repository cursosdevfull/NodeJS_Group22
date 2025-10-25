"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("bootstrap/database");
const user_entity_1 = require("modules/user/adapters/entities/user.entity");
const user_adapter_1 = require("modules/user/adapters/user.adapter");
const user_1 = require("modules/user/application/roots/user");
describe("UserAdapter", () => {
    let userAdapter;
    let repository;
    let user;
    let userEntity;
    beforeEach(() => {
        user = new user_1.User({
            userId: 10,
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            roles: [{ roleId: 1, name: "ADMIN" }]
        });
        repository = {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findAndCount: jest.fn(),
        };
        const dataSourceMock = {
            getRepository: jest.fn().mockReturnValue(repository),
        };
        database_1.Database.dataSource = dataSourceMock;
        userAdapter = new user_adapter_1.UserAdapter();
        userEntity = new user_entity_1.UserEntity();
        userEntity.userId = 10;
        userEntity.name = "John Doe";
        userEntity.email = "john.doe@example.com";
        userEntity.password = "password123";
        userEntity.roles = [{ roleId: 1, name: "ADMIN" }];
    });
    describe("save", () => {
        it("should save a user and return the saved user", async () => {
            repository.save = jest.fn().mockResolvedValue(user);
            const result = await userAdapter.save(user);
            expect(repository.save).toHaveBeenCalled();
            expect(result).toEqual(user);
        });
    });
});
