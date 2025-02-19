'use client';

import { Tabs, Tab, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useSwipeable } from 'react-swipeable';

interface LNSTabsProps {
  tabs: { id: string; label: string }[];
  selectedTab: string;
  onTabChange: (newValue: string) => void;
  onAddButtonClick?: () => void;
  showAddButton?: boolean;
  addButtonLabel?: string;
}

const LNSTabs: React.FC<LNSTabsProps> = ({
  tabs,
  selectedTab,
  onTabChange,
  onAddButtonClick,
  showAddButton = false,
  addButtonLabel = 'Add',
}) => {
  // Swipe handlers for left and right swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = tabs.findIndex((tab) => tab.id === selectedTab);
      if (currentIndex < tabs.length - 1) {
        onTabChange(tabs[currentIndex + 1].id);
      }
    },
    onSwipedRight: () => {
      const currentIndex = tabs.findIndex((tab) => tab.id === selectedTab);
      if (currentIndex > 0) {
        onTabChange(tabs[currentIndex - 1].id);
      }
    },
    trackMouse: true,
  });

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...handlers}
    >
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => onTabChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          WebkitOverflowScrolling: 'touch',
          '& .MuiTabs-scroller': {
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} value={tab.id} />
        ))}
      </Tabs>

      {showAddButton && (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAddButtonClick}
        >
          {addButtonLabel}
        </Button>
      )}
    </Grid>
  );
};

export default LNSTabs;
