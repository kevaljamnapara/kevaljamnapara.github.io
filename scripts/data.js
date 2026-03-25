// Project data for the portfolio
const projects = [
    {
        id: 1,
        featured: true,
        name: "AI Chatbot (Gemini LLM)",
        description: "A context-aware conversational AI that handles multi-turn dialogue using Google's Gemini Pro API — with dynamic response generation, custom prompt engineering, and proper error handling.",
        bullets: [
            "Integrated Gemini Pro API with context-window management for coherent multi-turn conversations",
            "Built custom prompt engineering layer to control response style and output format",
            "Handles edge cases: API rate limiting, empty responses, and malformed input"
        ],
        technologies: ["Python", "Google Gemini API", "REST API", "NLP"],
        githubUrl: "https://github.com/kevaljamnapara/Chatbot-using-LLM-like-Gemini",
        liveUrl: null,
        status: "Completed",
        image: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`
    },
    {
        id: 2,
        featured: false,
        name: "Disease Prediction ML",
        description: "Predicts likely diseases from patient symptoms using an ensemble of 3 ML algorithms — built and evaluated end-to-end.",
        bullets: [
            "Trained Decision Tree, Random Forest, and Naive Bayes models on symptom-disease dataset",
            "Implemented full preprocessing pipeline: encoding, null handling, feature selection, train/test split",
            "Evaluated all 3 models with accuracy, precision, and recall metrics — selected best-performing for output"
        ],
        technologies: ["Python", "scikit-learn", "Pandas", "NumPy", "Jupyter"],
        githubUrl: "https://github.com/kevaljamnapara/disease-prediction-ml",
        liveUrl: null,
        status: "Completed",
        image: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>`
    },
    {
        id: 3,
        featured: false,
        name: "Weather App",
        description: "Real-time weather application with 5-day forecast, city search, and favorites system. Features glassmorphic design, air quality metrics (UV index, wind speed, visibility), and localStorage persistence.",
        bullets: [
            "Fetches live data from WeatherAPI \u2014 UV index, wind speed, visibility, and air quality index displayed in real time",
            "Glassmorphic UI design with full mobile responsiveness and smooth CSS transitions",
            "City search with favorites system persisted via localStorage \u2014 no backend required"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "WeatherAPI"],
        githubUrl: "https://github.com/kevaljamnapara/weather-app",
        liveUrl: "https://kevaljamnapara.github.io/weather-app/",
        status: "Completed",
        image: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sun"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg>`
    },
    {
        id: 4,
        featured: false,
        name: "Streamlit Bank Management",
        description: "Interactive digital banking dashboard with loan management, overdraft functionality, and admin analytics. Built with Streamlit for rapid development, featuring data visualization and real-time transaction processing.",
        bullets: [
            "Built multi-role dashboard \u2014 separate user and admin views with real-time transaction processing logic",
            "Implemented overdraft detection and loan eligibility calculation functions in Python",
            "Data visualizations: balance history, transaction trends, and account analytics via Streamlit charts"
        ],
        technologies: ["Python", "Streamlit", "Data Visualization", "Analytics"],
        githubUrl: "https://github.com/kevaljamnapara/streamlit-bank-management-system",
        liveUrl: null,
        status: "Completed",
        image: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><rect width="4" height="7" x="7" y="10" rx="1"/><rect width="4" height="12" x="15" y="5" rx="1"/></svg>`
    }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects };
}
