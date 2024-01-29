"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
function sum(a, b) {
    return a + b;
}
(0, globals_1.describe)('sum module', () => {
    (0, globals_1.test)('adds 1 + 2 to equal 3', () => {
        (0, globals_1.expect)(sum(1, 2)).toBe(3);
    });
});
