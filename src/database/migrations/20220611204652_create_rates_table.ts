import { Knex } from 'knex';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DatabaseTable.rates, (tableBuilder) => {
    tableBuilder.uuid('id').unique().notNullable();
    tableBuilder.string('crypto_name').nullable();
    tableBuilder.string('buy_rate').nullable();
    tableBuilder.string('sell_rate').nullable();
    tableBuilder.string('date').nullable();
    tableBuilder.datetime('deleted_at');
    tableBuilder.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DatabaseTable.rates);
}
