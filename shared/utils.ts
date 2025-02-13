import { STATIC_JS_PATH, type AppPage, STATIC_IMAGE_PATH } from './constants';
import { env } from './env';

export function getPageScript(page: AppPage) {
	return `${env.server.HOST_URL}/${STATIC_JS_PATH}/${page}.js`;
}

export function getImagePath(image: string) {
	return `${env.server.HOST_URL}/${STATIC_IMAGE_PATH}/${image}`;
}
