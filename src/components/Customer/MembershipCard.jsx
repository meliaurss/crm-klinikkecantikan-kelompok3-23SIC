// src/components/Customer/MembershipCard.jsx
export default function MembershipCard({ points, tier }) {
  const getTierColor = () => {
    switch(tier) {
      case 'Gold': return 'bg-yellow-500';
      case 'Silver': return 'bg-gray-400';
      case 'Platinum': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${getTierColor()} rounded-md p-3`}>
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Membership Tier
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {tier}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Points</span>
            <span>{points} / 1000</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${Math.min(100, (points / 1000) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
