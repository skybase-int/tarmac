import { TimeFrame } from '@/modules/ui/components/Chart';

// Determine the interval in seconds for each timeframe
export const getTimeFrameInterval = (timeFrame: TimeFrame): number => {
  switch (timeFrame) {
    case 'w':
    case 'm':
    case 'y':
    case 'all':
      return 86400; // 1 day in seconds
    default:
      return 3600; // Default to 1 hour in seconds
  }
};
