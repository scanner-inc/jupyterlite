// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import type localforage from 'localforage';

import memoryStorageDriver from 'localforage-memoryStorageDriver';
import scnrStorageDriver from 'localforage-scnrStorageDriver';

/**
 * Ensure a localforage singleton has had the memory storage driver installed
 */
export async function ensureMemoryStorage(
  theLocalforage: typeof localforage,
): Promise<void> {
  return await theLocalforage.defineDriver(memoryStorageDriver);
}

/**
 * Ensure a localforage singleton has had the scnr storage driver installed
 */
export async function ensureScnrStorage(
  theLocalforage: typeof localforage,
): Promise<void> {
  return await theLocalforage.defineDriver(scnrStorageDriver);
}
