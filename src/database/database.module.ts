import { Global, Module } from '@nestjs/common';
import knex from 'knex';
import { Model } from 'objection';
import * as knexConfig from '../../knexfile';
import { DATABASE_TOKEN } from './database.token';
import {} from './models';

const providers = [
  {
    provide: DATABASE_TOKEN.KnexConnection,
    useFactory: async () => {
      const knexClient = await knexConfig;
      const dbConnection = knex(knexClient);

      /*
       * @description: Initialize Knex instance -
       * giving objection access to db connection
       */
      Model.knex(dbConnection);

      // return an instance of knex db connection
      return dbConnection;
    },
  },
];

@Global()
@Module({
  providers,
  imports: [],
  exports: [],
})
export class DatabaseModule {}
