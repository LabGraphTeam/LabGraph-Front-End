import { useGraph } from '@/features/charts/shared-hooks/useGraph';
import { TbChartAreaLine, TbChartLine } from 'react-icons/tb';

const ViewToggleButton = () => {
  const { viewMode, toggleView } = useGraph();

  return (
    <button
      onClick={toggleView}
      className='flex items-center gap-2 rounded-full p-2 text-textPrimary'
      title={`${viewMode === 'single' ? 'Switch to' : 'Back to'} ${viewMode === 'single' ? 'multi line' : 'line'}`}
    >
      {viewMode === 'single' ? (
        <TbChartAreaLine strokeWidth='1.5' className='size-7 opacity-80' />
      ) : (
        <TbChartLine strokeWidth='1.5' className='size-7 opacity-80' />
      )}
    </button>
  );
};

export default ViewToggleButton;
