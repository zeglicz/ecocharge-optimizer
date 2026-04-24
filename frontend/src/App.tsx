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
import { ChargingSlotCard } from './components/ChargingSlotCard';
import { ChargingWindowCard } from './components/ChargingWindowCard';
import Footer from './components/Footer';

const AppWrapper = styled.div`
  max-width: ${breakpoints.lg}px;
  margin: 0 auto;
`;

export default function App() {
  const [generationData, setGenerationData] = useState<DayGenerationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGeneration()
      .then((res) => setGenerationData(res.data))
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
