"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_COOKIE_MAX_AGE = exports.SESSION_COOKIE_NAME = void 0;
exports.createSession = createSession;
exports.getSession = getSession;
exports.deleteSession = deleteSession;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';
const SESSION_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days
async function createSession(userId) {
    const token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
        expiresIn: '30d'
    });
    return token;
}
async function getSession(token) {
    if (!token)
        return null;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return {
            token,
            userId: decoded.userId,
            expiresAt: new Date(decoded.exp * 1000)
        };
    }
    catch (err) {
        // Token is invalid or expired
        return null;
    }
}
async function deleteSession(token) {
    // With JWT, we don't need to delete anything from the database.
    // The client will just clear the cookie.
}
exports.SESSION_COOKIE_NAME = 'pgz_session';
exports.SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE / 1000;
