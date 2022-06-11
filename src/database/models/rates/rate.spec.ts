import { Model } from 'objection';
import { BaseModel } from '../base';
import { RateModel } from './rate.service';

describe('RateModel', () => {
  describe('User DB Model', () => {
    it('should return be define', () => {
      expect(RateModel).toBeDefined();
    });

    it('should extend Objection Model class', () => {
      expect(RateModel.prototype).toBeInstanceOf(Model);
    });

    it('should extend the BaseModel class', () => {
      expect(RateModel.prototype).toBeInstanceOf(BaseModel);
    });

    it('should have a table name', () => {
      expect(RateModel.tableName).toBe('account-service.users');
    });

    it('should have a json schema', () => {
      expect(RateModel.jsonSchema).toBeDefined();
    });
  });
});
