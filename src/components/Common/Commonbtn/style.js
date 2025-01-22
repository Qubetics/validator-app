const styles = {
  primaryButton: {
    display: "block",
    margin: "auto",
    fontWeight: "600",
    minWidth: "174px",
    border: "2px solid transparent",
    borderRadius: "28px",
    transition: "color 0.2s ease-out, filter 0.2s ease-out",
    "--bg": "#000",
    "--hover-bg": "var(--theme-gradients-main)",
    "--text": "#fff",
    "--hover-text": "#000",
    "&:hover": {
      opacity: "0.8",
    },
    fontWeight: "bold",
    borderRadius: "8px",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#565e64",
    },
    fontWeight: "bold",
    borderRadius: "8px",
  },
};

export default styles;
