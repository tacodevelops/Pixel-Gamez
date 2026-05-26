'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Game } from '../lib/data';
import GameCard from './GameCard';
import Link from 'next/link';

interface GameCarouselProps {
  title: string;
  games: Game[];
  viewMoreLink?: string;
}

export default function GameCarousel({ title, games, viewMoreLink }: GameCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (games.length === 0) return null;

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
        {viewMoreLink && (
          <Link href={viewMoreLink} className="carousel-view-more">
            View all →
          </Link>
        )}
      </div>
      <div className="carousel-wrapper">
        {canScrollLeft && (
          <button className="carousel-arrow carousel-arrow--left" onClick={() => scroll('left')} aria-label="Scroll left">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        <div className="carousel-track" ref={scrollRef}>
          {games.map(game => (
            <div key={game.id} className="carousel-item">
              <GameCard game={game} />
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button className="carousel-arrow carousel-arrow--right" onClick={() => scroll('right')} aria-label="Scroll right">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}
      </div>
    </section>
  );
}
