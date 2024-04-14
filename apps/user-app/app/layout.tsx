import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from './Provider';
import { AppbarClient } from './components/AppbarClient';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Wallet',
	description: 'Simple wallet app',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang='en'>
			<Providers>
				<body className={inter.className}>
					<AppbarClient />
					<Toaster />
					{children}
				</body>
			</Providers>
		</html>
	);
}
