'use client';

import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import LNSButton from '@/components/ui/LNSButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateOrUpdateSchool from './CreateOrUpdateSchool';
import LNSDataGrid from '@/components/ui/LNSDataGrid';
import Header from '@/components/ui/Header';
import {
  deleteSchool,
  getAllSchools,
  getSchoolById,
} from '@/actions/schoolService';
import MusicLoader from '@/components/ui/MusicLoader';
import EmptyCard from '@/components/ui/EmptyCard';
import { School } from '@prisma/client';

const SchoolList = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [open, setOpen] = useState(false);
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      const response = await getAllSchools();
      setSchools(response);
      setLoading(false);
    };
    fetchSchools();
  }, [open]);

  const columns: GridColDef[] = [
    { field: 'id', flex: 0, hideable: true },
    { field: 'name', headerName: 'School Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'contactPerson', headerName: 'Contact Person', width: 150 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
    { field: 'location', headerName: 'City/Area', width: 150 },
    { field: 'students', headerName: 'Students', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      hideSortIcons: true,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Grid container direction="row">
          <Grid>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton
              color="primary"
              onClick={() => handleUpdate(params.row.id)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ];

  const handleUpdate = async (id: string) => {
    const response = await getSchoolById(id);
    if (!response) return;
    setSchool(response);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this school?'
    );
    if (!confirm) return;
    const res = deleteSchool(id);
    if (!res) return;
    setSchools((prevSchools) =>
      prevSchools.filter((school) => school.id !== id)
    );
  };

  return (
    <Grid container spacing={2} sx={{ height: 400, width: '100%', p: 3 }}>
      <Header title="Schools" totalCount={schools.length} />
      <Grid container size={12} justifyContent="flex-end">
        <LNSButton
          variant="contained"
          color="primary"
          onClick={() => {
            setSchool(null);
            setOpen(true);
          }}
        >
          Add School
        </LNSButton>
      </Grid>
      {!loading && schools.length === 0 ? (
        <EmptyCard
          title={'No Schools Found'}
          message={'No schools found... Time for a musical break! 🎸'}
        />
      ) : schools.length > 0 ? (
        <Grid sx={{ width: '100%' }}>
          <LNSDataGrid rows={schools} columns={columns} />
        </Grid>
      ) : (
        <MusicLoader />
      )}

      {open && (
        <CreateOrUpdateSchool
          open={open}
          onClose={() => setOpen(false)}
          school={school}
        />
      )}
    </Grid>
  );
};

export default SchoolList;
