import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import QRCode from 'qrcode.react';
import { waste, transactions } from '../services/api';

interface WasteType {
  id: string;
  name: string;
  pointsPerKg: number;
}

const Transactions: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [weight, setWeight] = useState('');
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        const data = await waste.getTypes();
        setWasteTypes(data);
      } catch (error) {
        console.error('Error fetching waste types:', error);
      }
    };
    fetchWasteTypes();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setQrData('');
  };

  const handleSubmit = async () => {
    try {
      const response = await transactions.create({
        wasteTypeId: selectedType,
        weight: parseFloat(weight),
      });
      setQrData(JSON.stringify(response));
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        New Transaction
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Create Transaction
            </Typography>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Waste Type</InputLabel>
                <Select
                  value={selectedType}
                  label="Waste Type"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {wasteTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name} ({type.pointsPerKg} points/kg)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleOpen}
                disabled={!selectedType || !weight}
              >
                Generate QR Code
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Transaction Information
            </Typography>
            {selectedType && weight && (
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Selected Waste Type:{' '}
                  {wasteTypes.find((t) => t.id === selectedType)?.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Weight: {weight} kg
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Estimated Points:{' '}
                  {(
                    parseFloat(weight) *
                    (wasteTypes.find((t) => t.id === selectedType)?.pointsPerKg ||
                      0)
                  ).toFixed(0)}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction QR Code</DialogTitle>
        <DialogContent>
          {!qrData ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mb: 2 }}
              >
                Create Transaction
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <QRCode value={qrData} size={256} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Show this QR code to the waste collector
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transactions;
