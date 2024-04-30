declare module 'localforage-memoryStorageDriver' {
  import { LocalForageDriver } from 'localforage';
  const memoryStorageDriver: LocalForageDriver;
  export default memoryStorageDriver;
}

declare module 'localforage-scnrStorageDriver' {
  import { LocalForageDriver } from 'localforage';
  const scnrStorageDriver: LocalForageDriver;
  export default scnrStorageDriver;
}
