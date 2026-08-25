import { useState } from 'react';
import {
  Activity,
  Trash2,
  Calculator,
  Scale,
  Ruler,
  Apple,
  Dumbbell,
  Moon,
  Droplets,
  Brain,
  HeartPulse,
  Salad,
  Bike,
  Wheat,
  Soup,
  ShieldCheck,
} from 'lucide-react';

type Category = {
  label: string;
  range: string;
  color: string;
  bg: string;
  ring: string;
};

type Tip = {
  icon: typeof Apple;
  title: string;
  text: string;
  color: string;
  bg: string;
  ring: string;
};

const CATEGORIES: Category[] = [
  { label: 'Underweight', range: 'Below 18.5', color: 'text-sky-700', bg: 'bg-sky-50', ring: 'ring-sky-200' },
  { label: 'Normal weight', range: '18.5 – 24.9', color: 'text-emerald-700', bg: 'bg-emerald-50', ring: 'ring-emerald-200' },
  { label: 'Overweight', range: '25 – 29.9', color: 'text-amber-700', bg: 'bg-amber-50', ring: 'ring-amber-200' },
  { label: 'Obesity', range: '30 or above', color: 'text-rose-700', bg: 'bg-rose-50', ring: 'ring-rose-200' },
];

const GENERAL_TIPS: Tip[] = [
  { icon: Apple, title: 'Eat Balanced Meals', text: 'Fill half your plate with fruits and vegetables, a quarter with lean protein, and a quarter with whole grains.', color: 'text-rose-600', bg: 'bg-rose-50', ring: 'ring-rose-100' },
  { icon: Dumbbell, title: 'Stay Active', text: 'Aim for at least 30 minutes of moderate exercise most days of the week.', color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-100' },
  { icon: Moon, title: 'Sleep Well', text: 'Get 7–9 hours of quality sleep each night to support recovery and metabolism.', color: 'text-indigo-600', bg: 'bg-indigo-50', ring: 'ring-indigo-100' },
  { icon: Droplets, title: 'Stay Hydrated', text: 'Drink plenty of water throughout the day — about 2 liters for most adults.', color: 'text-cyan-600', bg: 'bg-cyan-50', ring: 'ring-cyan-100' },
  { icon: Brain, title: 'Manage Stress', text: 'Practice mindfulness, deep breathing, or hobbies to keep stress in check.', color: 'text-violet-600', bg: 'bg-violet-50', ring: 'ring-violet-100' },
  { icon: HeartPulse, title: 'Limit Processed Foods', text: 'Reduce added sugars, excess sodium, and highly processed snacks.', color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
];

const UNDERWEIGHT_TIPS: Tip[] = [
  { icon: Wheat, title: 'Nutrient-Dense Foods', text: 'Choose calorie-rich, nutritious foods like nuts, avocados, whole grains, and healthy oils.', color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-100' },
  { icon: Salad, title: 'Eat More Often', text: 'Add 5–6 smaller meals throughout the day instead of 3 large ones.', color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
  { icon: Dumbbell, title: 'Strength Training', text: 'Build muscle mass with resistance exercises 2–3 times per week.', color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-100' },
  { icon: Soup, title: 'Protein at Every Meal', text: 'Include lean protein, eggs, dairy, or legumes to support healthy weight gain.', color: 'text-rose-600', bg: 'bg-rose-50', ring: 'ring-rose-100' },
];

const NORMAL_TIPS: Tip[] = [
  { icon: Apple, title: 'Maintain Your Habits', text: 'Keep eating balanced meals and staying active to preserve your healthy weight.', color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
  { icon: Bike, title: 'Mix Up Your Activity', text: 'Combine cardio, strength, and flexibility work for well-rounded fitness.', color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-100' },
  { icon: Moon, title: 'Prioritize Recovery', text: 'Rest days and good sleep are just as important as exercise.', color: 'text-indigo-600', bg: 'bg-indigo-50', ring: 'ring-indigo-100' },
  { icon: ShieldCheck, title: 'Regular Check-ups', text: 'Keep up with routine health screenings even when you feel great.', color: 'text-teal-600', bg: 'bg-teal-50', ring: 'ring-teal-100' },
];

const OVERWEIGHT_TIPS: Tip[] = [
  { icon: Apple, title: 'Watch Portions', text: 'Use smaller plates and be mindful of serving sizes to manage calories.', color: 'text-rose-600', bg: 'bg-rose-50', ring: 'ring-rose-100' },
  { icon: Bike, title: 'Move More Daily', text: 'Aim for 150+ minutes of moderate activity per week — walking counts!', color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-100' },
  { icon: Droplets, title: 'Swap Sugary Drinks', text: 'Replace soda and juice with water or unsweetened beverages.', color: 'text-cyan-600', bg: 'bg-cyan-50', ring: 'ring-cyan-100' },
  { icon: Wheat, title: 'Choose Whole Foods', text: 'Focus on fiber-rich vegetables, whole grains, and lean proteins.', color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-100' },
];

const OBESITY_TIPS: Tip[] = [
  { icon: ShieldCheck, title: 'Consult a Professional', text: 'Work with a doctor or dietitian to build a safe, personalized plan.', color: 'text-teal-600', bg: 'bg-teal-50', ring: 'ring-teal-100' },
  { icon: Apple, title: 'Start with Small Changes', text: 'Gradually reduce portions and add more vegetables to every meal.', color: 'text-rose-600', bg: 'bg-rose-50', ring: 'ring-rose-100' },
  { icon: Bike, title: 'Low-Impact Activity', text: 'Begin with walking, swimming, or cycling to protect your joints.', color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-100' },
  { icon: Brain, title: 'Build Sustainable Habits', text: 'Focus on long-term lifestyle changes rather than quick fixes.', color: 'text-violet-600', bg: 'bg-violet-50', ring: 'ring-violet-100' },
];

function categorize(bmi: number): Category {
  if (bmi < 18.5) return CATEGORIES[0];
  if (bmi < 25) return CATEGORIES[1];
  if (bmi < 30) return CATEGORIES[2];
  return CATEGORIES[3];
}

function tipsForCategory(category: Category | null): Tip[] {
  if (!category) return GENERAL_TIPS;
  switch (category.label) {
    case 'Underweight': return UNDERWEIGHT_TIPS;
    case 'Normal weight': return NORMAL_TIPS;
    case 'Overweight': return OVERWEIGHT_TIPS;
    case 'Obesity': return OBESITY_TIPS;
    default: return GENERAL_TIPS;
  }
}

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      setError('Please enter valid height and weight.');
      setBmi(null);
      return;
    }
    const meters = h / 100;
    setBmi(w / (meters * meters));
    setError('');
  };

  const clear = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setError('');
  };

  const category = bmi !== null ? categorize(bmi) : null;
  const tips = tipsForCategory(category);
  const tipsHeading = category
    ? `Tips for ${category.label}`
    : 'Healthy Lifestyle Tips';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-8 sm:px-8 sm:py-10 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-2xl p-2.5 ring-1 ring-white/30">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">BMI Calculator</h1>
                <p className="text-blue-50 text-sm mt-0.5">Know your body mass index</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-7 sm:px-8 sm:py-8 space-y-5">
            {/* Height */}
            <div>
              <label htmlFor="height" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Ruler className="w-4 h-4 text-blue-600" /> Height (cm)
              </label>
              <input
                id="height"
                type="number"
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 170"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="weight" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Scale className="w-4 h-4 text-emerald-600" /> Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 65"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={calculate}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition shadow-md shadow-blue-200/50"
              >
                <Calculator className="w-5 h-5" /> Calculate BMI
              </button>
              <button
                onClick={clear}
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-medium px-4 py-3 rounded-xl hover:bg-slate-200 active:scale-[0.98] transition"
                aria-label="Clear"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-rose-600 bg-rose-50 rounded-lg px-4 py-2.5 ring-1 ring-rose-100">{error}</p>
            )}

            {/* Result */}
            {bmi !== null && category && (
              <div className={`rounded-2xl ${category.bg} ring-1 ${category.ring} p-5 animate-[fadeIn_0.3s_ease]`}>
                <p className="text-sm text-slate-500 font-medium">Your BMI</p>
                <p className="text-4xl font-bold text-slate-800 mt-1">{bmi.toFixed(1)}</p>
                <div className="mt-3 pt-3 border-t border-slate-200/60">
                  <p className={`text-lg font-semibold ${category.color}`}>{category.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Category range: {category.range}</p>
                </div>
              </div>
            )}

            {/* Reference */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <div key={c.label} className={`${c.bg} rounded-lg px-3 py-2 ring-1 ${c.ring}`}>
                    <p className={`text-xs font-semibold ${c.color}`}>{c.label}</p>
                    <p className="text-[11px] text-slate-500">{c.range}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Healthy Lifestyle Tips */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <HeartPulse className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-slate-700">{tipsHeading}</h2>
              </div>
              <div className="space-y-2.5">
                {tips.map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <div
                      key={tip.title}
                      className={`flex gap-3 ${tip.bg} rounded-xl p-3 ring-1 ${tip.ring} transition hover:shadow-sm`}
                    >
                      <div className={`shrink-0 ${tip.bg} rounded-lg p-2 ring-1 ${tip.ring}`}>
                        <Icon className={`w-5 h-5 ${tip.color}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${tip.color}`}>{tip.title}</p>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{tip.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          BMI is a screening tool and does not diagnose body fatness or health.
        </p>
      </div>
    </div>
  );
}

export default App;
