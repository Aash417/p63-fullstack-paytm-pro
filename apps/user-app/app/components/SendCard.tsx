'use client';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Center } from '@repo/ui/center';
import { TextInput } from '@repo/ui/textinput';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { p2pTransfer } from '../lib/actions/p2pTransfer';

export function SendCard() {
	const [number, setNumber] = useState(0);
	const [amount, setAmount] = useState(0);

	async function handleSendMoney() {
		const result = await p2pTransfer(number, Number(amount) * 100);
		if (result.status) toast.success('Transfer successfull');
		else toast.error('Transfer failed');
	}

	return (
		<div className='h-[90vh]'>
			<Center>
				<Card title='Send'>
					<div className='pt-2 min-w-72'>
						<TextInput
							placeholder={'Number'}
							label='Number'
							onChange={(value) => {
								setNumber(value);
							}}
						/>
						<TextInput
							placeholder={'Amount'}
							label='Amount'
							onChange={(value) => {
								setAmount(value);
							}}
						/>
						<div className='flex justify-center pt-4'>
							<Button onClick={handleSendMoney}>Send</Button>
						</div>
					</div>
				</Card>
			</Center>
		</div>
	);
}
