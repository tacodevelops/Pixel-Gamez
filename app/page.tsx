'use client';

import { getFeaturedGames, getNewGames, getPopularGames, categories, getGamesByCategory, getTrendingGames, getUpAndComingGames, getMostVisitedGames, getRecommendedGames } from '../lib/data';
import GameCarousel from '../components/GameCarousel';
import AdSlot from '../components/AdSlot';
import Link from 'next/link';
import { useI18n } from '../components/I18nContext';

export default function Home() {
  const { t } = useI18n();
  const featuredGames = getFeaturedGames();
  const newGames = getNewGames();
  const popularGames = getPopularGames();
  const trendingGames = getTrendingGames();
  const upAndComingGames = getUpAndComingGames();
  const mostVisitedGames = getMostVisitedGames();
  const recommendedGames = getRecommendedGames();

  const heroGames = featuredGames.slice(0, 4);

  return (
    <div className="home-page animate-fade-in">

      {heroGames.length >= 3 && (
        <section className="hero-banner">
          <Link href={`/game/${heroGames[0].id}`} className="hero-card hero-card--large">
            <img src={heroGames[0].thumbnail} alt="" className="hero-card__image" />
            <div className="hero-card__overlay">
              <span className="hero-card__badge hero-card__badge--featured">Featured</span>
              <h2 className="hero-card__title">{heroGames[0].title}</h2>
            </div>
          </Link>
          <div className="hero-card__side">
            {heroGames.slice(1, 4).map((game) => (
              <Link key={game.id} href={`/game/${game.id}`} className="hero-card hero-card--small">
                <img src={game.thumbnail} alt="" className="hero-card__image" />
                <div className="hero-card__overlay">
                  <span className="hero-card__title">{game.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <GameCarousel title={t('top_picks')} games={recommendedGames.slice(0, 14)} viewMoreLink="/recommended" />
      <GameCarousel title={t('trending')} games={trendingGames.slice(0, 14)} viewMoreLink="/trending" />
      
      <AdSlot placement="banner-home" />

      <GameCarousel title={t('new')} games={newGames.slice(0, 14)} viewMoreLink="/new" />
      <GameCarousel title={t('most_visited')} games={mostVisitedGames.slice(0, 14)} viewMoreLink="/most-visited" />
      <GameCarousel title={t('up_and_coming')} games={upAndComingGames.slice(0, 14)} viewMoreLink="/up-and-coming" />
      <GameCarousel title={t('popular')} games={popularGames.slice(0, 14)} viewMoreLink="/popular" />

      {categories.map(category => {
        const games = getGamesByCategory(category.id);
        if (games.length === 0) return null;
        return (
          <GameCarousel
            key={category.id}
            title={t(category.id) || category.name}
            games={games.slice(0, 14)}
            viewMoreLink={`/category/${category.id}`}
          />
        );
      })}
    </div>
  );
}
