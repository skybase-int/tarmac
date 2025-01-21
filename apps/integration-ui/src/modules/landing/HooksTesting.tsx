import { UseRewardsChartInfoData } from './hooks/UseRewardsChartInfoData';
import { UseUsdsChartInfoData } from './hooks/UseUsdsChartInfoData';
import { UseSkyChartInfoData } from './hooks/UseSkyChartInfoData';
import { SealModuleData } from './hooks/SealModuleData';
import { UseSavingsChartInfoData } from './hooks/UseSavingsChartInfoData';
import { UseRewardsDataInfo } from './hooks/UseRewardsDataInfo';
import { UseTotalSavingsSuppliers } from './hooks/UseTotalSavingsSuppliers';

const HooksTesting = () => {
  return (
    <div className="space-y-4">
      <UseRewardsDataInfo />
      <SealModuleData />
      <UseUsdsChartInfoData />
      <UseSkyChartInfoData />
      <UseRewardsChartInfoData />
      <UseSavingsChartInfoData />
      <UseTotalSavingsSuppliers />
    </div>
  );
};

export default HooksTesting;
