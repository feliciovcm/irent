import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '../../../../../app';
import CreateConnection from '../../../../../database';

let connection: Connection;

describe('Create Category Controller', () => {
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

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/login').send({
      email: 'admin@irent.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'supertest-mock-name',
        description: 'supertest-mock-description'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category if name exists', async () => {
    const responseToken = await request(app).post('/login').send({
      email: 'admin@irent.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'supertest-mock-name',
        description: 'supertest-mock-description'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(400);
  });
});
