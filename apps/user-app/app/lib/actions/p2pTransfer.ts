'use server';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

export async function p2pTransfer(to: number, amount: number) {
	const session = await getServerSession(authOptions);
	try {
		const sender = session.user.id;
		if (!sender) return { msg: 'login to transfer money' };

		const receiver = await prisma.user.findFirst({ where: { number: String(to) } });

		if (!receiver) return { msg: 'user not found' };
		const trx = await prisma.$transaction(async (db) => {
			const senderBalance = await db.balance.findUnique({
				where: { userId: Number(sender) },
			});

			if (!senderBalance || senderBalance.amount < amount)
				return { msg: 'Insufficient balance ' };

			await db.balance.update({
				where: { userId: receiver.id },
				data: { amount: { increment: amount } },
			});

			await db.balance.update({
				where: { userId: Number(sender) },
				data: { amount: { decrement: amount } },
			});
		});
		return { msg: 'Transaction successful', status: true };
		// console.log(`result ${trx}`);
	} catch (error) {
		console.log('transaction failed : ', error);
		return { msg: 'Transaction failed', status: false };
	}
}
