import { styled } from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import { breakpoints } from './styles/breakpoints';

import Header from './components/Header';
import Section from './components/Section';
import CardsGrid from './components/CardsGrid';
import EnergyMixCard from './components/EnergyMixCard';

const AppWrapper = styled.div`
  max-width: ${breakpoints.lg}px;
  margin: 0 auto;
`;

const data = [
  {
    date: '2026-04-14',
    sources: {
      biomass: 8.63,
      coal: 0,
      imports: 9.1,
      gas: 27.92,
      nuclear: 17.13,
      other: 0,
      hydro: 0,
      solar: 7.46,
      wind: 29.73,
    },
    cleanEnergyPercent: 62.95,
  },
  {
    date: '2026-04-15',
    sources: {
      biomass: 4.95,
      coal: 0,
      imports: 5.41,
      gas: 10.98,
      nuclear: 18.11,
      other: 0,
      hydro: 0,
      solar: 6.41,
      wind: 54.11,
    },
    cleanEnergyPercent: 83.58,
  },
  {
    date: '2026-04-16',
    sources: {
      biomass: 4.93,
      coal: 0,
      imports: 8.79,
      gas: 12.84,
      nuclear: 18.22,
      other: 0,
      hydro: 0,
      solar: 11.44,
      wind: 43.79,
    },
    cleanEnergyPercent: 78.38,
  },
];

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />

      <AppWrapper>
        <Section label="Energy Mix - 3-day Overview">
          <CardsGrid>
            {data.map((day, index) => {
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
      </AppWrapper>
    </>
  );
}
