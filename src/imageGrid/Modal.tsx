import React, { useState, useEffect } from 'react';
import {
  Dialog,
  GridList,
  GridListTile,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SelectImages, SelectLoading, SelectError } from '../store';
import { Alert } from '@material-ui/lab';

export default function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = useSelector(SelectImages);
  const loading = useSelector(SelectLoading);
  const error = useSelector(SelectError);
  useEffect(() => {
    if (loading.images) {
      setIsModalOpen(true);
    }
    if (images.length !== 0) {
      setIsModalOpen(true);
    }
  }, [images, loading]);
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <Box p={2}>
        {error.images ? (
          <Alert variant="outlined" severity="error">
            {error.images}
          </Alert>
        ) : null}
        {loading.images ? (
          <CircularProgress />
        ) : (
          <GridList cellHeight={160}>
            {shuffle(images).map((img) => (
              <GridListTile key={img}>
                <img src={img} />
              </GridListTile>
            ))}
          </GridList>
        )}
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
