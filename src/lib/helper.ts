import { env } from '$env/dynamic/public';
import { asString } from '$lib/module/formatDate';
import type { Bucket } from './constant';
import { supabase } from './module/supabase';

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

export function formatDate(date?: Date | string | number | null , format?: string) {
	if (!(date instanceof Date)) date = (date || date === 0) ? new Date(date): new Date();
	if (!format) format = 'dd/MM/yyyy';

	return asString(format, date);
}


export async function getSignedImage(bucketName: Bucket, location: string) {
	if (!location) return Promise.reject('No image uploaded');
	// TODO: ADD CACHE FOR CONTACT PHOTO
	const { data, error } = await supabase.storage
		.from(bucketName)
		.createSignedUrl(location, 60);

	if (!data) return Promise.reject('Failed to get the contact image!');
	return data.signedUrl;
}

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

export function styleStr(obj?: Record<string, string | number | null>): string {
	if (!obj) return '';
	return Object.entries(obj)
		.reduce((acc: string[], [key, value]) => {
			if( value !== null && value !== undefined) acc.push(`${key}:${value}`);
			return acc;
		},[])
		.join(';');
}

export function setSafeDate(date: any, returnOnError = new Date()): Date | null {
	try {
		date = new Date(date);
		if (date === 'Invalid Date') throw new Error(`Invalid date : ${date}`);
		return date;
	} catch (err) {
		console.error(`Failed to set date: ${date}`);
		console.error(err);
		return returnOnError;
	}
}

export function isSameObj(obj1: object, obj2: object) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}
