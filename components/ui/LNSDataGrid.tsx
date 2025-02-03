import { DataGrid, GridColDef } from '@mui/x-data-grid';
import theme from '@/theme';

interface LNSDataGridProps<T> {
  rows: T[];
  columns: GridColDef[];
}

const LNSDataGrid = <T extends object>({
  rows,
  columns,
}: LNSDataGridProps<T>) => {
  const customColumns: GridColDef[] = columns.map((col) => ({
    ...col,
    headerClassName: 'header-cell', // Apply custom header styling
    cellClassName: 'cell', // Apply custom cell styling
    sortable: true, // Enable sorting
    filterable: true, // Enable filtering if necessary
    headerAlign: 'left', // Center-align header text
    align: 'left', // Left-align cell text
  }));

  return (
    <DataGrid
      rows={rows}
      columns={customColumns}
      pageSizeOptions={[10, 20]}
      disableRowSelectionOnClick
      columnVisibilityModel={{ id: false }}
      sx={{
        height: 'auto',
        width: '100%',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          fontWeight: 'bold',
        },
        '& .MuiDataGrid-row': {
          '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        '& .MuiDataGrid-cell': {
          padding: '8px',
          borderBottom: '1px solid #f0f0f0',
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        },
        '& .MuiCheckbox-root': {
          color: theme.palette.primary.main,
        },
        '& .MuiPagination-root': {
          color: 'white', // Ensure pagination controls are white
        },
        '& .MuiDataGrid-pager': {
          color: 'white', // Make pager text white
        },
      }}
    />
  );
};

export default LNSDataGrid;
