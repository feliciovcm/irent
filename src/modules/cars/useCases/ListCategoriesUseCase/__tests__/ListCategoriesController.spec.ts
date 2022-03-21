import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '../../../../../app';
import CreateConnection from '../../../../../database';

let connection: Connection;

describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await CreateConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_license )
      values('${id}', 'admin', 'admin@irent.com', '${password}', true, 'now()', 'xxx-xxxx')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/login').send({
      email: 'admin@irent.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'supertest-mock-name',
        description: 'supertest-mock-description'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
