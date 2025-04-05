export default function Home() {
  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center px-6 lg:px-20"
      id="/"
    >
      {/* AI Badge */}
      <div className="bg-emerald-100 text-emerald-700 px-4 py-1 m-3 rounded-full text-sm font-medium flex items-center gap-2">
        <span>🚀 Powered by AI</span>
      </div>
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center mt-6">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900">
            Get Your Resume Ranked & Improved with AI
          </h1>
          <p className="mt-4 text-gray-600">
            Upload your resume and get a{" "}
            <span className="text-emerald-600">detailed ranking score</span>{" "}
            with AI-powered{" "}
            <span className="text-emerald-500">improvement suggestions</span>.
            Optimize your resume and increase your chances of landing a job!
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-emerald-600 text-xl">📊</span>
              <p className="text-gray-700 font-medium">
                <span className="font-bold">AI Resume Ranking:</span> Get a
                ranking from Needs Improvement to Excellent.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-emerald-500 text-xl">🤖</span>
              <p className="text-gray-700 font-medium">
                <span className="font-bold">AI-Powered Suggestions:</span>{" "}
                Improve keywords, achievements, and formatting.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-emerald-400 text-xl">🚀</span>
              <p className="text-gray-700 font-medium">
                <span className="font-bold">Job-Specific Optimization:</span>{" "}
                Tailor your resume for a specific job posting.
              </p>
            </div>
          </div>

          <button className="mt-8 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-300">
            Upload Resume for Ranking
          </button>
        </div>

        {/* Right Section - Resume Ranking & Suggestions */}
        <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <div className="relative max-w-lg w-full bg-white shadow-lg rounded-lg p-6 border border-emerald-100">
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              AI Resume Ranking Report
            </h3>

            {/* Resume Ranking Display */}
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
              <p className="text-lg font-bold text-gray-800">
                ⭐ Resume Score:{" "}
                <span className="text-emerald-600">85% (Excellent)</span>
              </p>
              <p className="text-sm text-gray-700">
                Your resume ranks in the top 15% compared to similar job
                applicants.
              </p>
            </div>

            {/* AI-Powered Suggestions */}
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
              <h4 className="text-md font-semibold text-gray-800">
                🔍 AI Improvement Suggestions:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                <li>
                  Increase measurable achievements (e.g., &apos;Boosted sales by
                  20%&apos;).
                </li>
                <li>
                  Improve keyword optimization for better ATS compatibility.
                </li>
                <li>Enhance bullet points clarity & action verbs.</li>
                <li>Fix formatting inconsistencies for a cleaner look.</li>
              </ul>
            </div>

            {/* CTA */}
            <button className="mt-4 w-full px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-300">
              Improve Your Resume with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
