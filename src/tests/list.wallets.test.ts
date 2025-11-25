import request from 'supertest';
import app from '../core/server';
import { walletService } from '../services/wallet.services';

describe('GET /api/wallet list', () => {
  beforeEach(() => {
    (walletService as any).wallets.clear();
  });

  test('lists created wallets', async () => {
    await request(app).post('/api/wallet').send({ id: 'w2', balance: 50, bank: 'BankB' });
    const res = await request(app).get('/api/wallet');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const ids = res.body.map((w: any) => w.id);
    expect(ids).toContain('w2');
  });
});