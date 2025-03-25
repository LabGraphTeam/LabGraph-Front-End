import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { TouchEvent, useCallback, useEffect, useState } from 'react'

import { CarouselProps } from '@/types/About'

const Carousel: React.FC<CarouselProps> = ({ images, autoPlayInterval = 5000000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({})
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const previousSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      previousSlide()
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (!isPaused) {
      intervalId = setInterval(nextSlide, autoPlayInterval)
    }
    return () => clearInterval(intervalId)
  }, [autoPlayInterval, nextSlide, isPaused])

  return (
    <section
      aria-label='Image carousel'
      className='group relative h-[250px] w-full overflow-hidden rounded-2xl shadow-lg'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    >
      <div className='absolute left-0 top-0 z-10 h-1 w-full'>
        <div
          className='bg-accent/50 h-full transition-all duration-300'
          style={{
            width: `${(currentIndex + 1) * (100 / images.length)}%`
          }}
        />
      </div>
      <div
        className='flex h-full transition-transform duration-500 ease-out'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className='relative h-full min-w-full shrink-0' key={image.id}>
            {!imagesLoaded[index] ? (
              <div className='absolute inset-0 animate-pulse bg-neutral-200' />
            ) : null}
            <Image
              alt={image.alt}
              className={`object-cover transition-all duration-700 ${
                !imagesLoaded[index] ? 'scale-100 blur-xl' : 'scale-100 blur-0'
              } brightness-75 contrast-100 grayscale-[50%] filter hover:grayscale-[0%]`}
              fill
              onLoad={() => {
                setImagesLoaded((prev) => ({ ...prev, [index]: true }))
              }}
              priority={index === 0}
              src={image.src}
            />
          </div>
        ))}
      </div>

      <button
        aria-label='Previous slide'
        className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-all duration-300 hover:scale-110 group-hover:opacity-100'
        onClick={previousSlide}
      >
        <ChevronLeft className='size-6' />
      </button>
      <button
        aria-label='Next slide'
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        onClick={nextSlide}
      >
        <ChevronRight className='size-6' />
      </button>

      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2'>
        {images.map((img, index) => (
          <button
            aria-label={`Go to slide ${index + 1}`}
            className={`size-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-4 bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            key={img.id}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel
