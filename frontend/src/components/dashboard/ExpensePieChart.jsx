import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// 1. Import your raw data
import transactions from "../../data/transactions"; 

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6", "#A855F7", "#EC4899"];

const ExpensePieChart = () => {
  
  // 2. Process the data dynamically
  const chartData = transactions
    .filter((t) => t.type.toLowerCase() === "expense") // Only take expenses
    .reduce((acc, current) => {
      // Look if the category already exists in our accumulator
      const existingCategory = acc.find((item) => item.name === current.category);

      if (existingCategory) {
        existingCategory.value += current.amount;
      } else {
        // If it's a new category, push it to the array
        acc.push({ name: current.category, value: current.amount });
      }
      return acc;
    }, [])
    // Optional: Sort by value so the largest slices appear first
    .sort((a, b) => b.value - a.value);

  return (
    <motion.div
      className="bg-[#1e293b] rounded-2xl shadow-md p-6 w-full h-100 border border-gray-700"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-4 text-blue-800">
        Expense Breakdown
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData} // 3. Use the processed data here
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderRadius: "12px",
              border: "1px solid #334155",
              color: "#fff"
            }}
            itemStyle={{ color: "#fff" }}
            formatter={(value) => `₹${value.toLocaleString()}`} // Formats as Currency
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ExpensePieChart;
