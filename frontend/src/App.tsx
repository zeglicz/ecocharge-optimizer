import GlobalStyles from './styles/GlobalStyles';

import CardContainer from './components/CardContainer';
import Card from './components/Card';
import Header from './components/Header';
import Section from './components/Section';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />

      <Section label="Energy Mix - 3-day Overview">
        <CardContainer>
          <Card>Today</Card>
          <Card>Tomorrow</Card>
          <Card>In 2 days</Card>
        </CardContainer>
      </Section>
    </>
  );
}
