import { Button } from '@repo/ui/button';
import styles from './page.module.css';

import { PrismaClient } from '@repo/db/client';
const client = new PrismaClient();

export default function Page(): JSX.Element {
	return (
		<Button appName='web' className={`${styles.button} text-5xl`}>
			Click me!
		</Button>
	);
}
