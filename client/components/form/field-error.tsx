export type FieldErrorProps = {
	error?: string;
};

export function FieldError({ error }: FieldErrorProps) {
	return <p className='mt-1 text-sm text-red-600'>{error}</p>;
}
