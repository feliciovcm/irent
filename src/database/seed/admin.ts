// Seed to create an admin user

import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import CreateConnection from '../index';

async function create() {
  const connection = await CreateConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_license )
      values('${id}', 'admin', 'admin@irent.com', '${password}', true, 'now()', 'xxx-xxxx')
    `
  );

  await connection.close();
}

create().then(() => console.log('admin user successfully created'));
