'use client';

import { useState, useEffect } from 'react';
import { Select, MenuItem, Tabs, Tab, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Batch, School, Student } from '@prisma/client';
import { getAllSchools, getBatchesBySchool } from '@/actions/schoolService';
import { Add } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';

const StudentList = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  // Fetch Schools on Mount
  useEffect(() => {
    const getSchools = async () => {
      const data = await getAllSchools();
      setSchools(data);
      if (data.length) setSelectedSchool(data[0].id);
    };
    getSchools();
  }, []);

  // Fetch Batches when School Changes
  useEffect(() => {
    if (!selectedSchool) return;
    const getBatches = async () => {
      const batchData = await getBatchesBySchool(selectedSchool);
      setBatches(batchData);
      setSelectedBatch(batchData.length ? batchData[0].id : null);
    };
    getBatches();
    setStudents([]);
  }, [selectedSchool]);

  // Handle Swipe Gesture
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Move to the next batch
      const currentIndex = batches.findIndex((b) => b.id === selectedBatch);
      if (currentIndex < batches.length - 1) {
        setSelectedBatch(batches[currentIndex + 1].id);
      }
    },
    onSwipedRight: () => {
      // Move to the previous batch
      const currentIndex = batches.findIndex((b) => b.id === selectedBatch);
      if (currentIndex > 0) {
        setSelectedBatch(batches[currentIndex - 1].id);
      }
    },
    trackMouse: true, // Enables mouse swiping (for testing)
  });

  return (
    <Grid container spacing={2}>
      {/* Header: School Selection */}
      <Grid size={12} mt={2}>
        <Select
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
          fullWidth
        >
          {schools.map((school) => (
            <MenuItem key={school.id} value={school.id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      {/* Scrollable Batch Tabs with Swipe Support */}
      {batches.length > 0 && (
        <Grid size={12} {...handlers} sx={{ touchAction: 'pan-x' }}>
          <Tabs
            value={selectedBatch}
            onChange={(_, newValue) => setSelectedBatch(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              WebkitOverflowScrolling: 'touch', // Improves scrolling performance on iOS
              '& .MuiTabs-scroller': {
                overflowX: 'auto', // Enables horizontal scrolling
                scrollbarWidth: 'none', // Hides scrollbar in Firefox
                '&::-webkit-scrollbar': { display: 'none' }, // Hides scrollbar in Chrome/Safari
              },
            }}
          >
            {batches.map((batch) => (
              <Tab key={batch.id} label={batch.name} value={batch.id} />
            ))}
          </Tabs>
        </Grid>
      )}

      {/* Student List */}
      <Grid size={12} {...handlers}>
        <h2>Student List</h2>
        {students.length > 0 ? (
          students.map((student) => <div key={student.id}>{student.name}</div>)
        ) : (
          <p>No students available.</p>
        )}
      </Grid>

      {/* Add Student Button (Only if Batches Exist) */}
      {batches.length > 0 && (
        <Grid size={12}>
          <Button variant="contained" startIcon={<Add />}>
            Add Student
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default StudentList;
