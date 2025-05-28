import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function MetricCard({ title, value, trend = null, trendText, icon, chart }) {
  const isPositive = trend > 0;
  
  return (
    <Paper
      component={motion.div}
      whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
      sx={{
        p: 3,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        </Box>
        {icon && (
          <Box sx={{ color: 'primary.main', fontSize: '1.5rem' }}>
            {icon}
          </Box>
        )}
      </Box>
      
      <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {trend !== null && (
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            color: isPositive ? '#10B981' : '#F87171',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}>
            {isPositive ? 
              <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} /> : 
              <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />
            }
            {Math.abs(trend)}% {trendText}
          </Box>
        )}
        
        {chart && (
          <Box sx={{ width: 80, height: 40 }}>
            {chart}
          </Box>
        )}
      </Box>
    </Paper>
  );
}