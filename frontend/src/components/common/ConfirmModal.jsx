function ConfirmModal({

  open,

  title,

  message,

  confirmText = "Confirm",

  cancelText = "Cancel",

  onConfirm,

  onCancel,

}) {

  if (!open) return null;

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >

      <div
        style={{
          width: "420px",
          background: "white",
          borderRadius: "18px",
          padding: "30px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,.25)",
        }}
      >

        <h2
          style={{
            marginTop: 0,
            color: "#47685F",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "30px",
          }}
        >

          <button
            onClick={onCancel}
            style={{
              background: "#EEE",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            style={{
              background: "#47685F",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>

  );

}

export default ConfirmModal;