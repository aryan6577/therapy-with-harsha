function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      text: "Therapy with Harsha helped me manage anxiety and regain confidence. I always felt heard and supported.",
    },
    {
      name: "Rahul K.",
      text: "The sessions gave me practical tools to navigate stress and improve my relationships.",
    },
    {
      name: "Priya S.",
      text: "A compassionate and professional therapist. The experience has truly been life-changing.",
    },
  ];

  return (
    <section
      style={{
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
          TESTIMONIALS
        </h4>

        <h2
          style={{
            fontSize: "52px",
            color: "#47685F",
            marginBottom: "20px",
          }}
        >
          Kind Words From Clients
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
          Every healing journey is unique. Here are a few experiences shared
          by clients who found support and growth through therapy.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
        }}
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "20px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              ⭐⭐⭐⭐⭐
            </div>

            <p
              style={{
                color: "#5F6468",
                lineHeight: "1.8",
                marginBottom: "25px",
              }}
            >
              "{item.text}`
            </p>

            <h4
              style={{
                color: "#47685F",
              }}
            >
              {item.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;