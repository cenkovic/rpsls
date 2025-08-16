import request from 'supertest';
import { app } from './main';

describe('Express App Endpoints', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should return a 200 response for the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello API' });
  });

  it('should return a 200 response for the /choices endpoint', async () => {
    const response = await request(app).get('/choices');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true); // Expect the response to be an array of choices
  });

  it('should return a 200 response for the /choice endpoint', async () => {
    const response = await request(app).get('/choice');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
  });

  it('should return a 400 response for invalid input on /play endpoint', async () => {
    const response = await request(app).post('/play').send({ player: 999 }); // Invalid player choice
    expect(response.status).toBe(400);
  });

  it('should return a 200 response for valid input on /play endpoint', async () => {
    const response = await request(app).post('/play').send({ player: 1 }); // Valid player choice
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('results');
    expect(response.body).toHaveProperty('player', 1);
    expect(response.body).toHaveProperty('computer');
  });
});
