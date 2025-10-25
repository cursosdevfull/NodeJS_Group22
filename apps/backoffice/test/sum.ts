export const sum = (a: number, b: number): number => a + b

export function showResult(a: number, b: number): string {
    const result = sum(a, b)
    return `The sum of ${a} and ${b} is ${result}`
}


// Example usage
const a = Math.ceil(Math.random() * 10 + 1)
const b = Math.ceil(Math.random() * 10 + 1)

console.log(showResult(a, b))