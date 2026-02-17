'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ScreenshotGalleryProps {
  screenshots: string[];
  gameTitle: string;
}

export default function ScreenshotGallery({ screenshots, gameTitle }: ScreenshotGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const showNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % screenshots.length);
    }
  };

  const showPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + screenshots.length) % screenshots.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrevious();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border border-gray-200 overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => openModal(index)}
          >
            <Image
              src={screenshot}
              alt={`${gameTitle} screenshot ${index + 1}`}
              width={800}
              height={450}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close modal"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {screenshots.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors"
                aria-label="Previous screenshot"
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors"
                aria-label="Next screenshot"
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={screenshots[selectedImage]}
              alt={`${gameTitle} screenshot ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              style={{ maxWidth: '100%', maxHeight: '90vh' }}
            />
            <div className="mt-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {selectedImage + 1} / {screenshots.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
