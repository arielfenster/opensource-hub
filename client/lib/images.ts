import { STATIC_IMAGE_DIR_PATH } from '$/shared/constants';

export function getImagePath(image: string) {
	return `${import.meta.env.VITE_HOST_URL}/${STATIC_IMAGE_DIR_PATH}/${image}`;
}
