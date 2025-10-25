import { Database } from "../../../../../src/bootstrap/database";
import { RoleEntity } from "../../../../../src/modules/role/adapters/entities/role.entity";
import { UserEntity } from "../../../../../src/modules/user/adapters/entities/user.entity";
import { UserAdapter } from "../../../../../src/modules/user/adapters/user.adapter";
import { User } from "../../../../../src/modules/user/application/roots/user";
import { Repository } from "typeorm";

describe("UserAdapter", () => {
    let userAdapter: UserAdapter;
    let repository: Repository<UserEntity>;
    let user: User;
    let userEntity: UserEntity;

    beforeEach(() => {
        user = new User({
            userId: 10,
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            roles: [{ roleId: 1, name: "ADMIN" }]
        })

        repository = {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findAndCount: jest.fn(),
        } as unknown as Repository<UserEntity>;

        const dataSourceMock = {
            getRepository: jest.fn().mockReturnValue(repository),
        }

        Database.dataSource = dataSourceMock as any;

        userAdapter = new UserAdapter();


        userEntity = new UserEntity();
        userEntity.userId = 10;
        userEntity.name = "John Doe";
        userEntity.email = "john.doe@example.com";
        userEntity.password = "password123";
        userEntity.roles = [{ roleId: 1, name: "ADMIN" }] as RoleEntity[];
    });

    describe("save", () => {
        it("should save a user and return the saved user", async () => {
            repository.save = jest.fn().mockResolvedValue(user);

            const result = await userAdapter.save(user);

            expect(repository.save).toHaveBeenCalled();
            expect(result).toEqual(user);
        })
    })
})
