// A local storage system with exp time and flush mode
import lscache from "lscache";

export const STORAGE_BUCKET_IMAGE_SIGNED_URL = "STORAGE_BUCKET_IMAGE_SIGNED_URL";

export function flushAllSignedUrl() {
  lscache.setBucket(STORAGE_BUCKET_IMAGE_SIGNED_URL)
  lscache.flush();
}

export function getSignedUrL(fileLocation: string) {
  lscache.setBucket(STORAGE_BUCKET_IMAGE_SIGNED_URL);
  return lscache.get(fileLocation);
}

export function setSignedUrl(fileLocation: string, value: string, expTimeInSec?: number ) {
  lscache.setBucket(STORAGE_BUCKET_IMAGE_SIGNED_URL);
  if (typeof expTimeInSec !== "number") expTimeInSec = 0; 
  return lscache.set(fileLocation, value, expTimeInSec / 60);
}