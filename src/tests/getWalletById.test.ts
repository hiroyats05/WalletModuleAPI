import request from 'supertest';
import app from '../core/server';
import { walletService } from '../services/wallet.services';

describe('GET /api/wallet/:id', () => {
  beforeEach(() => {
    (walletService as any).wallets.clear();
  });

  test('returns wallet when exists and 404 when not', async () => {
    await request(app).post('/api/wallet').send({ id: 'w3', balance: 77, bank: 'BankC' });
    const ok = await request(app).get('/api/wallet/w3');
    expect(ok.status).toBe(200);
    expect(ok.body.id).toBe('w3');

    const notFound = await request(app).get('/api/wallet/nope');
    expect(notFound.status).toBe(404);
  });
});