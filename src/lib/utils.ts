import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId(existingIds: string[]) {
  let id = Math.random().toString().substring(2);
  while (existingIds.includes(id)) {
    id = Math.random().toString().substring(2);
  }

  return id;
}

export function noop() {}
