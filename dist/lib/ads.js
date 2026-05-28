"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAds = getAllAds;
exports.getAdsByPlacement = getAdsByPlacement;
exports.getAdById = getAdById;
exports.addAd = addAd;
exports.toggleAd = toggleAd;
exports.deleteAd = deleteAd;
exports.recordImpression = recordImpression;
exports.recordClick = recordClick;
const prisma_1 = require("./prisma");
async function getAllAds() {
    return await prisma_1.prisma.ad.findMany({ orderBy: { createdAt: 'desc' } });
}
async function getAdsByPlacement(placement) {
    return await prisma_1.prisma.ad.findMany({ where: { placement, active: true } });
}
async function getAdById(id) {
    return await prisma_1.prisma.ad.findUnique({ where: { id } });
}
async function addAd(data) {
    return await prisma_1.prisma.ad.create({
        data: {
            imageUrl: data.imageUrl,
            linkUrl: data.linkUrl,
            placement: data.placement,
            label: data.label || 'Advertisement',
            active: true,
            clicks: 0,
            impressions: 0
        }
    });
}
async function toggleAd(id) {
    const ad = await prisma_1.prisma.ad.findUnique({ where: { id } });
    if (!ad)
        return null;
    return await prisma_1.prisma.ad.update({
        where: { id },
        data: { active: !ad.active }
    });
}
async function deleteAd(id) {
    try {
        await prisma_1.prisma.ad.delete({ where: { id } });
        return true;
    }
    catch (_a) {
        return false;
    }
}
async function recordImpression(id) {
    await prisma_1.prisma.ad.update({
        where: { id },
        data: { impressions: { increment: 1 } }
    }).catch(() => { });
}
async function recordClick(id) {
    await prisma_1.prisma.ad.update({
        where: { id },
        data: { clicks: { increment: 1 } }
    }).catch(() => { });
}
