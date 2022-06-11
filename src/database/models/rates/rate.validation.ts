import { JSONSchema } from 'objection';

export const RateValidation: JSONSchema = {
  type: 'object',
  title: 'Rate Schema Validation',
  required: ['crypto_name', 'buy_rate', 'sell_rate', 'date'],
  properties: {
    crypto_name: { type: 'string' },
    buy_rate: {
      type: 'string',
    },
    sell_rate: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
  },
};
