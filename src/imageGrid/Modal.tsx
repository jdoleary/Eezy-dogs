import React, { useState, useEffect } from 'react';
import { Dialog, GridList, GridListTile, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SelectImages } from '../store';

export default function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = useSelector(SelectImages);
  useEffect(() => {
    if (images.length !== 0) {
      setIsModalOpen(true);
    }
  }, [images]);
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <Box p={2}>
        <GridList cellHeight={160}>
          {shuffle(images).map((img) => (
            <GridListTile key={img}>
              <img src={img} />
            </GridListTile>
          ))}
        </GridList>
      </Box>
    </Dialog>
  );
}

// from: https://stackoverflow.com/a/6274381/4418836
function shuffle(array: string[]): string[] {
  const arrayCopy = [...array];
  var j, x, i;
  for (i = arrayCopy.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = x;
  }
  return arrayCopy;
}
