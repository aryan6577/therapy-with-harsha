import { useEffect } from "react";

function Toast({
  message,
  type = "success",
  onClose,
}) {

  useEffect(() => {

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  const colors = {
    success: "#16A34A",
    error: "#DC2626",
    warning: "#D97706",
    info: "#2563EB",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "25px",
        right: "25px",
        background: colors[type],
        color: "white",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 12px 25px rgba(0,0,0,.2)",
        fontWeight: "600",
        zIndex: 9999,
        minWidth: "280px",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;