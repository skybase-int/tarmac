import { SealMigration } from './sealModule';

export function checkUrnMigrationStatus(
  migrations: SealMigration[] | undefined | null,
  oldUrnIndex: number
): { isMigrated: boolean; migrationDetails: SealMigration | undefined } {
  // TODO: Remove this once the migration is complete
  // Return mock data for now
  // Delete this vvvvvvvvv
  return {
    isMigrated: oldUrnIndex % 2 === 0,
    migrationDetails: undefined
  };
  // Delete this ^^^^^^^^

  // TODO: Bring this back once subgraph is updated
  // if (!migrations || migrations.length === 0) {
  //   return { isMigrated: false, migrationDetails: undefined };
  // }

  // const migration = migrations.find(m => m.oldIndex === oldUrnIndex.toString());

  // return {
  //   isMigrated: !!migration,
  //   migrationDetails: migration
  // };
}
