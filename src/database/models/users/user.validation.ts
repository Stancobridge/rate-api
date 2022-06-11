import { JSONSchema } from 'objection';

export const UserValidation: JSONSchema = {
  type: 'object',
  title: 'User Schema Validation',
  required: ['password', 'phone', 'email'],
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    dob: { type: 'string' },
    password: { type: 'string' },
    phone: { type: 'string' },
    phone_verified: { type: 'boolean' },
    email: { type: 'string' },
    email_verified: { type: 'boolean' },
    bvn: { type: 'string' },
    bvn_verified: { type: 'boolean' },
    is_active: { type: 'boolean' },
    gender: { type: 'string' },
    marital_status: { type: 'string' },
    profile_pics: { type: 'string' },
  },
};
