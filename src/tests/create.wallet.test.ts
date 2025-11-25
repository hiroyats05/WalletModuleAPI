import request from 'supertest';
import app from '../core/server';
import { walletService } from '../services/wallet.services';

describe('POST /api/wallet', () => {
  beforeEach(() => {
    (walletService as any).wallets.clear();
  });

  test('creates a wallet and returns 201 with data', async () => {
    const payload = { id: 'w1', balance: 100, bank: 'BankA' };
    const res = await request(app).post('/api/wallet').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toMatchObject(payload);
  });
});