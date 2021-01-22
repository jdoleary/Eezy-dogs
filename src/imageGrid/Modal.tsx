import React, { useState } from 'react';
import { Dialog, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SelectPairs } from '../store';

export default function Modal() {

  const [isModalOpen, setIsModalOpen] = useState(true);
  const pairs = useSelector(SelectPairs);
  return (<Dialog
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <Box p={4}>{JSON.stringify(pairs)}</Box>
        </Dialog>
  )
}