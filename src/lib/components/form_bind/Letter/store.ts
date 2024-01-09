import bodyInit from "../../template/body";

import { get, writable } from 'svelte/store';
import { deepCopyObj } from '$lib/helper';
import { userSession } from '$lib/supabase';
import { templateList } from '$lib/components/template';

import type { Writable } from 'svelte/store';
import type { TemplateConfig } from '$lib/components/template/types';
import type { Tables } from '$lib/database.types';
import { LogToWindow } from "$lib/module/logWindows";


type LetterWithNoTemplate = Partial<Omit<Tables<"letter">, "template_config">>;
export interface LetterObj extends LetterWithNoTemplate {
  template_config: TemplateConfig;
}


const initTemplate = deepCopyObj(templateList["margin"]);


export const initNewLetterObj: LetterObj = {
  _owner: get(userSession)?.user.id as string,
  anonymous: false,
  body: bodyInit,
  contact: null,
  folder: "root",
  is_password_protected: false,
  is_publish: false,
  paid: false,
  password_hash: null,
  public_link: "",
  read: false,
  read_only_once: false,
  alert_via_email: true,
  alert_via_phone: true,
  template_config: initTemplate,
  verify_reader: true,
  title: "",
  trigger_date: null,
  trigger_link: "",
  trigger_method: "publish",
  is_fav: false,
  version: "0.0.1"
}

export const letterObj: Writable<LetterObj> = writable(deepCopyObj(initNewLetterObj));



const newLog = new LogToWindow('letter_obj');

letterObj.subscribe(($letterObj) => {
  newLog.log($letterObj);
});
