import SuperJSON, { type SuperJSONResult } from 'superjson';

export function superjsonStringify(data: any) {
	return SuperJSON.stringify(data);
}

export function superjsonDeserialize<T>(data: AppSuperJsonResult<T>): T {
	return SuperJSON.deserialize(data);
}

export type AppSuperJsonResult<T> = SuperJSONResult & Pick<SuperJSONResult, 'meta'> & { json: T };
