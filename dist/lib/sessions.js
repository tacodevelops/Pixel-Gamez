"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_COOKIE_MAX_AGE = exports.SESSION_COOKIE_NAME = void 0;
exports.createSession = createSession;
exports.getSession = getSession;
exports.deleteSession = deleteSession;
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("./prisma");
const SESSION_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
async function createSession(userId) {
    const token = crypto_1.default.randomBytes(32).toString('hex');
    const now = Date.now();
    await prisma_1.prisma.session.create({
        data: {
            token,
            userId,
            expiresAt: new Date(now + SESSION_MAX_AGE),
        }
    });
    return token;
}
async function getSession(token) {
    if (!token)
        return null;
    const session = await prisma_1.prisma.session.findUnique({ where: { token } });
    if (!session)
        return null;
    if (session.expiresAt.getTime() < Date.now()) {
        await prisma_1.prisma.session.delete({ where: { token } });
        return null;
    }
    return session;
}
async function deleteSession(token) {
    try {
        await prisma_1.prisma.session.delete({ where: { token } });
    }
    catch (_a) {
    }
}
exports.SESSION_COOKIE_NAME = 'pgz_session';
exports.SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE / 1000;
