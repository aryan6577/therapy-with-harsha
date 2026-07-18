function WhyChooseMe() {
  const features = [
    {
      title: "Personalized Care",
      description:
        "Every therapy plan is tailored to your unique goals, challenges, and journey.",
      icon: "🌿",
    },
    {
      title: "Confidential Sessions",
      description:
        "A safe, private, and judgment-free environment where your privacy is respected.",
      icon: "🔒",
    },
    {
      title: "Evidence-Based Therapy",
      description:
        "Modern therapeutic techniques backed by research and clinical experience.",
      icon: "🧠",
    },
    {
      title: "Flexible Support",
      description:
        "Convenient online and in-person sessions designed around your schedule.",
      icon: "🤝",
    },
  ];

  return (
    <section
      id="why-choose-me"
      style={{
        scrollMarginTop: "100px",
        backgroundColor: "#FAF7F2",
        padding: "100px 80px",
      }}
    >
      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "70px",
        }}
      >
        <h4
          style={{
            color: "#7E9A90",
            letterSpacing: "2px",
            marginBottom: "15px",
          }}
        >
          WHY CHOOSE ME
        </h4>

        <h2
          style={{
            fontSize: "52px",
            color: "#47685F",
            marginBottom: "20px",
          }}
        >
          Support You Can Trust
        </h2>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            color: "#5F6468",
            lineHeight: "1.8",
            fontSize: "18px",
          }}
        >
          Creating a safe, compassionate, and empowering space where healing
          and personal growth can flourish.
        </p>
      </div>

      {/* Features */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "25px",
        }}
      >
        {features.map((item, index) => (
          <div
  key={index}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-10px)";
    e.currentTarget.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.10)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 5px 20px rgba(0,0,0,0.05)";
  }}
  style={{
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    transition: "all 0.35s ease",
    cursor: "pointer",
  }}
>
            <div
              style={{
                fontSize: "42px",
                marginBottom: "20px",
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                color: "#47685F",
                marginBottom: "15px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#5F6468",
                lineHeight: "1.7",
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseMe;