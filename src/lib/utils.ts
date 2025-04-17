import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  const protocol = window.location.protocol; // e.g., "http:" or "https:"
  const host = window.location.host; // e.g., "localhost:3000" or "example.com"
  return `${protocol}//${host}`;
}
