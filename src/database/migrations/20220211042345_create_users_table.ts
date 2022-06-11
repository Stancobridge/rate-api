import { Knex } from 'knex';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  return knex.transaction(async (trx: Knex.Transaction) =>
    trx.schema
      .then(() =>
        trx.schema
          .hasTable(DatabaseTable.users)
          .then((tableExists: boolean) => {
            if (!tableExists) {
              return trx.schema.createTable(
                DatabaseTable.users,
                (tableBuilder: Knex.CreateTableBuilder) => {
                  tableBuilder.increments();
                  tableBuilder.string('first_name').nullable();
                  tableBuilder.string('last_name').nullable();
                  tableBuilder.string('profile_pics');
                  tableBuilder.date('dob').nullable();
                  tableBuilder.string('password').notNullable();
                  tableBuilder.string('gender').nullable();
                  tableBuilder.string('email').unique().notNullable();
                  tableBuilder.boolean('email_verified').defaultTo(false);
                  tableBuilder.string('phone').unique().nullable();
                  tableBuilder.boolean('phone_verified').defaultTo(false);
                  tableBuilder.string('marital_status').nullable();
                  tableBuilder.boolean('is_active').defaultTo(true);
                  tableBuilder.string('bvn').nullable();
                  tableBuilder.boolean('bvn_verified').defaultTo(false);
                  tableBuilder.datetime('deleted_at');
                  tableBuilder.timestamps(true, true);
                },
              );
            }
          }),
      )
      .catch((e) => console.error('MIGRATION_ERROR', e)),
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DatabaseTable.users);
}
