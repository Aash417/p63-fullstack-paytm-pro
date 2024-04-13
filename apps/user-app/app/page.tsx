import { Button } from '@repo/ui/button';
import styles from './page.module.css';


export default function Page(): JSX.Element {
	return (
		<Button appName='web' className={`${styles.button} text-5xl`}>
			Click me!
		</Button>
	);
}
