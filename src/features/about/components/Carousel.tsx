import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TouchEvent, useCallback, useEffect, useState } from 'react';

import { CarouselProps } from '@/features/about/types/about';

const Carousel: React.FC<CarouselProps> = ({ images, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      previousSlide();
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (!isPaused) {
      intervalId = setInterval(nextSlide, autoPlayInterval);
    }
    return () => clearInterval(intervalId);
  }, [autoPlayInterval, nextSlide, isPaused]);

  return (
    <section
      aria-label='Image carousel'
      className='group relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className='absolute left-0 top-0 z-10 h-1 w-full'>
        <div
          className='bg-accent/50 h-full transition-all duration-300'
          style={{
            width: `${(currentIndex + 1) * (100 / images.length)}%`,
          }}
        />
      </div>
      <div
        className='flex h-full transition-transform duration-500 ease-out'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={image.id} className='relative h-full min-w-full shrink-0'>
            {!imagesLoaded[index] && (
              <div className='absolute inset-0 animate-pulse bg-neutral-200' />
            )}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover transition-all duration-700 ${
                !imagesLoaded[index] ? 'scale-100 blur-xl' : 'scale-100 blur-0'
              }`}
              priority={index === 0}
              onLoad={() => {
                setImagesLoaded((prev) => ({ ...prev, [index]: true }));
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={previousSlide}
        className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-textSecondary p-2 text-white opacity-0 transition-all duration-300 hover:scale-110 group-hover:opacity-85'
        aria-label='Previous slide'
      >
        <ChevronLeft className='size-6' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        aria-label='Next slide'
      >
        <ChevronRight className='size-6' />
      </button>

      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2'>
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => goToSlide(index)}
            className={`size-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-4 bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
