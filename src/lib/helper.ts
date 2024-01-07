import { env } from '$env/dynamic/public';
import { asString } from '$lib/module/formatDate';
import { supabase } from './supabase';

export function genId(len?: number): string {
	if (typeof len !== 'number') len = 6;
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let result = '';

	for (let i = 0; i < len; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result;
}

export function sleep(ms: number) {
	const MAX_SLEEP = 20_000;
	if (typeof ms !== 'number') ms = 500;
	return new Promise((res, rej) => {
		setTimeout(res, ms);
		setTimeout(rej, MAX_SLEEP);
	});
}

export function formatDate(date: Date | string | number, format?: string) {
	if (!(date instanceof Date)) date = new Date(date ?? null);
	if (!format) format = 'dd/MM/yyyy';

	return asString(format, date);
}

type Bucket = 'profile_photo' | 'contact_photo';

export async function returnPhotoBlob(bucket: Bucket, fileLocation: string): Promise<string> {
	return new Promise(async (res, rej) => {
		setTimeout(rej, 20_000);
		const { data: blob, error } = await supabase.storage.from(bucket).download(fileLocation);

		if (!error && blob) {
			const reader = new FileReader();
			reader.onloadend = function () {
				const dataUrl = reader.result;
				res(dataUrl as string);
			};
			reader.readAsDataURL(blob);
		}
	});
}

type StorageBucket =
	| 'letter_audio'
	| 'profile_photo'
	| 'Public'
	| 'contact_phot'
	| 'template_background';
export function publicFile(bucketName: StorageBucket, fileLocation: string) {
	return `${env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${fileLocation}`;
}

export function deepCopyObj<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}
