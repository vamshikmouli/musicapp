'use client';

import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import LNSButton from '@/components/ui/LNSButton';
import { ISchool } from '@/actions/enities/school';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  deleteSchool,
  getAllSchools,
  getSchoolById,
} from '@/actions/school/route';
import CreateOrUpdateSchool from './CreateOrUpdateSchool';
import LNSDataGrid from '@/components/ui/LNSDataGrid';
import Header from '@/components/ui/Header';

const SchoolList = () => {
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [open, setOpen] = useState(false);
  const [school, setSchool] = useState<ISchool | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      setSchools(await getAllSchools());
    };
    fetchSchools();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', flex: 0, hideable: true },
    { field: 'name', headerName: 'School Name', width: 250 },
    { field: 'location', headerName: 'City/Area', width: 200 },
    { field: 'students', headerName: 'Students', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
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
    const school = await getSchoolById(id);
    if (!school) return;
    setSchool(school);
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
      <Header title="School List" />
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
      <Grid sx={{ width: '100%' }}>
        <LNSDataGrid rows={schools} columns={columns} />
      </Grid>
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
