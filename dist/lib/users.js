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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUserById = getUserById;
exports.getAllPublicUsers = getAllPublicUsers;
exports.getUserByDisplayName = getUserByDisplayName;
exports.isAdmin = isAdmin;
exports.isOwner = isOwner;
exports.isModerator = isModerator;
exports.updateUserAvatar = updateUserAvatar;
exports.updateUserBanner = updateUserBanner;
exports.updateUserProfile = updateUserProfile;
exports.updateUserBio = updateUserBio;
exports.addFavoriteGame = addFavoriteGame;
exports.removeFavoriteGame = removeFavoriteGame;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const USERS_FILE = path_1.default.join(process.cwd(), 'data', 'users.json');
const OWNER_EMAILS = [
    'dahiruhammajam@gmail.com',
];
const MODERATOR_EMAILS = [];
let usersCache = null;
function ensureDataDir() {
    const dir = path_1.default.dirname(USERS_FILE);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
function migrateUser(u) {
    var _a, _b, _c, _d, _e;
    return Object.assign(Object.assign({}, u), { aboutMe: (_a = u.aboutMe) !== null && _a !== void 0 ? _a : '', workingOn: (_b = u.workingOn) !== null && _b !== void 0 ? _b : '', country: (_c = u.country) !== null && _c !== void 0 ? _c : '', favoriteGames: (_d = u.favoriteGames) !== null && _d !== void 0 ? _d : [], bannerUrl: (_e = u.bannerUrl) !== null && _e !== void 0 ? _e : '' });
}
function readUsers() {
    if (usersCache)
        return usersCache;
    ensureDataDir();
    try {
        if (fs_1.default.existsSync(USERS_FILE)) {
            const raw = JSON.parse(fs_1.default.readFileSync(USERS_FILE, 'utf-8'));
            usersCache = raw.map(u => migrateUser(u));
        }
        else {
            usersCache = [];
            fs_1.default.writeFileSync(USERS_FILE, '[]', 'utf-8');
        }
    }
    catch (_a) {
        usersCache = [];
    }
    return usersCache;
}
function writeUsers(data) {
    ensureDataDir();
    usersCache = data;
    fs_1.default.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
function isOwnerEmail(email) {
    return OWNER_EMAILS.includes(email.toLowerCase().trim());
}
function isModeratorEmail(email) {
    return MODERATOR_EMAILS.includes(email.toLowerCase().trim());
}
function toPublic(user) {
    const { passwordHash: _ } = user, pub = __rest(user, ["passwordHash"]);
    return pub;
}
function registerUser(email, password, displayName) {
    const users = readUsers();
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || !password || !displayName.trim()) {
        return { error: 'All fields are required.' };
    }
    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters.' };
    }
    if (users.find(u => u.email === normalizedEmail)) {
        return { error: 'An account with this email already exists.' };
    }
    const salt = bcryptjs_1.default.genSaltSync(10);
    const passwordHash = bcryptjs_1.default.hashSync(password, salt);
    const user = {
        id: crypto_1.default.randomBytes(16).toString('hex'),
        email: normalizedEmail,
        displayName: displayName.trim(),
        passwordHash,
        role: isOwnerEmail(normalizedEmail) ? 'owner' : isModeratorEmail(normalizedEmail) ? 'moderator' : 'user',
        avatarUrl: '',
        bannerUrl: '',
        createdAt: new Date().toISOString(),
        aboutMe: '',
        workingOn: '',
        country: '',
        favoriteGames: [],
    };
    users.push(user);
    writeUsers(users);
    return { user: toPublic(user) };
}
function loginUser(email, password) {
    const users = readUsers();
    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find(u => u.email === normalizedEmail);
    if (!user) {
        return { error: 'Invalid email or password.' };
    }
    if (!bcryptjs_1.default.compareSync(password, user.passwordHash)) {
        return { error: 'Invalid email or password.' };
    }
    // Sync roles from whitelist on every login
    const shouldBeOwner = isOwnerEmail(normalizedEmail);
    const shouldBeModerator = isModeratorEmail(normalizedEmail);
    if (shouldBeOwner && user.role !== 'owner') {
        user.role = 'owner';
        writeUsers(users);
    }
    else if (!shouldBeOwner && shouldBeModerator && user.role !== 'moderator') {
        user.role = 'moderator';
        writeUsers(users);
    }
    else if (!shouldBeOwner && !shouldBeModerator && user.role !== 'user') {
        user.role = 'user';
        writeUsers(users);
    }
    return { user: toPublic(user) };
}
function getUserById(id) {
    const users = readUsers();
    const user = users.find(u => u.id === id);
    if (!user)
        return undefined;
    const normalizedEmail = user.email.toLowerCase().trim();
    const shouldBeOwner = isOwnerEmail(normalizedEmail);
    const shouldBeModerator = isModeratorEmail(normalizedEmail);
    let roleChanged = false;
    if (shouldBeOwner && user.role !== 'owner') {
        user.role = 'owner';
        roleChanged = true;
    }
    else if (shouldBeModerator && !shouldBeOwner && user.role !== 'moderator') {
        user.role = 'moderator';
        roleChanged = true;
    }
    else if (!shouldBeOwner && !shouldBeModerator && user.role !== 'user') {
        user.role = 'user';
        roleChanged = true;
    }
    if (roleChanged) {
        writeUsers(users);
    }
    return toPublic(user);
}
function getAllPublicUsers() {
    return readUsers().map(toPublic);
}
function getUserByDisplayName(name) {
    const lower = name.toLowerCase().trim();
    const user = readUsers().find(u => u.displayName.toLowerCase() === lower);
    return user ? toPublic(user) : undefined;
}
function isAdmin(userId) {
    const user = readUsers().find(u => u.id === userId);
    if (!user)
        return false;
    return isOwnerEmail(user.email) || isModeratorEmail(user.email);
}
function isOwner(userId) {
    const user = readUsers().find(u => u.id === userId);
    if (!user)
        return false;
    return isOwnerEmail(user.email);
}
function isModerator(userId) {
    const user = readUsers().find(u => u.id === userId);
    if (!user)
        return false;
    return isModeratorEmail(user.email);
}
function updateUserAvatar(userId, avatarUrl) {
    const users = readUsers();
    const user = users.find(u => u.id === userId);
    if (!user)
        return null;
    user.avatarUrl = avatarUrl;
    writeUsers(users);
    return toPublic(user);
}
function updateUserBanner(userId, bannerUrl) {
    const users = readUsers();
    const user = users.find(u => u.id === userId);
    if (!user)
        return null;
    user.bannerUrl = bannerUrl;
    writeUsers(users);
    return toPublic(user);
}
function updateUserProfile(userId, updates) {
    const users = readUsers();
    const user = users.find(u => u.id === userId);
    if (!user)
        return null;
    if (updates.displayName)
        user.displayName = updates.displayName.trim();
    writeUsers(users);
    return toPublic(user);
}
function updateUserBio(userId, updates) {
    const users = readUsers();
    const user = users.find(u => u.id === userId);
    if (!user)
        return null;
    if (updates.aboutMe !== undefined)
        user.aboutMe = updates.aboutMe.slice(0, 500);
    if (updates.workingOn !== undefined)
        user.workingOn = updates.workingOn.slice(0, 500);
    if (updates.country !== undefined)
        user.country = updates.country.slice(0, 60);
    writeUsers(users);
    return toPublic(user);
}
function addFavoriteGame(userId, gameId) {
    const users = readUsers();
    const user = users.find(u => u.id === userId);
    if (!user)
        return null;
    if (!user.favoriteGames.includes(gameId)) {
        user.favoriteGames.push(gameId);
        writeUsers(users);
    }
    return toPublic(user);
}
function removeFavoriteGame(userId, gameId) {
    const users = readUsers();
    const user = users.find(u => u.id === userId);
    if (!user)
        return null;
    user.favoriteGames = user.favoriteGames.filter(id => id !== gameId);
    writeUsers(users);
    return toPublic(user);
}
