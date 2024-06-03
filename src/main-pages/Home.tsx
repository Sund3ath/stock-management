// src/main-pages/Home.tsx
import React from 'react';
import GridLayout from 'react-grid-layout';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components for chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home: React.FC = () => {
  const layout = [
    { i: 'chart1', x: 0, y: 0, w: 6, h: 4 },
    { i: 'chart2', x: 6, y: 0, w: 6, h: 4 },
    { i: 'chart3', x: 0, y: 4, w: 6, h: 4 },
    { i: 'chart4', x: 6, y: 4, w: 6, h: 4 },
  ];

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <Box key="chart1" sx={{ p: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Chart 1</Typography>
              <Box height={150}>
                <Line data={data} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box key="chart2" sx={{ p: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Chart 2</Typography>
              <Box height={150}>
                <Line data={data} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box key="chart3" sx={{ p: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Chart 3</Typography>
              <Box height={150}>
                <Line data={data} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box key="chart4" sx={{ p: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Chart 4</Typography>
              <Box height={150}>
                <Line data={data} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </GridLayout>
    </Container>
  );
};

export default Home;
