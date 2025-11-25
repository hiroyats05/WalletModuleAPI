import request from 'supertest';
import app from '../core/server';
import { walletService } from '../services/wallet.services';

describe('POST /api/transfer validation', () => {
  beforeEach(() => {
    (walletService as any).wallets.clear();
  });

  test('returns 400 when missing required fields', async () => {
    const res = await request(app).post('/api/transfer').send({});
    expect(res.status).toBe(400);
  });
});