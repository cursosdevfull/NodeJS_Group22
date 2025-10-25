import { showResult, sum } from "./sum"

describe("testing sum function", () => {
    it("should return the sum of two numbers", () => {
        // Arrange
        const a = 5
        const b = 7

        // Act
        const result = sum(a, b)

        // Assert
        expect(result).toBe(12)
    })

    it("should return a negative number when the sum is negative", () => {
        // Arrange
        const a = -10
        const b = 3

        // Act
        const result = sum(a, b)

        // Assert
        expect(result).toBe(-7)
    })

    it("should return zero when both numbers are zero", () => {
        // Arrange
        const a = 0
        const b = 0

        // Act
        const result = sum(a, b)

        // Assert
        expect(result).toBe(0)
    })

    it("should return the sum of two negative numbers", () => {
        // Arrange
        const a = -5
        const b = -7

        // Act
        const result = sum(a, b)

        // Assert
        expect(result).toBe(-12)
    })

    it("should handle decimal numbers correctly", () => {
        // Arrange
        const a = 2.5
        const b = 3.1

        // Act
        const result = sum(a, b)

        // Assert
        expect(result).toBe(5.6)
    })
})

