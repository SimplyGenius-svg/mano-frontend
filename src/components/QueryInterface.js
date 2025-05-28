import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { queryDatabase } from '../utils/api';

function QueryInterface() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const data = await queryDatabase(query);
      
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('Failed to process query. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Ask a Question</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Examples: 'Show me the top 10 startups by score' or 'Which founders responded this week?'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Processing...' : 'Run Query'}
          </Button>
        </form>
      </Paper>

      {error && (
        <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: '#ffebee' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      {results && (
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Results</Typography>
          <Box dangerouslySetInnerHTML={{ __html: results.formatted }} />
        </Paper>
      )}
    </Box>
  );
}

export default QueryInterface;