import { writable } from 'svelte/store';
import { blankTemplate, templateList } from '$lib/components/template';

import type { Writable } from 'svelte/store';
import type { TemplateConfig } from '$lib/components/template/types';

const initTemplate =  templateList["margin"] ;//blankTemplate;
export const templateConfig: Writable<TemplateConfig> = writable(initTemplate);

export const CONTEXT_LAYOUT_TEMPLATE_CONFIG = 'LAYOUT_TEMPLATE_CONFIG';
