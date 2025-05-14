import { SealMigration } from './sealModule';

export function checkUrnMigrationStatus(
  // TODO: remove the eslint disabling rules once we use the function arguments
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  migrations: SealMigration[] | undefined | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  oldUrnIndex: number
): { isMigrated: boolean; migrationDetails: SealMigration | undefined } {
  // TODO: Remove this once the migration is complete
  // Return mock data for now
  // Delete this vvvvvvvvv
  return {
    // isMigrated: oldUrnIndex % 2 === 0,
    isMigrated: false, // I set it to false to make it easier to test for now
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
