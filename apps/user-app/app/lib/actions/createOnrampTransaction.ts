'use server';

import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

export async function createOnrampTransaction(amount: number, provider: string) {
	const session = await getServerSession(authOptions);
	const userId = session.user.id;
	// Idealy token should come from bank , since we dont have a bank we will mimic the token ourselves
	const token = Math.random().toString();

	if (!userId) {
		return { msg: 'user is not logged in' };
	}
	await db.onRampTransaction.create({
		data: {
			userId: Number(userId),
			amount,
			status: 'Processing',
			startTime: new Date(),
			provider,
			token: token,
		},
	});
}
