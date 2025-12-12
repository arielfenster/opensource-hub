import * as v from 'valibot';

const MAX_FILE_SIZE = 2 * 1_000_000;
const IMAGE_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'] as const;

export const imageSchema = v.pipe(
	v.file(),
	v.maxSize(MAX_FILE_SIZE, 'Max image size is 2MB'),
	v.mimeType(IMAGE_FILE_TYPES),
);
