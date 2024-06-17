// import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/core';

const config = defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'postgres',
  driver: PostgreSqlDriver,
  user: 'postgres',
  password: '12345',
  port: 5432,
  host: 'localhost',
  debug: true,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  allowGlobalContext: true,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: false,
    safe: true,
    emit: 'ts',
  },
});

export default config;
