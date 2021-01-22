import React, { useState, useEffect } from 'react';
import { Dialog, GridList, GridListTile } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SelectImages } from '../store';

export default function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = useSelector(SelectImages);
  useEffect(() => {
    if(images.length !== 0){
      setIsModalOpen(true)
    }
  }, [images])
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <GridList cellHeight={160} cols={3}>
        {images.map((img) => (
          <GridListTile key={img} cols={1}>
            <img src={img} />
          </GridListTile>
        ))}
      </GridList>
    </Dialog>
  );
}
