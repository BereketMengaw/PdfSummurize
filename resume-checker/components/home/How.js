import { UploadCloud, BrainCircuit, ClipboardCheck } from "lucide-react";

const ResumeRankingSteps = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-1 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-600 font-medium px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            How it works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Transform your resume into a{" "}
            <span className="text-emerald-600">ranked</span> and{" "}
            <br className="hidden sm:block" />
            <span className="text-emerald-600">reviewed</span> document in three
            simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Upload Resume */}
          <div className="group flex flex-col items-center">
            <div className="bg-white p-1 rounded-full shadow-sm group-hover:shadow-emerald-100 transition-all duration-300 mb-4">
              <div className="bg-emerald-100 p-4 rounded-full group-hover:bg-emerald-200 transition-all duration-300">
                <UploadCloud className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-xs border border-gray-100 w-full transition-all duration-300 group-hover:shadow-sm group-hover:border-emerald-100">
              <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                Step 1
              </span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Upload Your Resume
              </h4>
              <p className="text-gray-600 text-sm">
                Simply drag and drop your resume document or click to upload.
              </p>
            </div>
          </div>

          {/* Step 2: AI Analysis */}
          <div className="group flex flex-col items-center">
            <div className="bg-white p-1 rounded-full shadow-sm group-hover:shadow-emerald-100 transition-all duration-300 mb-4">
              <div className="bg-emerald-100 p-4 rounded-full group-hover:bg-emerald-200 transition-all duration-300">
                <BrainCircuit className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-xs border border-gray-100 w-full transition-all duration-300 group-hover:shadow-sm group-hover:border-emerald-100">
              <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                Step 2
              </span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                AI Analysis
              </h4>
              <p className="text-gray-600 text-sm">
                Our AI processes and analyzes your resume instantly.
              </p>
            </div>
          </div>

          {/* Step 3: Results & Recommendations */}
          <div className="group flex flex-col items-center">
            <div className="bg-white p-1 rounded-full shadow-sm group-hover:shadow-emerald-100 transition-all duration-300 mb-4">
              <div className="bg-emerald-100 p-4 rounded-full group-hover:bg-emerald-200 transition-all duration-300">
                <ClipboardCheck className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-xs border border-gray-100 w-full transition-all duration-300 group-hover:shadow-sm group-hover:border-emerald-100">
              <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                Step 3
              </span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Results & Recommendations
              </h4>
              <p className="text-gray-600 text-sm">
                Get a ranked score and improvement suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeRankingSteps;
