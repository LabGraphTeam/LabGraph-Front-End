import { JSX } from 'react';

export interface ContactItemProps {
  id: number;
  title: string;
  content: string;
  icon: JSX.Element;
}

export interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

export interface CarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

export interface FeatureProps {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface OverviewProps {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface NavigationProps {
  id: string;
  label: string;
}

export interface FAQProps {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}
