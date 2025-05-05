import { CheckCircle2, Crown } from "lucide-react";

const PricingPlans = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50" id="pricing">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get your resume ranked and improved with our AI-powered tools
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-emerald-300 transition-all duration-300">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Basic</h3>
              <p className="text-gray-600 mb-6">Essential resume analysis</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$5</span>
                <span className="text-gray-500"> / one-time</span>
              </div>

              <ul className="space-y-3 text-left">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Resume score & ranking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>3 key improvement suggestions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>ATS compatibility check</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <CheckCircle2 className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                  <span>No premium suggestions</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <CheckCircle2 className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                  <span>No job-specific optimization</span>
                </li>
              </ul>
            </div>

            <div className="px-6 pb-6">
              <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300">
                Get Basic Plan
              </button>
            </div>
          </div>

          {/* Premier Plan */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-emerald-400 relative">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center">
              <Crown className="h-4 w-4 mr-1" />
              <span>Coming Soon!</span>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Premier</h3>
              <p className="text-gray-600 mb-6">Complete resume optimization</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$10</span>
                <span className="text-gray-500"> / one-time</span>
              </div>

              <ul className="space-y-3 text-left">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Everything in Basic, plus:</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>10+ detailed improvement suggestions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Job-specific optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Keyword optimization for ATS</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>

            <div className="px-6 pb-6">
              <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300">
                Get Premier Plan
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          Both plans include one-time analysis with no recurring charges.
        </p>
      </div>
    </section>
  );
};

export default PricingPlans;
