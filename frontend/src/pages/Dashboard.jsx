import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard">

      <div className="navbar">

        <h2>SkillBridge AI</h2>

        <div className="nav-right">

          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Sign Out
          </button>

        </div>

      </div>

      <div className="welcome-section">

        <h1>
          {greeting}, {user?.name} 👋
        </h1>

        <p>
          Transform your study materials into
          personalized assessments, identify
          weak topics, and receive an AI-powered
          roadmap for improvement.
        </p>

      </div>

      <div className="card-container">

        <div className="card" onClick={() => navigate("/upload")}>
            <h3>📚 Learning Materials</h3>
                <p>
                    Upload notes, PDFs, presentations,
                    or study resources for analysis.
                </p>
            </div>

        <div className="card">
          <h3>📝 Smart Assessment</h3>
          <p>
            Generate AI-powered quizzes and
            evaluate your understanding.
          </p>
        </div>

        <div className="card">
          <h3>📊 Knowledge Gap Analysis</h3>
          <p>
            Identify weak concepts and measure
            your learning progress.
          </p>
        </div>

        <div className="card">
          <h3>🎯 Personalized Roadmap</h3>
          <p>
            Receive a customized study plan
            focused on your improvement areas.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;