"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type GalleryPhoto = {
  src: string;
  alt: string;
  title: string;
  description: string;
  tag: string;
};

type PhotoGalleryProps = {
  photos: GalleryPhoto[];
};

const SWIPE_THRESHOLD = 40;

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const activePhoto = photos[activeIndex];
  const progressLabel = useMemo(() => `${activeIndex + 1} / ${photos.length}`, [activeIndex, photos.length]);

  const goToIndex = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + photos.length) % photos.length;
    setActiveIndex(normalizedIndex);
  };

  const goToPrevious = () => {
    goToIndex(activeIndex - 1);
  };

  const goToNext = () => {
    goToIndex(activeIndex + 1);
  };

  const handleTouchStart = (clientX: number) => {
    setTouchStart(clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (clientX: number) => {
    setTouchEnd(clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) {
      return;
    }

    const distance = touchStart - touchEnd;

    if (distance > SWIPE_THRESHOLD) {
      goToNext();
    } else if (distance < -SWIPE_THRESHOLD) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <div className="gallery-shell">
      <div
        className="gallery-stage"
        onTouchStart={(event) => handleTouchStart(event.touches[0]?.clientX ?? 0)}
        onTouchMove={(event) => handleTouchMove(event.touches[0]?.clientX ?? 0)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="gallery-stage-media">
          <Image
            key={activePhoto.src}
            src={activePhoto.src}
            alt={activePhoto.alt}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="gallery-stage-image"
            priority={activeIndex === 0}
          />
          <span className="gallery-tag">{activePhoto.tag}</span>
        </div>
        <div className="gallery-stage-body">
          <div>
            <p className="gallery-progress">{progressLabel}</p>
            <h2 className="gallery-title">{activePhoto.title}</h2>
            <p className="gallery-description">{activePhoto.description}</p>
          </div>
          <div className="gallery-controls">
            <button type="button" className="gallery-button" onClick={goToPrevious} aria-label="Previous photo">
              Prev
            </button>
            <button type="button" className="gallery-button" onClick={goToNext} aria-label="Next photo">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="gallery-thumbs" aria-label="Photo gallery thumbnails">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={`gallery-thumb${index === activeIndex ? " active" : ""}`}
            onClick={() => goToIndex(index)}
            aria-label={`View ${photo.title}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 30vw, 160px"
              className="gallery-thumb-image"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
