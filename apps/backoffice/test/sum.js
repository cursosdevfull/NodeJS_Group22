"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = void 0;
exports.showResult = showResult;
const sum = (a, b) => a + b;
exports.sum = sum;
function showResult(a, b) {
    const result = (0, exports.sum)(a, b);
    return `The sum of ${a} and ${b} is ${result}`;
}
// Example usage
const a = Math.ceil(Math.random() * 10 + 1);
const b = Math.ceil(Math.random() * 10 + 1);
console.log(showResult(a, b));
