const styles = {
  primaryButton: {
    display: "block",
    margin: "auto",
    border: "2px solid transparent",
    background: `linear-gradient(180deg, var(--bg), var(--bg)) padding-box,
    conic-gradient(
      from 180deg at 50% 50%,
      #ff98e2,
      #ffc876 35.77deg,
      #79fff7 153.75deg,
      #9f53ff 258.75deg,
      #ff98e2 360deg
    ) border-box`,
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
