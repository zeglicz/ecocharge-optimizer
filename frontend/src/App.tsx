import { keyframes, styled } from 'styled-components';
import { useEffect, useState } from 'react';

import { fetchGeneration } from './services/api';
import type { DayGenerationData } from './types';

import GlobalStyles from './styles/GlobalStyles';
import { breakpoints } from './styles/breakpoints';

import Header from './components/Header';
import Section from './components/Section';
import CardsGrid from './components/CardsGrid';
import Card from './components/Card';
import EnergyMixCard from './components/EnergyMixCard';
import { ChargingSlotCard } from './components/ChargingSlotCard';
import { ChargingWindowCard } from './components/ChargingWindowCard';
import Footer from './components/Footer';

const AppWrapper = styled.div`
  max-width: ${breakpoints.lg}px;
  margin: 0 auto;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingCard = styled(Card)`
  min-height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 229, 160, 0.2);
  border-top-color: var(--color-accent-green);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const ErrorCard = styled(Card)`
  min-height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
  border-color: rgba(248, 113, 112, 0.25);
`;

const ErrorIcon = styled.div`
  font-size: 42px;
  line-height: 1;
  color: var(--color-accent-red);
`;

const ErrorTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  color: var(--color-text-muted);
  font-size: 0.75rem;
  max-width: 240px;
`;

export default function App() {
  const [generationData, setGenerationData] = useState<DayGenerationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGeneration()
      .then(async (res) => {
        setGenerationData(res.data);
      })
      .catch(() => setError('Error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <GlobalStyles />
      <Header />

      <AppWrapper>
        <Section label="Energy Mix - 3-day Overview">
          <CardsGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <LoadingCard
                  key={`loading-${index}`}
                  aria-live="polite"
                  aria-busy="true"
                >
                  <Spinner aria-label="Loading generation data" />
                </LoadingCard>
              ))}
            {!loading &&
              !!error &&
              ['Today', 'Tomorrow', 'In 2 days'].map((title) => (
                <ErrorCard
                  key={`error-${title}`}
                  aria-live="polite"
                  aria-busy="false"
                >
                  <ErrorIcon aria-hidden>⚠</ErrorIcon>
                  <ErrorTitle>{title}</ErrorTitle>
                  <ErrorMessage>
                    Could not load generation data right now. Please try again
                    in a moment.
                  </ErrorMessage>
                </ErrorCard>
              ))}
            {!loading &&
              !error &&
              generationData.map((day, index) => {
                const titles = ['Today', 'Tomorrow', 'In 2 days'];

                return (
                  <EnergyMixCard
                    key={day.date}
                    title={titles[index] ?? day.date}
                    data={day}
                  />
                );
              })}
          </CardsGrid>
        </Section>

        <Section label="Optimal Charging Window">
          <CardsGrid columns={{ mobile: 1, tablet: 1, desktop: 2 }}>
            <ChargingSlotCard />
            <ChargingWindowCard />
          </CardsGrid>
        </Section>
      </AppWrapper>

      <Footer />
    </>
  );
}
