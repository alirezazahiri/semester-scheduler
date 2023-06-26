import React, { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { SxProps, Theme } from "@mui/material";

interface IProps {
  label: string;
  type: "submit" | "button";
  loading: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant: "text" | "outlined" | "contained";
  size: "small" | "medium" | "large";
  textColor?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

function LoadingButtonElement({
  label,
  type,
  onClick,
  onSubmit,
  loading,
  color,
  variant,
  size,
  textColor,
  sx,
  disabled,
}: IProps) {
  return (
    <LoadingButton
      variant={variant}
      size={size}
      color={color}
      sx={{
        mt: 1,
        width: 100,
        color: textColor || "background.default",
        ...sx,
      }}
      loading={loading}
      loadingPosition="center"
      type={type}
      onSubmit={onSubmit}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </LoadingButton>
  );
}

export default LoadingButtonElement;
