import { useEffect } from "react";

function AboutModal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        animation: "fadeIn .35s ease",
        padding: "30px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "900px",
          maxWidth: "95%",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: "24px",
          padding: "45px",
          position: "relative",
          animation: "slideUp .35s ease",
          boxShadow: "0 30px 70px rgba(0,0,0,.2)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            border: "none",
            background: "#47685F",
            color: "white",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ×
        </button>

        {children}
      </div>

      <style>{`
        @keyframes fadeIn{
          from{
            opacity:0;
          }
          to{
            opacity:1;
          }
        }

        @keyframes slideUp{
          from{
            opacity:0;
            transform:translateY(40px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AboutModal;