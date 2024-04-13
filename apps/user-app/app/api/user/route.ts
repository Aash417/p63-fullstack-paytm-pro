import { PrismaClient } from '@repo/db/client';
import { NextResponse } from 'next/server';
const client = new PrismaClient();

export const GET = async () => {
	await client.user.create({
		data: {
			email: 'one',
			name: 'one',
			number: 'one',
			password: 'one',
		},
	});

	return NextResponse.json({
		msg: 'Created entry in db.',
	});
};
