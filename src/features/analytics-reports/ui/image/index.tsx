import Image from 'next/image';

const ReportImage = () => {
  return (
    <span className='w-4/6 rounded-xl border border-borderColor p-4 shadow-md md:mt-4 xl:w-1/3 xl:p-6'>
      <Image
        className='rounded-xl object-cover'
        fetchPriority='high'
        src='/reports.jpg'
        style={{
          width: '100%',
          height: 'auto',
          opacity: 1.0,
        }}
        width={350}
        height={150}
        alt='Laboratory image'
        priority={true}
      />
    </span>
  );
};

export default ReportImage;
