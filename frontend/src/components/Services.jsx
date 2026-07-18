function Services() {
  const services = [
    {
      title: "Anxiety & Stress Therapy",
      description:
        "Learn practical coping strategies to manage anxiety, stress, and overwhelming emotions.",
      icon: "🧠",
    },
    {
      title: "Relationship Counselling",
      description:
        "Improve communication, rebuild trust, and strengthen meaningful relationships.",
      icon: "❤️",
    },
    {
      title: "Child & Adolescent Therapy",
      description:
        "Support children and teenagers through emotional, behavioral, and academic challenges.",
      icon: "🌱",
    },
    {
      title: "Family Therapy",
      description:
        "Create healthier family dynamics and resolve conflicts in a safe environment.",
      icon: "👨‍👩‍👧",
    },
  ];

  return (
    <section
    id="services"
      style={{
        scrollMarginTop: "10px",
        backgroundColor: "#F7F3EE",
        padding: "100px 80px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <h4
          style={{
            color: "#7E9A90",
            letterSpacing: "2px",
            marginBottom: "15px",
          }}
        >
          SERVICES
        </h4>

        <h2
          style={{
            fontSize: "52px",
            color: "#47685F",
            marginBottom: "20px",
          }}
        >
          How I Can Help
        </h2>

        <p
          style={{
            color: "#5F6468",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          Personalized therapy services designed to support your mental
          health, emotional well-being, and personal growth.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {services.map((service, index) => (
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
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    transition: "all 0.35s ease",
    cursor: "pointer",
  }}
>
            <div
              style={{
                fontSize: "40px",
                marginBottom: "20px",
              }}
            >
              {service.icon}
            </div>

            <h3
              style={{
                color: "#47685F",
                marginBottom: "15px",
                fontSize: "26px",
              }}
            >
              {service.title}
            </h3>

            <p
              style={{
                color: "#5F6468",
                lineHeight: "1.8",
                fontSize: "16px",
              }}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;