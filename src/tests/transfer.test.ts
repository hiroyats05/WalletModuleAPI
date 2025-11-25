import request from 'supertest';
import app from '../core/server';
import { walletService } from '../services/wallet.services';

describe('POST /api/transfer success', () => {
  beforeEach(() => {
    (walletService as any).wallets.clear();
  });

  test('performs transfer and updates balances', async () => {
    const r1 = await request(app).post('/api/wallet').send({ id: 'from1', balance: 100, bank: 'A' });
    const r2 = await request(app).post('/api/wallet').send({ id: 'to1', balance: 50, bank: 'B' });

    expect(r1.status).toBe(201);
    expect(r2.status).toBe(201);

    const amount = 30;
    const res = await request(app).post('/api/transfer').send({ fromId: 'from1', toId: 'to1', amount });

    if (res.status !== 200) {
      console.log('transfer response body:', res.body);
    }

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.amount).toBe(amount);
    expect(res.body.data.from.balance).toBe(70);
    expect(res.body.data.to.balance).toBe(80);

    const fromGet = await request(app).get('/api/wallet/from1');
    const toGet = await request(app).get('/api/wallet/to1');
    expect(fromGet.status).toBe(200);
    expect(toGet.status).toBe(200);
    expect(fromGet.body.balance).toBe(70);
    expect(toGet.body.balance).toBe(80);
  });
});