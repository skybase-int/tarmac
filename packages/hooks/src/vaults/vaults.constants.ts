export enum SupportedCollateralTypes {
  LOCKSTAKE = 'LOCKSTAKE',
  LSE_MKR_A = 'LSE-MKR-A',
  LOCKSTAKE_SKY = 'LockstakeSky'
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  LIQUIDATION = 'LIQUIDATION'
}

export const RISK_LEVEL_THRESHOLDS = [
  { level: RiskLevel.LIQUIDATION, threshold: 80 },
  { level: RiskLevel.HIGH, threshold: 40 },
  { level: RiskLevel.MEDIUM, threshold: 25 },
  { level: RiskLevel.LOW, threshold: 0 }
] as const;
