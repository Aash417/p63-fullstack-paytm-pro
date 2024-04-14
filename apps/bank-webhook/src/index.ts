import db from '@repo/db/client';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.post('/bankWebhook', async (req: Request, res: Response) => {
	//TODO: Add zod validation here?
	//TODO: HDFC bank should ideally send us a secret so we know this is sent by them
	const paymentInformation: {
		token: string;
		userId: string;
		amount: string;
	} = {
		token: req.body.token,
		userId: req.body.user_identifier,
		amount: req.body.amount,
	};

	try {
		const balance = await db.onRampTransaction.findFirst({
			where: { token: paymentInformation.token },
			select: { status: true },
		});
		if (!balance || balance.status !== 'Processing')
			return res.status(403).json({ message: 'This request can not be processed as the transaction has been already completed.' });

		await db.$transaction([
			db.onRampTransaction.updateMany({
				where: { token: paymentInformation.token },
				data: { status: 'Success' },
			}),

			db.balance.updateMany({
				where: { userId: Number(paymentInformation.userId) },
				data: { amount: { increment: Number(paymentInformation.amount) } },
			}),
		]);

		res.json({ message: 'Successfully made the payment' });
	} catch (e) {
		console.error(e);
		res.status(411).json({ message: 'Error while processing webhook' });
	}
});

app.get('/', (req, res) => {
	console.log('in');
	res.json({ msg: 'working' });
});

app.listen(3003, () => console.log('running on 3003'));
