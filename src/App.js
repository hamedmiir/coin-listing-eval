import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, Zap, UserPlus, Calculator } from 'lucide-react';

const CoinListingPredictor = () => {
  const [inputs, setInputs] = useState({
    MAU: 100000,
    conversionRate: 3,
    avgTrade: 5000000,
    hypeFactor: 1.2,
    newUsers: 1500,
    avgTradeNew: 2000000
  });

  const calculatePrediction = () => {
    const existingUsersVolume = inputs.MAU * (inputs.conversionRate / 100) * inputs.avgTrade * inputs.hypeFactor;
    const newUsersVolume = inputs.newUsers * inputs.avgTradeNew;
    const totalVolume = existingUsersVolume + newUsersVolume;
    
    const activeTraders = Math.round(inputs.MAU * (inputs.conversionRate / 100) * inputs.hypeFactor);
    const totalTraders = activeTraders + inputs.newUsers;
    const avgTransactionCount = 3.5;
    const totalTransactions = Math.round(totalTraders * avgTransactionCount);
    
    return {
      existingUsersVolume,
      newUsersVolume,
      totalVolume,
      activeTraders,
      totalTraders,
      totalTransactions,
      existingContribution: (existingUsersVolume / totalVolume) * 100,
      newContribution: (newUsersVolume / totalVolume) * 100
    };
  };

  const results = calculatePrediction();

  const generateDailyData = () => {
    const baseVolume = results.totalVolume / 7;
    const dailyMultipliers = [1.8, 1.5, 1.2, 1.0, 0.85, 0.75, 0.7];
    
    return dailyMultipliers.map((mult, index) => ({
      day: `روز ${index + 1}`,
      volume: Math.round((baseVolume * mult) / 1000000),
      traders: Math.round((results.totalTraders * mult * 0.7) / 7),
      transactions: Math.round((results.totalTransactions * mult) / 7)
    }));
  };

  const dailyData = generateDailyData();

  const contributionData = [
    { name: 'کاربران فعلی', value: results.existingUsersVolume, color: '#3b82f6' },
    { name: 'کاربران جدید', value: results.newUsersVolume, color: '#10b981' }
  ];

  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)} میلیارد`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)} میلیون`;
    }
    return value.toLocaleString();
  };

  const getHypeDescription = (hf) => {
    if (hf >= 1.8) return 'خیلی بالا - ترند اول بازار';
    if (hf >= 1.5) return 'بالا - کوین محبوب';
    if (hf >= 1.2) return 'متوسط - شناخته شده';
    if (hf >= 1.0) return 'پایین - شناخته نشده';
    return 'خیلی پایین';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              مدل پیش‌بینی لیستینگ کوین بیت‌پین
            </h1>
            <p className="text-gray-600">
              بر اساس فرمول: V<sub>w1</sub> = (MAU × C<sub>r</sub> × A<sub>t</sub> × H<sub>f</sub>) + (N<sub>u</sub> × A<sub>tn</sub>)
            </p>
          </div>

          {/* Formula Explanation */}
          <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <Calculator className="w-6 h-6 text-blue-600 ml-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">منطق مدل</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>بخش اول:</strong> حجم از کاربران فعلی = تعداد کاربران فعال × نرخ تبدیل × میانگین معامله × ضریب هیجان
                  <br />
                  <strong>بخش دوم:</strong> حجم از کاربران جدید = تعداد کاربران جدید × میانگین معامله آن‌ها
                </p>
              </div>
            </div>
          </div>

          {/* Input Parameters */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <Users className="w-6 h-6 ml-2 text-blue-600" />
                پارامترهای کاربران فعلی
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MAU - کاربران فعال ماهانه: {inputs.MAU.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={inputs.MAU}
                  onChange={(e) => setInputs({...inputs, MAU: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">تعداد کاربران فعال ماهانه بیت‌پین</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  C<sub>r</sub> - نرخ تبدیل: {inputs.conversionRate}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={inputs.conversionRate}
                  onChange={(e) => setInputs({...inputs, conversionRate: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">درصد کاربران فعلی که کوین جدید را معامله می‌کنند (۲-۵٪ معمول است)</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  A<sub>t</sub> - میانگین معامله: {formatCurrency(inputs.avgTrade)} تومان
                </label>
                <input
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="500000"
                  value={inputs.avgTrade}
                  onChange={(e) => setInputs({...inputs, avgTrade: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">میانگین حجم ریالی هر معامله در خرید آسان</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  H<sub>f</sub> - ضریب هیجان: {inputs.hypeFactor.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="2.0"
                  step="0.1"
                  value={inputs.hypeFactor}
                  onChange={(e) => setInputs({...inputs, hypeFactor: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {getHypeDescription(inputs.hypeFactor)}
                </p>
                <div className="mt-2 text-xs text-gray-600 space-y-1">
                  <p>• 1.0-1.2: هیجان پایین</p>
                  <p>• 1.2-1.5: هیجان متوسط</p>
                  <p>• 1.5-1.8: هیجان بالا</p>
                  <p>• 1.8-2.0: هیجان خیلی بالا (وایرال)</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <UserPlus className="w-6 h-6 ml-2 text-green-600" />
                پارامترهای کاربران جدید (GTM)
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  N<sub>u</sub> - کاربران جدید: {inputs.newUsers.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={inputs.newUsers}
                  onChange={(e) => setInputs({...inputs, newUsers: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">تعداد کاربران جدید پیش‌بینی شده از کمپین بازاریابی</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  A<sub>tn</sub> - میانگین معامله جدید: {formatCurrency(inputs.avgTradeNew)} تومان
                </label>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="500000"
                  value={inputs.avgTradeNew}
                  onChange={(e) => setInputs({...inputs, avgTradeNew: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">میانگین معامله کاربران جدید (معمولاً کمتر از کاربران فعلی)</p>
              </div>

              {/* Results Summary */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Zap className="w-5 h-5 ml-2" />
                  پیش‌بینی هفته اول
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-blue-100 text-sm">حجم کل معاملات</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.totalVolume)} تومان</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-blue-400">
                    <div>
                      <p className="text-blue-100 text-xs">کاربران فعال</p>
                      <p className="text-xl font-bold">{results.activeTraders.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-blue-100 text-xs">کاربران جدید</p>
                      <p className="text-xl font-bold">{inputs.newUsers.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contribution Pie Chart */}
              <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3 text-center">سهم از حجم کل</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={contributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value) + ' تومان'} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-2">
              <DollarSign className="w-8 h-8 text-blue-600 ml-2" />
              <span className="text-sm text-gray-600">حجم کاربران فعلی</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.existingUsersVolume)}</p>
            <p className="text-xs text-gray-500 mt-1">تومان</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-2">
              <DollarSign className="w-8 h-8 text-green-600 ml-2" />
              <span className="text-sm text-gray-600">حجم کاربران جدید</span>
            </div>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(results.newUsersVolume)}</p>
            <p className="text-xs text-gray-500 mt-1">تومان</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-2">
              <Users className="w-8 h-8 text-purple-600 ml-2" />
              <span className="text-sm text-gray-600">کل معامله‌گران</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{results.totalTraders.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">نفر</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-8 h-8 text-orange-600 ml-2" />
              <span className="text-sm text-gray-600">تعداد معاملات</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">{results.totalTransactions.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">تراکنش</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">پیش‌بینی حجم روزانه (میلیون تومان)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#3b82f6" name="حجم معاملات" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">تعداد معامله‌گران روزانه</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="traders" stroke="#10b981" strokeWidth={3} name="تعداد معامله‌گران" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calculation Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">جزئیات محاسبات</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-3">بخش اول: کاربران فعلی</h4>
              <div className="space-y-2 text-sm text-blue-800 font-mono">
                <p>MAU × C<sub>r</sub> × A<sub>t</sub> × H<sub>f</sub></p>
                <p>= {inputs.MAU.toLocaleString()} × {inputs.conversionRate}% × {formatCurrency(inputs.avgTrade)} × {inputs.hypeFactor}</p>
                <p>= {inputs.MAU.toLocaleString()} × {(inputs.conversionRate/100).toFixed(2)} × {formatCurrency(inputs.avgTrade)} × {inputs.hypeFactor}</p>
                <p className="font-bold text-blue-900 pt-2 border-t border-blue-200">= {formatCurrency(results.existingUsersVolume)} تومان</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-900 mb-3">بخش دوم: کاربران جدید</h4>
              <div className="space-y-2 text-sm text-green-800 font-mono">
                <p>N<sub>u</sub> × A<sub>tn</sub></p>
                <p>= {inputs.newUsers.toLocaleString()} × {formatCurrency(inputs.avgTradeNew)}</p>
                <p className="font-bold text-green-900 pt-2 border-t border-green-200">= {formatCurrency(results.newUsersVolume)} تومان</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg mt-4">
            <h4 className="font-bold text-gray-900 mb-2">نتیجه نهایی</h4>
            <p className="text-sm text-gray-800 font-mono">
              V<sub>w1</sub> = {formatCurrency(results.existingUsersVolume)} + {formatCurrency(results.newUsersVolume)}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              = {formatCurrency(results.totalVolume)} تومان
            </p>
          </div>
        </div>

        {/* Strategic Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">تحلیل و توصیه‌ها</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {results.existingContribution > 70 && (
              <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                <p className="font-bold text-blue-800 mb-2">💡 متکی بر کاربران فعلی</p>
                <p className="text-sm text-blue-700">
                  {results.existingContribution.toFixed(0)}% حجم از کاربران فعلی می‌آید. تمرکز بر تبلیغات داخلی و نوتیفیکیشن‌ها را افزایش دهید.
                </p>
              </div>
            )}
            
            {results.newContribution > 30 && (
              <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                <p className="font-bold text-green-800 mb-2">🚀 پتانسیل جذب بالا</p>
                <p className="text-sm text-green-700">
                  {results.newContribution.toFixed(0)}% حجم از کاربران جدید می‌آید. کمپین GTM شما قوی است، بودجه بیشتری اختصاص دهید.
                </p>
              </div>
            )}

            {inputs.hypeFactor >= 1.5 && (
              <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                <p className="font-bold text-purple-800 mb-2">🔥 هیجان بالا</p>
                <p className="text-sm text-purple-700">
                  ضریب هیجان {inputs.hypeFactor} است. آماده پشتیبانی از ترافیک سنگین و نقدینگی بیشتر باشید.
                </p>
              </div>
            )}

            {inputs.conversionRate < 2 && (
              <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-500">
                <p className="font-bold text-yellow-800 mb-2">⚠️ نرخ تبدیل پایین</p>
                <p className="text-sm text-yellow-700">
                  نرخ تبدیل {inputs.conversionRate}% است. کمپین‌های تشویقی (ایردراپ، مسابقه) را در نظر بگیرید.
                </p>
              </div>
            )}

            {results.totalVolume > 50000000000 && (
              <div className="bg-red-50 p-4 rounded-lg border-r-4 border-red-500">
                <p className="font-bold text-red-800 mb-2">🎯 حجم بالا</p>
                <p className="text-sm text-red-700">
                  پیش‌بینی حجم بالاست ({formatCurrency(results.totalVolume)} تومان). نقدینگی کافی و زیرساخت مقیاس‌پذیر را تضمین کنید.
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg border-r-4 border-gray-400">
              <p className="font-bold text-gray-800 mb-2">📊 نسبت معامله‌گران</p>
              <p className="text-sm text-gray-700">
                {((results.activeTraders / inputs.MAU) * 100).toFixed(1)}% از MAU در معاملات شرکت می‌کنند.
                {((results.activeTraders / inputs.MAU) * 100) < 3 && ' سعی کنید این نسبت را با تشویق‌ها افزایش دهید.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinListingPredictor;