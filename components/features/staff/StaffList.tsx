'use client';

import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import LNSButton from '@/components/ui/LNSButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LNSDataGrid from '@/components/ui/LNSDataGrid';
import Header from '@/components/ui/Header';
import MusicLoader from '@/components/ui/MusicLoader';
import EmptyCard from '@/components/ui/EmptyCard';
import { Staff } from '@prisma/client';
import CreateorUpdateStaff from './CreateorUpdateStaff';
import { format } from 'date-fns';
import { deleteStaff, getAllStaff, getStaffById } from '@/actions/staffService';
import { useNotification } from '@/context/NotificationContext';

const StaffList = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchStaffs = async () => {
      setLoading(true);
      const response = await getAllStaff();
      setStaffs(response);
      setLoading(false);
    };
    fetchStaffs();
  }, [open]);

  const columns: GridColDef[] = [
    { field: 'id', flex: 0, hideable: true },
    { field: 'name', headerName: 'Staff Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'staffId', headerName: 'Staff Id', width: 150 },
    {
      field: 'joiningDate',
      headerName: 'Joined Date',
      width: 200,
      renderCell: (params) => {
        if (!params.value) return '';
        return format(new Date(params.value), 'dd-MMM-yyyy');
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
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
    const response = await getStaffById(id);
    if (!response) return;
    setStaff(response);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this staff?'
    );
    if (!confirm) return;
    const res = deleteStaff(id);
    showNotification(`Staff deleted successfully`, 'success');
    if (!res) return;
    setStaffs((prevStaffs) => prevStaffs.filter((staff) => staff.id !== id));
  };

  return (
    <Grid container spacing={2} sx={{ height: 400, width: '100%', p: 3 }}>
      <Header title="Staffs" totalCount={staffs.length} />
      <Grid container size={12} justifyContent="flex-end">
        <LNSButton
          variant="contained"
          color="primary"
          onClick={() => {
            setStaff(null);
            setOpen(true);
          }}
        >
          Add Staff
        </LNSButton>
      </Grid>
      {!loading && staffs.length === 0 ? (
        <EmptyCard
          title={'No staff Found'}
          message={'No staff found... Time for a musical break! 🎸'}
        />
      ) : staffs.length > 0 ? (
        <Grid sx={{ width: '100%' }}>
          <LNSDataGrid rows={staffs} columns={columns} />
        </Grid>
      ) : (
        <MusicLoader />
      )}

      {open && (
        <CreateorUpdateStaff
          open={open}
          onClose={() => setOpen(false)}
          staff={staff}
        />
      )}
    </Grid>
  );
};

export default StaffList;
