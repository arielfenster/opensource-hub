export type SelectItem<TValue = string> = {
	label: string;
	value: TValue;
};

export type Items<TValue> = SelectItem<TValue>[] | Record<string, any>;
