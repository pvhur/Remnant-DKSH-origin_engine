import { PrismaClient } from '@prisma/client';

// Prisma Client 인스턴스 생성
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// 애플리케이션 종료 시 Prisma 연결 종료
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;

