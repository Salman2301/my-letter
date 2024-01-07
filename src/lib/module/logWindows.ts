
export class LogToWindow {
  key: string | undefined;
  constructor(key: string) {
    if (typeof window === "undefined") return;
    this.key = key;    
  }

  log(message: string | object) {
    if (typeof window === "undefined") return;

    // @ts-expect-error global window does not have log property
    if (typeof window.log === "undefined") window.log = {};

    // @ts-expect-error global window does not have log property
    window.log[this.key] = message
  }
}
