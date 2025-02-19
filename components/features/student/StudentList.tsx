'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Card,
  Typography,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Batch, School, Student } from '@prisma/client';
import { getAllSchools, getBatchesBySchool } from '@/actions/schoolService';
import {
  deleteStudent,
  getStudentById,
  getStudentsByBatchAndSchool,
} from '@/actions/studentService';
import { Edit, Delete } from '@mui/icons-material';
import LNSTabs from '@/components/ui/LNSTabs';
import LNSDataGrid from '@/components/ui/LNSDataGrid';
import CreateOrUpdateStudent from './CreateOrUpdateStudent';
import { useSwipeable } from 'react-swipeable';
import { useNotification } from '@/context/NotificationContext';
import { calculateAge } from '@/utils/helper';
import { isEmpty } from 'lodash';

interface IStudentProps {
  schoolId: string;
}

const StudentList = ({ schoolId }: IStudentProps) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>(schoolId);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student>();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      const data = await getAllSchools();
      setSchools(data);
      if (data.length) setSelectedSchool(selectedSchool);
      setLoading(false);
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    if (!selectedSchool) return;

    const fetchBatchesAndStudents = async () => {
      setLoading(true);
      const batchData = await getBatchesBySchool(selectedSchool);
      setBatches(batchData);
      setSelectedBatch(batchData.length ? batchData[0].id : null);
      setLoading(false);
    };

    fetchBatchesAndStudents();
  }, [selectedSchool]);

  useEffect(() => {
    if (!selectedBatch) return;

    const fetchStudents = async () => {
      setLoading(true);
      const bacthId = !isEmpty(selectedBatch) ? selectedBatch : null;
      const studentData = await getStudentsByBatchAndSchool(
        selectedSchool,
        bacthId
      );
      setStudents(studentData);
      setLoading(false);
    };

    fetchStudents();
  }, [selectedBatch, selectedSchool]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = batches.findIndex((b) => b.id === selectedBatch);
      if (currentIndex < batches.length - 1) {
        setSelectedBatch(batches[currentIndex + 1].id);
      }
    },
    onSwipedRight: () => {
      const currentIndex = batches.findIndex((b) => b.id === selectedBatch);
      if (currentIndex > 0) {
        setSelectedBatch(batches[currentIndex - 1].id);
      }
    },
    trackMouse: true,
  });

  const columns = [
    { field: 'id', flex: 0, hideable: true },
    { field: 'name', headerName: 'Student Name', width: 200 },
    { field: 'studentId', headerName: 'Student ID', width: 150 },
    { field: 'fatherName', headerName: 'Father Name', width: 200 },
    { field: 'fatherPhone', headerName: 'Father Phone', width: 200 },

    {
      field: 'DOB',
      headerName: 'Age',
      width: 200,
      renderCell: (params: any) => calculateAge(params.value),
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 200,
      renderCell: (params: any) => {
        if (!params.value) return '';
        return params.value.toLowerCase() === 'male' ? 'Boy' : 'Girl';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: any) => (
        <Grid container spacing={1}>
          <Grid>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row.id)}
              aria-label="delete"
            >
              <Delete />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton
              color="primary"
              onClick={() => handleUpdate(params.row.id)}
              aria-label="edit"
            >
              <Edit />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this student?'
    );
    if (!confirm) return;
    const res = deleteStudent(id);
    showNotification(`Staff deleted successfully`, 'success');
    if (!res) return;
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  const handleUpdate = async (id: string) => {
    const response = await getStudentById(id);
    if (!response) return;
    setStudent(response);
    setOpen(true);
  };

  return (
    <Card
      sx={{
        mt: 2,
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
      >
        Manage Students
      </Typography>

      {/* School Selection */}
      <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <Typography variant="body1" fontWeight="bold" color="primary">
          Select School
        </Typography>
        <Select
          fullWidth
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
          sx={{ mt: 1, bgcolor: 'background.default', borderRadius: 2 }}
        >
          {schools.map((school) => (
            <MenuItem key={school.id} value={school.id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </Paper>

      {/* Batch Selection */}

      <Grid size={12} {...handlers} sx={{ touchAction: 'pan-x' }}>
        <LNSTabs
          tabs={batches.map((batch) => ({ id: batch.id, label: batch.name }))}
          selectedTab={selectedBatch ?? ''}
          onTabChange={(newValue) => setSelectedBatch(newValue)}
          showAddButton={true}
          onAddButtonClick={() => setOpen(true)}
          addButtonLabel="Add Student"
        />
      </Grid>

      {/* Student List */}
      <Paper elevation={3} sx={{ p: 2, mt: 2, borderRadius: 3 }}>
        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}
        >
          Student List
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : students.length > 0 ? (
          <LNSDataGrid rows={students} columns={columns} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No students available for this batch.
          </Typography>
        )}
      </Paper>

      {/* Add/Edit Student Modal */}
      {open && (
        <CreateOrUpdateStudent
          open={open}
          onClose={() => setOpen(false)}
          schoolId={selectedSchool}
          tempBatchId={selectedBatch ?? ''}
          student={student}
        />
      )}
    </Card>
  );
};

export default StudentList;
