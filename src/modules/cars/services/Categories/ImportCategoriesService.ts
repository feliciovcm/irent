import { parse as csvParse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../repositories/Categories/CategoriesRepository';

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      // Para realizar leitura de arquivos por partes (chunks), utilizamos a leitura em stream do fs
      // nativo do node, passando o caminho do arquivo

      const categories: IImportCategories[] = [];

      const parseFile = csvParse(); // passamos as options de leitura do arquivo csv como um objeto dentro do csvParse;
      // Como padrão ele ja entende que o delimitador de colunas é uma virgula

      stream.pipe(parseFile); // o pipe pega o pedaço (chunck) lido e passa para dentro do nosso parseFile

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const categoryAlreadyExist = await this.categoriesRepository.findByName(
        name
      );
      if (!categoryAlreadyExist) {
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }
}

export { ImportCategoriesService };
