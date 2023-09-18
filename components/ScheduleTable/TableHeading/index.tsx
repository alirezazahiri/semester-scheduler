import { TABLE_HEADER_TIME_LIST } from '@/constants/index.constants'
import React from 'react'
import { Typography, Grid } from '@mui/material';
import { e2p } from '@/utils/numbers';

function TableHeading() {
  return (
    <>
    {TABLE_HEADER_TIME_LIST.map((time, idx) => (
        <Grid
          key={time}
          item
          xs={(1 / TABLE_HEADER_TIME_LIST.length) * 12}
          sx={{
            border: "0.1px solid var(--border-primary-color)",
            display: "flex",
            alignItems: "center",
            p: 1,
            justifyContent: "space-around",
            wordBreak: "break-word",
          }}
        >
          {idx !== 0 ? (
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ textAlign: "center", fontSize: "0.75rem" }}
              color="primary.contrastText"
            >
              {e2p(time.split("-")[0])} تا {e2p(time.split("-")[1])}
            </Typography>
          ) : (
            <Typography
              component="p"
              variant="subtitle2"
              fontSize="14px"
              color="primary.contrastText"
            >
              {time}
            </Typography>
          )}
        </Grid>
      ))}
    </>
  )
}

export default TableHeading