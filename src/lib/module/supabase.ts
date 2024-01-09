import { env } from '$env/dynamic/public';
import { createClient, type AuthChangeEvent, type Session } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

import type { Database } from '../database.types';

export const supabase = createClient<Database>(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_KEY ?? ''
);

export const userSession: Writable<Session | null> = writable(null);

supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
	console.log('auth changed: ', event, session);
	userSession.set(session);
});

export async function getUserId(): Promise<string | null> {
	try {
		const { data, error } = await supabase.auth.refreshSession();
		if (error) throw error;

		const { session, user } = data;
		return user?.id || null;
	} catch (e) {
		console.error('failed to get the current user ');
		console.error(e);
		return null;
	}
}
