import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const cards = [
  {
    title: "Total Balance",
    value: "₹75,340",
    change: "+2.5%",
    positive: true,
    icon: Wallet,
  },
  {
    title: "Income",
    value: "₹1,20,000",
    change: "+5.2%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Expenses",
    value: "₹44,660",
    change: "-1.8%",
    positive: false,
    icon: TrendingDown,
  },
];

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="relative flex flex-col bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition min-h-35"
          >
            {/* Center Content */}
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <div className="p-3 rounded-xl bg-gray-100 mb-3">
                <Icon className="w-10 h-10 text-gray-700" />
              </div>

              <h4 className="text-sm font-bold text-blue-700">{card.title}</h4>

              <p className="text-2xl font-semibold text-gray-100 mt-1">
                {card.value}
              </p>
            </div>

            {/* Bottom-left Change Badge */}
            <div className="absolute bottom-4 left-4">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  card.positive
                    ? "bg-green-200 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {card.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
