import React, { FC } from "react";
import { LoadingButton } from "@mui/lab";

interface IProps {
  label: string;
  type: "submit" | "button";
  loading: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
}

function LoadingButtonElement({
  label,
  type,
  onClick,
  onSubmit,
  loading,
}: IProps) {
  return (
    <LoadingButton
      variant="contained"
      size="large"
      color="primary"
      sx={{ mt: 1, width: 100, color: "background.default" }}
      loading={loading}
      loadingPosition="center"
      type={type}
      onSubmit={onSubmit}
      onClick={onClick}
    >
      {label}
    </LoadingButton>
  );
}

export default LoadingButtonElement;
