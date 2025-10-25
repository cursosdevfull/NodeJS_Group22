import { showResult } from "./sum"

describe("testing showResult function", () => {
    it("should return the correct result string", () => {
        // Arrange
        const a = 4
        const b = 6

        // Act
        const result = showResult(a, b)

        // Assert
        expect(result).toBe("The sum of 4 and 6 is 10")
    })
})