import React from 'react';


interface SnackbarProps {
    message: string;
  }

  const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
    return <div className="snackbar">{message}</div>;
  };

export default Snackbar;