import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId(existingIds: string[]) {
  let id;
  do {
    id = crypto.randomUUID();
  } while (existingIds.includes(id));
  return id;
}

export function noop() {}

export async function readFile(file: Blob): Promise<string | null> {
  const reader = new FileReader();
  const { promise, resolve } = Promise.withResolvers<string | null>();
  reader.onload = (ev) => {
    if (typeof ev.target?.result === "string") resolve(ev.target.result);
    else resolve(null);
  };
  reader.onerror = () => {
    resolve(null);
  };

  reader.readAsDataURL(file);

  return promise;
}
