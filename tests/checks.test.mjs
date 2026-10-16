import { describe, it, expect } from '@jest/globals';

import app from '../backend/server.mjs';

describe('User Management', () => {
  it('should create a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: { name: 'John Doe', email: 'john.doe@example.com' }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual({ name: 'John Doe', email: 'john.doe@example.com' });
  });

  it('should get all users', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/users'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().length).toBe(1);
  });
});

describe('Loan Management', () => {
  it('should create a new loan', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/loans',
      payload: { amount: 1000, term: 12 }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual({ amount: 1000, term: 12 });
  });

  it('should get all loans', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/loans'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().length).toBe(1);
  });
});