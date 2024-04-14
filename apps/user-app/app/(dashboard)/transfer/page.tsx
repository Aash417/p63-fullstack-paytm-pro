import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { AddMoney } from '../../components/AddMoneyCard';
import { BalanceCard } from '../../components/BalanceCard';
import { OnRampTransactions } from '../../components/OnRampTransactions';
import { authOptions } from '../../lib/auth';

async function getBalance() {
	const session = await getServerSession(authOptions);
	// console.log('session :', session);

	const balance = await prisma.balance.findFirst({
		where: {
			userId: Number(session?.user?.id),
		},
	});
	// console.log('balance :', balance);
	// console.log(`amount: ${balance?.amount} ,locked: ${balance?.locked} `);

	return {
		amount: balance?.amount || 0,
		locked: balance?.locked || 0,
	};
}

async function getOnRampTransactions() {
	const session = await getServerSession(authOptions);
	// console.log('session :', session);

	const txns = await prisma.onRampTransaction.findMany({
		where: {
			userId: Number(session?.user?.id),
		},
	});
	// console.log('txns :', txns);

	return txns.map((t) => ({
		time: t.startTime,
		amount: t.amount,
		status: t.status,
		provider: t.provider,
	}));
}

export default async function () {
	const balance = await getBalance();
	console.log('balance :', balance);
	const transactions = await getOnRampTransactions();
	console.log('transactions :', transactions);

	return (
		<div className='w-screen'>
			<div className='text-4xl text-[#6a51a6] pt-8 mb-8 font-bold'>Transfer</div>
			<div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
				<div>
					<AddMoney />
				</div>
				<div>
					<BalanceCard amount={balance.amount} locked={balance.locked} />
					<div className='pt-4'>
						<OnRampTransactions transactions={transactions} />
					</div>
				</div>
			</div>
		</div>
	);
}
