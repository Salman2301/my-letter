import { writable } from "svelte/store";
import { blankTemplate } from "$lib/components/template";

import type { Writable } from "svelte/store";
import type { TemplateConfig } from "$lib/components/template/types";

export const templateConfig: Writable<TemplateConfig> = writable(blankTemplate);


export const CONTEXT_LAYOUT_TEMPLATE_CONFIG = "LAYOUT_TEMPLATE_CONFIG";
