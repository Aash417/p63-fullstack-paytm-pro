export function Card({
	title,
	children,
}: {
	title: string;
	children?: React.ReactNode;
}): JSX.Element {
	return (
		<div className='border p-6 bg-white rounded-xl bg-[#ededed]'>
			<h1 className='pb-2 text-xl border-b'>{title}</h1>
			<p>{children}</p>
		</div>
	);
}
