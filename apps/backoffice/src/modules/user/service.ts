export class UserService {
    getList(): Promise<Array<{ id: number; name: string, lastname: string }>> {
        return Promise.resolve([
            { id: 1, name: "Alice", lastname: "Smith" },
            { id: 2, name: "Bob", lastname: "Johnson" },
            { id: 3, name: "Charlie", lastname: "Brown" },
        ]);
    }
}