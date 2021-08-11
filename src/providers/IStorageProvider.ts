export interface IStorageProvider {
  save(file: string): Promise<void>;
  delete(file: string): Promise<void>;
}
