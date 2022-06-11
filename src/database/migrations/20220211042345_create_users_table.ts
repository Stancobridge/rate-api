import { Knex } from 'knex';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DatabaseTable.users, (tableBuilder) => {
    tableBuilder.uuid('id').unique().notNullable();
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
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DatabaseTable.users);
}
