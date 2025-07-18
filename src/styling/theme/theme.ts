export const theme = {
  colors: {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    dark: "#1e293b",
    light: "#f8fafc",
    gray: "#94a3b8",
    grayLight: "#e2e8f0",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    background: "#f1f5f9",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
  },
  shadows: {
    sm: "0 2px 5px rgba(0,0,0,0.1)",
    md: "0 5px 15px rgba(0,0,0,0.15)",
  },
  transitions: {
    main: "all 0.3s ease",
  },
};

export type ThemeType = typeof theme;
