import { LevelGroupResponse, ListingItem } from '@/features/charts/types/Chart';
import { LevelOptions } from '../../ui/hooks/useAnalyticsOptions';

export interface CommonTestSelectorProps {
  testNameList: string[];
  analyticsType: string;
  name: string;
  level: number;
  setListingItem: (data: ListingItem[]) => void;
  setIsLoading: (data: boolean) => void;
}

export interface TestSelectorProps {
  analyticsType: string;
  testNameList: string[];
  name: string;
  setIsLoading: (data: boolean) => void;
  setListing: (data: LevelGroupResponse[]) => void;
}

export interface TestNameSelectorProps {
  testNameList: string[];
  testName: string;
  setTestName: (name: string) => void;
}

export interface TestLevelSelectorProps {
  levelOptions: LevelOptions[];
  testLevel: number;
  setTestLevel: (level: number) => void;
}

export interface TestSelectorActionsProps {
  testNameList: string[];
  testName: string;
  setTestName: (name: string) => void;
  levelOptions: LevelOptions[];
  testLevel: number;
  setTestLevel: (level: number) => void;
  analyticsType: string;
  googleSheetUrl: string;
}

export interface GoogleSheetLinkProps {
  googleSheetUrl?: string;
}
