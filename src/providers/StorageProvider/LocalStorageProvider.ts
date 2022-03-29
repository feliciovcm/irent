import fs from 'fs';
import { resolve } from 'path';

import upload from '../../config/upload';
import { IStorageProvider } from './IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  /**
   * Descrição do método:
   * recebe o nome do file, e o nome da pasta a ser salva dentro de tmp
   * o promises.rename irá tirar da pasta 1 e salvar na pasta 2
   */

  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  /**
   * Descrição do método:
   * Deleção do  file, irá receber o nome do file e verificar se ele existe na pasta do caminho passado no resolve.
   * Se sim, faz um unlink (deleção)
   */
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
