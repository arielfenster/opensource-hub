import z from 'zod';

export const MAX_FILE_SIZE = 2 * 1_000_000;
export const IMAGE_FILE_TYPES = 'image/png, image/jpg, image/jpeg, image/svg+xml';

export const imageSchema = z
	.file()
	.max(MAX_FILE_SIZE, { error: 'Max image size is 2MB' })
	.mime(IMAGE_FILE_TYPES.split(',').map((type) => type.trim()));
