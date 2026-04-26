import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

import { fetchGeneration } from './services/api';
import type { DayGenerationData } from './types';

import GlobalStyles from './styles/GlobalStyles';
import { breakpoints } from './styles/breakpoints';

import Header from './components/Header';
import Section from './components/Section';
import CardsGrid from './components/CardsGrid';
import EnergyMixCard from './components/EnergyMixCard';
import EnergyMixCardLoading from './components/EnergyMixCardLoading';
import EnergyMixCardError from './components/EnergyMixCardError';
import { ChargingSection } from './components/ChargingSection';
import Footer from './components/Footer';

const AppWrapper = styled.div`
  max-width: ${breakpoints.lg}px;
  margin: 0 auto;
`;

const energyMixTitles = ['Today', 'Tomorrow', 'In 2 days'] as const;

export default function App() {
  const [generationData, setGenerationData] = useState<DayGenerationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadGenerationMix() {
      try {
        const res = await fetchGeneration();
        setGenerationData(res.data);
      } catch (err) {
        setError(true);
        console.error('Failed to fetch generation data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadGenerationMix();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Header />

      <AppWrapper>
        <Section label="Energy Mix - 3-day Overview">
          <CardsGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
            {loading &&
              energyMixTitles.map((_, index) => (
                <EnergyMixCardLoading key={`loading-${index}`} />
              ))}
            {!loading &&
              error &&
              energyMixTitles.map((title) => (
                <EnergyMixCardError key={`error-${title}`} title={title} />
              ))}
            {!loading &&
              !error &&
              generationData.map((day, index) => {
                return (
                  <EnergyMixCard
                    key={day.date}
                    title={energyMixTitles[index] ?? day.date}
                    data={day}
                  />
                );
              })}
          </CardsGrid>
        </Section>

        <ChargingSection />
      </AppWrapper>

      <Footer />
    </>
  );
}
