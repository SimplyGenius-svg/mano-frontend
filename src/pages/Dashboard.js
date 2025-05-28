import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { getDashboardMetrics } from '../utils/api';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, 
         ListItemText, ListItemIcon, Divider, IconButton, Container, Button, Paper } from '@mui/material';
import QueryInterface from '../components/QueryInterface';
import MetricCard from '../components/MetricCard'
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from 'chart.js';

// Add these imports at the top
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material';

// These imports are missing but used in the code
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

// Modify the dashboardTheme to match the blue color scheme
const dashboardTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3751FF', // Match the sidebar blue from the image
      light: '#5B73FF',
      dark: '#2541DF',
    },
    secondary: {
      main: '#10B981', // Keep green for positive trends
    },
    error: {
      main: '#F87171',
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#252733',
      secondary: '#6E7191',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

// Placeholder components for dashboard sections
const Overview = () => {
  const [metrics, setMetrics] = useState({
    active_deals: 1134,
    pending_reminders: 24,
    new_this_week: 38,
    pipeline_data: [12, 8, 15, 5, 3]
  });
  
  // Chart data for the line charts in metrics cards
  const positiveLineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [10, 15, 13, 17, 20, 25, 22],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
    }]
  };
  
  const negativeLineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [25, 20, 22, 18, 15, 12, 10],
      borderColor: '#F87171',
      backgroundColor: 'rgba(248, 113, 113, 0.2)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
    }]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false }
    },
  };
  
  // Chart for activity overview (matches the chart at the bottom of the image)
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Downloads',
      data: [280, 300, 200, 320, 250, 350, 300],
      borderColor: '#3751FF',
      backgroundColor: 'rgba(55, 81, 255, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#3751FF',
      pointBorderWidth: 2,
    }]
  };
  
  return (
    <>
      {/* Metric Cards Row */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: 3, 
        mb: 4 
      }}>
        <MetricCard 
          title="Total Deals" 
          value={metrics.active_deals}
          trend={10}
          trendText="this week"
          chart={<Line data={positiveLineData} options={chartOptions} />}
        />
        
        <MetricCard 
          title="Total Earnings" 
          value="$4,231"
          trend={-22}
          trendText="this week"
          chart={<Line data={negativeLineData} options={chartOptions} />}
        />
        
        <MetricCard 
          title="New Startups" 
          value={metrics.new_this_week}
          trend={15}
          trendText="vs last week"
        />
      </Box>
      
      {/* Activity Chart - like the one at the bottom of the example image */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Latest Activity</Typography>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            px: 1.5,
            borderRadius: 4,
            bgcolor: 'rgba(55, 81, 255, 0.1)',
            color: 'primary.main',
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            359 
          </Box>
        </Box>
        
        <Box sx={{ height: 300 }}>
          <Line 
            data={activityData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { 
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }
              },
              scales: {
                x: { 
                  grid: { display: false }
                },
                y: { 
                  grid: { borderDash: [5, 5] },
                  min: 0,
                  max: 400,
                  ticks: { stepSize: 100 }
                }
              },
              elements: {
                line: { tension: 0.4 }
              }
            }} 
          />
        </Box>
      </Paper>
    </>
  );
};

const Deals = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Deal Pipeline</Typography>
    <Typography>The deals component will be implemented in the next phase.</Typography>
  </Box>
);

const Queries = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Data Queries</Typography>
    <QueryInterface />
  </Box>
);

function Dashboard() {
  // Keep existing state and handlers
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState('overview');
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const menuItems = [
    { text: 'Overview', value: 'overview', icon: '📊' },
    { text: 'Queries', value: 'queries', icon: '🔍' },
    { text: 'Deals', value: 'deals', icon: '💰' }
  ];

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ 
        display: 'flex', 
        height: '100vh',
        background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.03), transparent 60%), radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.03), transparent 60%)'
      }}>
        {/* Sidebar - Glass effect */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              width: 240, 
              boxSizing: 'border-box', 
              backgroundColor: '#3751FF', // Blue background
              color: 'white',
              borderRight: 'none',
            },
          }}
        >
          <Box sx={{ 
            p: 3, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}>
            <Box component="span" sx={{ 
              width: 36, 
              height: 36, 
              borderRadius: 1, 
              background: '#fff',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mr: 1.5,
              color: '#3751FF',
              fontWeight: 'bold',
            }}>M</Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              color: '#fff'
            }}>
              MANO
            </Typography>
          </Box>
          
          <List sx={{ p: 2 }}>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.value}
                selected={section === item.value}
                onClick={() => setSection(item.value)}
                sx={{
                  my: 0.5,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Box component="span" sx={{ 
                  mr: 2, 
                  fontSize: '1.2rem',
                }}>
                  {item.icon}
                </Box>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }} 
                />
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Button
              onClick={handleLogout}
              fullWidth
              sx={{ 
                color: '#fff',
                textTransform: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              Sign out
            </Button>
          </Box>
        </Drawer>
        
        {/* Main content */}
        <Box component="main" sx={{ 
          flexGrow: 1, 
          bgcolor: '#F7FAFC',
          p: 3,
          overflow: 'auto'
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
              Welcome Back, Partner
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search..."
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ width: 220 }}
              />
              <IconButton>
                <NotificationsNoneIcon />
              </IconButton>
            </Box>
          </Box>
          
          {/* Promotional Card - similar to the "Want some EXTRA Money?" in the image */}
          <Paper 
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 2,
              background: 'linear-gradient(90deg, #40BFFF 0%, #5CCEFF 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Need Investment Insights?
              </Typography>
              <Typography variant="body1">
                Use our AI-powered query system to analyze your portfolio data
              </Typography>
              <Button 
                variant="contained" 
                color="inherit" 
                sx={{ 
                  mt: 2,
                  bgcolor: 'white', 
                  color: '#40BFFF',
                  '&:hover': { bgcolor: '#f0f0f0' }
                }}
                onClick={() => setSection('queries')}
              >
                Try Data Query
              </Button>
            </Box>
            <Box component="img" src="/analytics-icon.svg" alt="Analytics" sx={{ width: 120 }} />
          </Paper>
          
          {/* Content sections */}
          <Box 
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={section}
          >
            {section === 'overview' && <Overview />}
            {section === 'queries' && <Queries />}
            {section === 'deals' && <Deals />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;