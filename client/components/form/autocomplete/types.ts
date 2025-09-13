export type OptionData = { value: string };
export type Option<TData extends OptionData = OptionData> = TData;

export type RenderOptionFn<TData extends OptionData = OptionData> = (
	option: Option<TData>,
) => React.ReactNode;
