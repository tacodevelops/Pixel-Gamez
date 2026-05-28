"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = getNotifications;
exports.addNotification = addNotification;
exports.deleteNotification = deleteNotification;
const prisma_1 = require("./prisma");
async function getNotifications() {
    return await prisma_1.prisma.notification.findMany({
        orderBy: { createdAt: 'desc' }
    });
}
async function addNotification(title, message) {
    return await prisma_1.prisma.notification.create({
        data: { title, message }
    });
}
async function deleteNotification(id) {
    await prisma_1.prisma.notification.delete({ where: { id } }).catch(() => { });
}
