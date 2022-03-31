import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// interface IOptions {
//   host: string;
// }

// Simple way to create a connection when there is no seed
//
// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions;
//   newOptions.host = 'database';
//   createConnection({
//     ...options
//   });
// });

// Rodar local, passar na função abaixo, parametro( host = 'database')
// e dentro do object.assign (host: process.env.NODE_ENV === 'test' ? 'localhost' : host,)

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test' ? 'irent_test' : defaultOptions.database
    })
  );
};
