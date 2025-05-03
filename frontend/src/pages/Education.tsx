import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { education } from '../services/api';

interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  points: number;
}

const Education: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await education.getModules();
        setModules(data);
      } catch (error) {
        console.error('Error fetching educational modules:', error);
      }
    };
    fetchModules();
  }, []);

  const handleModuleClick = async (moduleId: string) => {
    try {
      const data = await education.getModule(moduleId);
      setSelectedModule(data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching module details:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedModule(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Educational Modules
      </Typography>

      <Grid container spacing={3}>
        {modules.map((module) => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <Card
              sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => handleModuleClick(module.id)}
            >
              <CardMedia
                component="img"
                height="140"
                image={module.imageUrl}
                alt={module.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {module.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {module.description}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  Earn {module.points} points
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {modules.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
              No educational modules available
            </Typography>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        {selectedModule && (
          <>
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">{selectedModule.title}</Typography>
              <IconButton onClick={handleClose} size="small">
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box>
                <img
                  src={selectedModule.imageUrl}
                  alt={selectedModule.title}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '16px',
                  }}
                />
                <Typography variant="body1" gutterBottom>
                  {selectedModule.description}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ mt: 2 }}
                  dangerouslySetInnerHTML={{ __html: selectedModule.content }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button variant="contained" color="primary">
                Complete & Earn {selectedModule.points} Points
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Education;
