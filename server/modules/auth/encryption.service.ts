import { env } from '$/shared/env';
import { createCipheriv, type CipherGCMTypes } from 'crypto';

class EncryptionService {
	private encryptionKey: Buffer;
	private encryptionIV: Buffer;
	private encryptionAlgorithm: string;

	constructor(encryptionKey: string, encryptionIV: string) {
		this.encryptionKey = Buffer.from(encryptionKey, 'base64');
		this.encryptionIV = Buffer.from(encryptionIV, 'base64');
		this.encryptionAlgorithm = 'aes-256-gcm' as CipherGCMTypes;
	}

	public encrypt(data: string): string {
		const cipher = createCipheriv(
			this.encryptionAlgorithm,
			this.encryptionKey,
			this.encryptionIV,
		);

		let encrypted = cipher.update(data);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return encrypted.toString('base64');
	}
}

export const encryptionService = new EncryptionService(
	env.AUTH.ENCRYPTION_KEY,
	env.AUTH.ENCRYPTION_IV,
);
