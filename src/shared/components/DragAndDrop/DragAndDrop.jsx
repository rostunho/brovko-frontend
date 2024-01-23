const handleDragStart = (e, index) => {
  e.dataTransfer.setData('text/plain', index);
};

const handleDragOver = e => {
  e.preventDefault();
};

const handleDrop = (e, toIndex) => {
  e.preventDefault();

  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
  const updatedPictures = [...selectedPictures];
  const [movedPictures] = updatedPictures.splice(fromIndex, 1);
  updatedPictures.splice(toIndex, 0, movedPictures);
  setSelectedPictures(updatedPictures);
};


