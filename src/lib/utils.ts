import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId(existingIds: string[]) {
  let id;
  do {
    id = `id_${Math.random().toString(36).substring(2, 9)}`;
  } while (existingIds.includes(id));
  return id;
}

export function noop() {}
