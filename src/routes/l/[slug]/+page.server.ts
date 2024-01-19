import { supabase } from '$lib/module/supabase.js';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	if (!params.slug) {
		return redirect(301, "/app/my-letter");
	}

	const res = await supabase.from("letter").select("*").eq("slug", params.slug);
	
	if (res.error) {
		console.error(res.error);
		return error(500, "Failed to fetch the letter.");
	}

	if (res.data.length == 0) return redirect(301, "/app/my-letter?alert=error&message=no_letter");

	return res.data[0];
}