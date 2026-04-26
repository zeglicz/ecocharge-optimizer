import { styled } from 'styled-components';
import {
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import type { DayGenerationData } from '../types';

import Card from './Card';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
`;

const PercentValue = styled.span`
  font-family: 'Syne';
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-accent-green);
`;

const DateText = styled.span`
  color: var(--color-text-muted);
  font-size: 0.75rem;
`;

const MutedText = styled.span`
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  padding-right: 3px;
`;

const ChartContainer = styled.div`
  margin-top: 18px;
  width: 100%;
  height: 20px;
`;

type EnergyMixCardProps = {
  title: string;
  data: DayGenerationData;
};

function EnergyMixCard({ title, data }: EnergyMixCardProps) {
  const chartData = [
    {
      name: 'energyMix',
      ...data.sources,
    },
  ];

  const sourceKeys = Object.keys(data.sources) as Array<
    keyof typeof data.sources
  >;

  const formattedDate = new Date(data.date).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card>
      <Row>
        <Title>{title}</Title>
        <PercentValue>{data.cleanEnergyPercent}%</PercentValue>
      </Row>

      <Row>
        <DateText>{formattedDate}</DateText>
        <MutedText>clean</MutedText>
      </Row>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" hide />

            {sourceKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={`var(--${key})`}
                isAnimationActive={false}
              />
            ))}
            <Tooltip
              formatter={(value, name) => {
                if (typeof value !== 'number' || value === 0) return null;
                return [`${value}%`, String(name)];
              }}
              shared={false}
              position={{ y: -50 }}
              wrapperStyle={{ zIndex: 10 }}
              contentStyle={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '12px',
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}

export default EnergyMixCard;
