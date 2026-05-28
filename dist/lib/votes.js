"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVotes = getVotes;
exports.addVote = addVote;
exports.removeVote = removeVote;
const prisma_1 = require("./prisma");
async function getVotes(gameId) {
    const likes = await prisma_1.prisma.vote.count({ where: { gameId, type: 'like' } });
    const dislikes = await prisma_1.prisma.vote.count({ where: { gameId, type: 'dislike' } });
    return { likes, dislikes };
}
async function addVote(gameId, userId, type) {
    const existing = await prisma_1.prisma.vote.findFirst({
        where: { gameId, userId }
    });
    if (existing) {
        if (existing.type !== type) {
            await prisma_1.prisma.vote.update({ where: { id: existing.id }, data: { type } });
        }
    }
    else {
        await prisma_1.prisma.game.upsert({
            where: { id: gameId },
            update: {},
            create: {
                id: gameId,
                title: gameId,
                description: '',
                category: 'unknown',
                thumbnail: '',
                embedUrl: ''
            }
        });
        await prisma_1.prisma.vote.create({ data: { gameId, userId, type } });
    }
    return getVotes(gameId);
}
async function removeVote(gameId, userId) {
    const existing = await prisma_1.prisma.vote.findFirst({
        where: { gameId, userId }
    });
    if (existing) {
        await prisma_1.prisma.vote.delete({ where: { id: existing.id } });
    }
    return getVotes(gameId);
}
