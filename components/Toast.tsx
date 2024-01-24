import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';

interface IProps {
    severity: any;
    message: string;
}

export default function Toast(props:IProps) {
  const [open, setOpen] = React.useState(false);
    useEffect(()=>setOpen(true), []);
//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar anchorOrigin={{vertical:"top", horizontal: "center"}} open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={props.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}