"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubmissions = getAllSubmissions;
exports.getApprovedSubmissions = getApprovedSubmissions;
exports.getPendingSubmissions = getPendingSubmissions;
exports.getSubmissionsByUser = getSubmissionsByUser;
exports.getSubmissionById = getSubmissionById;
exports.addSubmission = addSubmission;
exports.approveSubmission = approveSubmission;
exports.rejectSubmission = rejectSubmission;
const prisma_1 = require("./prisma");
async function getAllSubmissions() {
    return await prisma_1.prisma.submission.findMany();
}
async function getApprovedSubmissions() {
    return await prisma_1.prisma.submission.findMany({ where: { status: 'approved' } });
}
async function getPendingSubmissions() {
    return await prisma_1.prisma.submission.findMany({ where: { status: 'pending' } });
}
async function getSubmissionsByUser(userId) {
    return await prisma_1.prisma.submission.findMany({ where: { userId } });
}
async function getSubmissionById(id) {
    return await prisma_1.prisma.submission.findUnique({ where: { id } });
}
async function addSubmission(data) {
    return await prisma_1.prisma.submission.create({
        data: {
            title: data.title,
            description: data.description,
            category: data.category,
            gameType: data.gameType,
            embedUrl: data.embedUrl,
            thumbnail: data.thumbnail || '',
            bannerUrl: data.bannerUrl || null,
            userId: data.userId,
            developerName: data.developerName,
            discordUrl: data.discordUrl || null,
            steamUrl: data.steamUrl || null,
            status: 'pending',
            plays: 0,
            rating: 0,
        }
    });
}
async function approveSubmission(id, adminUserId) {
    try {
        return await prisma_1.prisma.submission.update({
            where: { id },
            data: { status: 'approved', reviewedBy: adminUserId, reviewedAt: new Date() }
        });
    }
    catch (_a) {
        return null;
    }
}
async function rejectSubmission(id, adminUserId) {
    try {
        return await prisma_1.prisma.submission.update({
            where: { id },
            data: { status: 'rejected', reviewedBy: adminUserId, reviewedAt: new Date() }
        });
    }
    catch (_a) {
        return null;
    }
}
