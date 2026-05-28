"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUser = getAuthUser;
exports.errorResponse = errorResponse;
exports.successResponse = successResponse;
const server_1 = require("next/server");
const prisma_1 = require("./prisma");
const sessions_1 = require("./sessions");
async function getAuthUser(req) {
    var _a;
    const token = (_a = req.cookies.get(sessions_1.SESSION_COOKIE_NAME)) === null || _a === void 0 ? void 0 : _a.value;
    if (!token)
        return null;
    const session = await prisma_1.prisma.session.findUnique({ where: { token } });
    if (!session || session.expiresAt < new Date())
        return null;
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: session.userId },
        include: { favoriteGames: { select: { id: true } } }
    });
    if (!user)
        return null;
    const { passwordHash: _ } = user, rest = __rest(user, ["passwordHash"]);
    const publicUser = Object.assign(Object.assign({}, rest), { role: user.role, favoriteGames: user.favoriteGames.map(g => g.id), createdAt: user.createdAt.toISOString() });
    return publicUser;
}
function errorResponse(message, status = 400) {
    return server_1.NextResponse.json({ error: message }, { status });
}
function successResponse(data) {
    return server_1.NextResponse.json(data);
}
