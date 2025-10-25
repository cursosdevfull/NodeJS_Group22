import { User } from "../../../../../src/modules/user/application/roots/user";
import { UserApplication } from "../../../../../src/modules/user/application/user.application";


describe("User Application Module", () => {
    let user: User
    let userPortMock: any

    describe("constructor", () => {
        it("should create an instance of UserApplication", () => {
            const userPortMock = {} as any

            const userApplication = new UserApplication(userPortMock);

            expect(userApplication).toBeInstanceOf(UserApplication);
        });
    })

    describe("operations", () => {
        beforeEach(() => {
            user = new User({
                userId: 10,
                name: "John Doe",
                email: "john.doe@example.com",
                password: "password123",
                roles: [{ roleId: 1, name: "ADMIN" }]
            })

            userPortMock = {
                findByEmail: jest.fn().mockResolvedValue(null),
                save: jest.fn().mockResolvedValue(user),
                findById: jest.fn().mockResolvedValue(user),
                getAll: jest.fn(),
                getByPage: jest.fn()
            }
        })

        it("should save an user", async () => {
            // Arrange

            // Act
            const userApplication = new UserApplication(userPortMock);
            const response = await userApplication.create(user);

            // Assert
            expect(userPortMock.findByEmail).toHaveBeenCalledWith(user.toJSON().email)
            expect(userPortMock.save).toHaveBeenCalled()
            expect(userPortMock.save).toHaveBeenCalledTimes(1)
            expect(response).toBeInstanceOf(User)
        })

        it("should get an user", async () => {
            // Arrange


            // Act
            const userApplication = new UserApplication(userPortMock);
            const response = await userApplication.getById(user.toJSON().userId);

            // Assert
            expect(userPortMock.findById).toHaveBeenCalledWith(user.toJSON().userId)
            expect(userPortMock.findById).toHaveBeenCalledTimes(1)
            expect(response).toBeInstanceOf(User)
        })


    })
});