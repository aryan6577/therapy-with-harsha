import harsha from "../assets/harsha.jpeg";


function AboutContent({ onBookAppointment }) {
  

  

  return (
    <div style={{ color: "#555" }}>
      {/* Hero Section */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <img
          src={harsha}
          alt="Harsha Aman"
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 15px 40px rgba(0,0,0,.18)",
            marginBottom: "25px",
          }}
        />

        <h1
          style={{
            color: "#47685F",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Harsha Aman
        </h1>

        <p
          style={{
            color: "#7E9A90",
            fontSize: "20px",
            marginBottom: "25px",
          }}
        >
          Psychologist • Counselor
        </p>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            color: "#666",
            lineHeight: "1.8",
            fontSize: "18px",
            fontStyle: "italic",
          }}
        >
          "Creating a safe, supportive space where healing,
          self-discovery, and personal growth begin."
        </p>
      </div>

      <h2 style={headingStyle}>🌿 Hello, I'm Harsha</h2>

      <p style={paragraphStyle}>
        Hi, I'm <strong>Harsha Aman</strong>—a psychologist, counselor,
        coffee enthusiast, and someone who is endlessly fascinated by people
        and their stories.
      </p>

      <p style={paragraphStyle}>
        I hold a Master's degree in Psychology and currently work as a School
        Counselor, supporting students in understanding themselves,
        navigating challenges, and developing the emotional skills they need
        to thrive.
      </p>

      <p style={paragraphStyle}>
        Alongside my work in schools, I also offer private counseling sessions
        for young adults, helping them navigate concerns such as stress,
        anxiety, self-esteem, relationships, life transitions, and personal
        growth.
      </p>

      <Divider />

      <h2 style={headingStyle}>🧠 My Journey in Psychology</h2>

      <p style={paragraphStyle}>
        My journey in psychology has always been driven by curiosity. I love
        exploring why people think, feel, and behave the way they do, and I
        believe that self-awareness is one of the most powerful tools for
        personal growth.
      </p>

      <p style={paragraphStyle}>
        This passion extends beyond my work. I am constantly learning through
        books, courses, workshops, and conversations that deepen my
        understanding of human behavior and emotional well-being.
      </p>

      <Divider />

      <h2 style={headingStyle}>☕ Beyond the Therapy Room</h2>

      <p style={paragraphStyle}>
        Outside of psychology, you'll often find me with a cup of coffee in
        hand, reading, journaling, or rewatching one of my comfort shows.
      </p>

      <p style={paragraphStyle}>
        Whether it's the warmth of <strong>Gilmore Girls</strong>, the sense
        of belonging in <strong>Friends</strong>, or the beautifully imperfect
        family dynamics of <strong>Modern Family</strong>, these stories remind
        me of something I value deeply: <strong>human connection</strong>.
      </p>

      <p style={paragraphStyle}>
        They capture the humor, complexity, vulnerability, and resilience that
        make relationships meaningful—qualities that inspire both my personal
        life and my work as a psychologist.
      </p>

      <Divider />

      <h2 style={headingStyle}>💚 My Approach</h2>

      <p style={paragraphStyle}>
        At the heart of my work is the belief that everyone deserves a space
        where they can be authentic, reflect without judgment, and feel
        supported through life's uncertainties.
      </p>

      <p style={paragraphStyle}>
        Whether I am working with a student, a young adult, or facilitating a
        workshop, my goal is to help people better understand themselves,
        build emotional resilience, and cultivate healthier relationships
        with themselves and others.
      </p>

      <Divider />

      <h2 style={headingStyle}>🌱 What I Believe</h2>

      <p style={paragraphStyle}>
        I believe growth doesn't always come from grand transformations.
      </p>

      <p style={paragraphStyle}>
        Sometimes it begins with a conversation, a moment of reflection, a
        supportive relationship, or even a quiet evening with a favorite show
        and a good cup of coffee.
      </p>

      <p style={paragraphStyle}>
        Through this space, I hope to share insights, reflections, and
        psychological perspectives that encourage curiosity,
        self-discovery, and a little more compassion—for ourselves and for
        others.
      </p>

      <div
        style={{
          marginTop: "70px",
          background: "#F7F5F2",
          borderRadius: "20px",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#47685F",
            marginBottom: "20px",
          }}
        >
          🤍 I'm Glad You're Here
        </h2>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto 35px",
            lineHeight: "1.9",
            fontSize: "17px",
          }}
        >
          Whether you're here to seek support, gain a deeper understanding of
          yourself, or simply explore what therapy can offer, I'm glad you're
          here. I look forward to being a part of your journey.
        </p>

        <button
  onClick={onBookAppointment}
          style={{
            background: "#47685F",
            color: "white",
            border: "none",
            padding: "16px 40px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "600",
          }}
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
}

const headingStyle = {
  color: "#47685F",
  fontSize: "30px",
  marginBottom: "20px",
};

const paragraphStyle = {
  lineHeight: "2",
  fontSize: "18px",
  marginBottom: "18px",
};

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #ECECEC",
        margin: "45px 0",
      }}
    />
  );
}

export default AboutContent;