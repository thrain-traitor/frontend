import { PrismaClient } from "@prisma/client";

/**
 * Ini adalah halaman untuk koneksi database
 * dengan prisma
 */
const prisma = new PrismaClient();

export default prisma;
