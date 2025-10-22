import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, DollarSign, Zap, UserPlus, Calculator, AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';

const CoinListingPredictor = () => {
  const [inputs, setInputs] = useState({
    MAU: 100000,
    conversionRate: 3,
    avgTrade: 5000000,
    hypeFactor: 1.3,
    liquidityFactor: 0.95,
    newUsers: 1500,
    avgTradeNew: 2000000,
    spreadMargin: 0.15,
    marketingCost: 50000000,
    liquidityCost: 100000000
  });

  const calculatePrediction = () => {
    // فرمول اصلی با Liquidity Factor
    const existingUsersVolume = inputs.MAU * (inputs.conversionRate / 100) * inputs.avgTrade * inputs.hypeFactor * inputs.liquidityFactor;
    const newUsersVolume = inputs.newUsers * inputs.avgTradeNew * inputs.hypeFactor * inputs.liquidityFactor;
    const totalVolume = existingUsersVolume + newUsersVolume;
    
    // محاسبات کاربران
    const activeTraders = Math.round(inputs.MAU * (inputs.conversionRate / 100) * inputs.hypeFactor);
    const totalTraders = activeTraders + inputs.newUsers;
    const avgTransactionCount = 3.5;
    const totalTransactions = Math.round(totalTraders * avgTransactionCount);
    
    // محاسبات درآمد (Spread-based)
    const directRevenue = totalVolume * (inputs.spreadMargin / 100);
    
    // محاسبات هزینه
    const totalCost = inputs.marketingCost + inputs.liquidityCost;
    
    // سود خالص
    const netProfit = directRevenue - totalCost;
    const profitMargin = (netProfit / directRevenue) * 100;
    
    // ROI
    const roi = ((netProfit / totalCost) * 100);
    
    return {
      existingUsersVolume,
      newUsersVolume,
      totalVolume,
      activeTraders,
      totalTraders,
      totalTransactions,
      existingContribution: (existingUsersVolume / totalVolume) * 100,
      newContribution: (newUsersVolume / totalVolume) * 100,
      directRevenue,
      totalCost,
      netProfit,
      profitMargin,
      roi
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
      transactions: Math.round((results.totalTransactions * mult) / 7),
      revenue: Math.round((results.directRevenue * mult) / 7000000)
    }));
  };

  const dailyData = generateDailyData();

  const contributionData = [
    { name: 'کاربران فعلی', value: results.existingUsersVolume, color: '#3b82f6' },
    { name: 'کاربران جدید', value: results.newUsersVolume, color: '#10b981' }
  ];

  const financialData = [
    { name: 'درآمد مستقیم', value: results.directRevenue, color: '#10b981' },
    { name: 'هزینه‌ها', value: results.totalCost, color: '#ef4444' }
  ];

  const kpiData = [
    { metric: 'نرخ تبدیل', value: inputs.conversionRate * 10, fullMark: 100 },
    { metric: 'ضریب هیجان', value: (inputs.hypeFactor - 1) * 100, fullMark: 100 },
    { metric: 'نقدینگی', value: inputs.liquidityFactor * 100, fullMark: 100 },
    { metric: 'حاشیه سود', value: inputs.spreadMargin * 10, fullMark: 100 },
    { metric: 'جذب کاربر', value: (inputs.newUsers / 100), fullMark: 100 }
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
    if (hf >= 1.8) return 'خیلی بالا - وایرال و ترند اول';
    if (hf >= 1.5) return 'بالا - کوین محبوب';
    if (hf >= 1.2) return 'متوسط - شناخته شده';
    if (hf >= 1.0) return 'پایین - کوین عادی';
    return 'خیلی پایین';
  };

  const getLiquidityDescription = (lf) => {
    if (lf >= 1.1) return 'عالی - نقدینگی بسیار بالا';
    if (lf >= 1.0) return 'خوب - نقدینگی مناسب';
    if (lf >= 0.9) return 'متوسط - نیاز به بهبود';
    return 'ضعیف - ریسک اسلیپیج بالا';
  };

  const getProfitStatus = () => {
    if (results.netProfit > 0) {
      if (results.roi > 50) return { status: 'عالی', color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle2 /> };
      if (results.roi > 20) return { status: 'خوب', color: 'text-blue-600', bg: 'bg-blue-50', icon: <CheckCircle2 /> };
      return { status: 'سودآور', color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle2 /> };
    }
    return { status: 'زیان‌ده', color: 'text-red-600', bg: 'bg-red-50', icon: <TrendingDown /> };
  };

  const profitStatus = getProfitStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              مدل پیش‌بینی لیستینگ کوین بیت‌پین
            </h1>
            <p className="text-gray-600 text-sm">
              بر اساس فرمول: V<sub>w1</sub> = (MAU × C<sub>r</sub> × A<sub>t</sub> × H<sub>f</sub> × L<sub>f</sub>) + (N<sub>u</sub> × A<sub>tn</sub> × H<sub>f</sub> × L<sub>f</sub>)
            </p>
          </div>

          {/* Financial Summary - NEW */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className={`${profitStatus.bg} p-4 rounded-xl border-2 border-opacity-50`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">وضعیت مالی</span>
                <div className={`${profitStatus.color}`}>{profitStatus.icon}</div>
              </div>
              <p className={`text-2xl font-bold ${profitStatus.color}`}>{profitStatus.status}</p>
              <p className="text-xs text-gray-500 mt-1">ROI: {results.roi.toFixed(1)}%</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-green-600 ml-2" />
                <span className="text-sm text-gray-600">درآمد مستقیم</span>
              </div>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(results.directRevenue)}</p>
              <p className="text-xs text-gray-500 mt-1">از اسپرد {inputs.spreadMargin}%</p>
            </div>

            <div className="bg-red-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <TrendingDown className="w-5 h-5 text-red-600 ml-2" />
                <span className="text-sm text-gray-600">هزینه‌های کل</span>
              </div>
              <p className="text-2xl font-bold text-red-700">{formatCurrency(results.totalCost)}</p>
              <p className="text-xs text-gray-500 mt-1">مارکتینگ + نقدینگی</p>
            </div>

            <div className={`p-4 rounded-xl ${results.netProfit > 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
              <div className="flex items-center mb-2">
                <TrendingUp className={`w-5 h-5 ml-2 ${results.netProfit > 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                <span className="text-sm text-gray-600">سود خالص</span>
              </div>
              <p className={`text-2xl font-bold ${results.netProfit > 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                {formatCurrency(results.netProfit)}
              </p>
              <p className="text-xs text-gray-500 mt-1">حاشیه: {results.profitMargin.toFixed(1)}%</p>
            </div>
          </div>

          {/* Formula Explanation */}
          <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <Calculator className="w-6 h-6 text-blue-600 ml-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">منطق مدل (نسخه جدید با L<sub>f</sub>)</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>بخش اول:</strong> حجم از کاربران فعلی = MAU × نرخ تبدیل × میانگین معامله × ضریب هیجان × ضریب نقدینگی
                  <br />
                  <strong>بخش دوم:</strong> حجم از کاربران جدید = تعداد کاربران جدید × میانگین معامله × ضریب هیجان × ضریب نقدینگی
                  <br />
                  <strong>درآمد:</strong> حجم کل × حاشیه اسپرد (بدون وابستگی به کارمزد)
                </p>
              </div>
            </div>
          </div>

          {/* Input Parameters */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Existing Users */}
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
                <p className="text-xs text-gray-500 mt-1">تعداد کاربران فعال ماهانه در خرید آسان</p>
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
                <p className="text-xs text-gray-500 mt-1">درصد کاربران فعلی که کوین جدید را معامله می‌کنند</p>
                <div className="mt-2 text-xs space-y-1">
                  <p className="text-gray-600">• کوین‌های Layer 1: 2.8%</p>
                  <p className="text-gray-600">• کوین‌های GameFi: 4.1%</p>
                </div>
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
                <p className="text-xs text-gray-500 mt-1">میانگین حجم ریالی هر معامله در خرید آسان (معمولاً 4-5 میلیون)</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  H<sub>f</sub> - ضریب هیجان: {inputs.hypeFactor.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="2.2"
                  step="0.1"
                  value={inputs.hypeFactor}
                  onChange={(e) => setInputs({...inputs, hypeFactor: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">{getHypeDescription(inputs.hypeFactor)}</p>
                <div className="mt-2 text-xs text-gray-600 space-y-1">
                  <p>محاسبه: Google Trends (0.1-0.4) + Social (0.1-0.4) + Media (0.1-0.2) + Exclusivity (0.1-0.3)</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  L<sub>f</sub> - ضریب نقدینگی: {inputs.liquidityFactor.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.80"
                  max="1.20"
                  step="0.01"
                  value={inputs.liquidityFactor}
                  onChange={(e) => setInputs({...inputs, liquidityFactor: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">{getLiquidityDescription(inputs.liquidityFactor)}</p>
                <div className="mt-2 text-xs text-gray-600">
                  <p>فرمول: L<sub>f</sub> = 1 - (Avg Slippage × 2)</p>
                  <p className="mt-1">• اسلیپیج 0.1%: L<sub>f</sub> ≈ 0.998</p>
                  <p>• اسلیپیج 1%: L<sub>f</sub> ≈ 0.98</p>
                </div>
              </div>
            </div>

            {/* Right Column - New Users + Costs */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <UserPlus className="w-6 h-6 ml-2 text-green-600" />
                پارامترهای کاربران جدید و هزینه‌ها
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
                <p className="text-xs text-gray-500 mt-1">تعداد کاربران جدید از کمپین GTM</p>
                <p className="text-xs text-gray-600 mt-2">فرمول: Impressions × CTR × Conversion Rate</p>
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
                <p className="text-xs text-gray-500 mt-1">معمولاً 50-70% از A<sub>t</sub> (کاربران جدید محتاط‌تر هستند)</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <h3 className="font-bold text-orange-900 mb-3">هزینه‌های لیستینگ</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      هزینه مارکتینگ و GTM: {formatCurrency(inputs.marketingCost)} تومان
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500000000"
                      step="10000000"
                      value={inputs.marketingCost}
                      onChange={(e) => setInputs({...inputs, marketingCost: Number(e.target.value)})}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">کمپین‌ها، اینفلوئنسرها، تبلیغات</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      هزینه تامین نقدینگی: {formatCurrency(inputs.liquidityCost)} تومان
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500000000"
                      step="10000000"
                      value={inputs.liquidityCost}
                      onChange={(e) => setInputs({...inputs, liquidityCost: Number(e.target.value)})}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">LP ها، مارکت میکرها، سرمایه اولیه</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  حاشیه سود اسپرد: {inputs.spreadMargin}%
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={inputs.spreadMargin}
                  onChange={(e) => setInputs({...inputs, spreadMargin: Number(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">درصد اسپرد از حجم معاملات (مستقل از کارمزد)</p>
                <p className="text-xs text-gray-600 mt-2">معمولاً 0.1% - 0.5% برای کوین‌های معمولی</p>
              </div>

              {/* Quick Results */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Zap className="w-5 h-5 ml-2" />
                  پیش‌بینی سریع
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-blue-100 text-sm">حجم کل معاملات</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.totalVolume)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-blue-400">
                    <div>
                      <p className="text-blue-100 text-xs">درآمد</p>
                      <p className="text-lg font-bold">{formatCurrency(results.directRevenue)}</p>
                    </div>
                    <div>
                      <p className="text-blue-100 text-xs">سود</p>
                      <p className={`text-lg font-bold ${results.netProfit > 0 ? '' : 'text-red-200'}`}>
                        {formatCurrency(results.netProfit)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Radar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">تحلیل چند بعدی شاخص‌های کلیدی</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={kpiData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="امتیاز" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-2">
              <DollarSign className="w-8 h-8 text-blue-600 ml-2" />
              <span className="text-sm text-gray-600">حجم کاربران فعلی</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.existingUsersVolume)}</p>
            <p className="text-xs text-gray-500 mt-1">{results.existingContribution.toFixed(0)}% از کل</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-2">
              <DollarSign className="w-8 h-8 text-green-600 ml-2" />
              <span className="text-sm text-gray-600">حجم کاربران جدید</span>
            </div>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(results.newUsersVolume)}</p>
            <p className="text-xs text-gray-500 mt-1">{results.newContribution.toFixed(0)}% از کل</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-2">
              <Users className="w-8 h-8 text-purple-600 ml-2" />
              <span className="text-sm text-gray-600">کل معامله‌گران</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{results.totalTraders.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{((results.activeTraders / inputs.MAU) * 100).toFixed(1)}% از MAU</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-8 h-8 text-orange-600 ml-2" />
              <span className="text-sm text-gray-600">تعداد معاملات</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">{results.totalTransactions.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">~3.5 معامله/کاربر</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">پیش‌بینی حجم و درآمد روزانه</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="left" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="volume" fill="#3b82f6" name="حجم (میلیون تومان)" />
                <Bar yAxisId="right" dataKey="revenue" fill="#10b981" name="درآمد (میلیون تومان)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">روند معامله‌گران</h3>
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

        {/* Financial Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">ترکیب حجم معاملات</h3>
            <ResponsiveContainer width="100%" height={250}>
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

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">تحلیل مالی</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={financialData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {financialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value) + ' تومان'} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calculation Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">جزئیات محاسبات (با L<sub>f</sub>)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-3">بخش اول: کاربران فعلی</h4>
              <div className="space-y-2 text-sm text-blue-800 font-mono">
                <p>MAU × C<sub>r</sub> × A<sub>t</sub> × H<sub>f</sub> × L<sub>f</sub></p>
                <p>= {inputs.MAU.toLocaleString()} × {inputs.conversionRate}% × {formatCurrency(inputs.avgTrade)} × {inputs.hypeFactor} × {inputs.liquidityFactor}</p>
                <p className="font-bold text-blue-900 pt-2 border-t border-blue-200">= {formatCurrency(results.existingUsersVolume)} تومان</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-900 mb-3">بخش دوم: کاربران جدید</h4>
              <div className="space-y-2 text-sm text-green-800 font-mono">
                <p>N<sub>u</sub> × A<sub>tn</sub> × H<sub>f</sub> × L<sub>f</sub></p>
                <p>= {inputs.newUsers.toLocaleString()} × {formatCurrency(inputs.avgTradeNew)} × {inputs.hypeFactor} × {inputs.liquidityFactor}</p>
                <p className="font-bold text-green-900 pt-2 border-t border-green-200">= {formatCurrency(results.newUsersVolume)} تومان</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg mt-4">
            <h4 className="font-bold text-gray-900 mb-2">حجم کل هفته اول</h4>
            <p className="text-sm text-gray-800 font-mono">
              V<sub>w1</sub> = {formatCurrency(results.existingUsersVolume)} + {formatCurrency(results.newUsersVolume)}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              = {formatCurrency(results.totalVolume)} تومان
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-red-100 p-4 rounded-lg mt-4">
            <h4 className="font-bold text-gray-900 mb-3">محاسبات مالی</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-800">
                <strong>درآمد مستقیم:</strong> {formatCurrency(results.totalVolume)} × {inputs.spreadMargin}% = {formatCurrency(results.directRevenue)} تومان
              </p>
              <p className="text-gray-800">
                <strong>هزینه‌های کل:</strong> {formatCurrency(inputs.marketingCost)} + {formatCurrency(inputs.liquidityCost)} = {formatCurrency(results.totalCost)} تومان
              </p>
              <p className={`font-bold text-lg ${results.netProfit > 0 ? 'text-green-700' : 'text-red-700'}`}>
                <strong>سود خالص:</strong> {formatCurrency(results.directRevenue)} - {formatCurrency(results.totalCost)} = {formatCurrency(results.netProfit)} تومان
              </p>
              <p className="text-gray-800">
                <strong>ROI:</strong> ({formatCurrency(results.netProfit)} ÷ {formatCurrency(results.totalCost)}) × 100 = {results.roi.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 ml-2 text-orange-600" />
            تحلیل و توصیه‌های استراتژیک
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {results.netProfit > 0 && results.roi > 50 && (
              <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                <p className="font-bold text-green-800 mb-2">✅ لیستینگ بسیار سودآور</p>
                <p className="text-sm text-green-700">
                  ROI شما {results.roi.toFixed(0)}% است! این لیستینگ پتانسیل عالی دارد. پیشنهاد می‌شود بودجه بیشتری اختصاص دهید.
                </p>
              </div>
            )}

            {results.netProfit < 0 && (
              <div className="bg-red-50 p-4 rounded-lg border-r-4 border-red-500">
                <p className="font-bold text-red-800 mb-2">⚠️ زیان پیش‌بینی شده</p>
                <p className="text-sm text-red-700">
                  این لیستینگ با زیان {formatCurrency(Math.abs(results.netProfit))} همراه است. یا هزینه‌ها را کاهش دهید یا ضریب هیجان را افزایش دهید.
                </p>
              </div>
            )}

            {inputs.liquidityFactor < 0.95 && (
              <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-500">
                <p className="font-bold text-orange-800 mb-2">⚠️ نقدینگی پایین</p>
                <p className="text-sm text-orange-700">
                  ضریب نقدینگی {inputs.liquidityFactor} است. ریسک اسلیپیج بالا! نقدینگی بیشتری تامین کنید.
                </p>
              </div>
            )}

            {results.existingContribution > 70 && (
              <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                <p className="font-bold text-blue-800 mb-2">💡 متکی بر کاربران فعلی</p>
                <p className="text-sm text-blue-700">
                  {results.existingContribution.toFixed(0)}% حجم از کاربران فعلی می‌آید. روی نوتیفیکیشن‌ها و تبلیغات داخلی تمرکز کنید.
                </p>
              </div>
            )}

            {results.newContribution > 30 && (
              <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                <p className="font-bold text-green-800 mb-2">🚀 جذب کاربر قوی</p>
                <p className="text-sm text-green-700">
                  {results.newContribution.toFixed(0)}% حجم از کاربران جدید می‌آید. کمپین GTM شما موثر است!
                </p>
              </div>
            )}

            {inputs.hypeFactor >= 1.8 && (
              <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500">
                <p className="font-bold text-purple-800 mb-2">🔥 هیجان بسیار بالا</p>
                <p className="text-sm text-purple-700">
                  ضریب هیجان {inputs.hypeFactor} است. این کوین وایرال است! برای ترافیک سنگین آماده باشید.
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
              <div className="bg-indigo-50 p-4 rounded-lg border-r-4 border-indigo-500">
                <p className="font-bold text-indigo-800 mb-2">🎯 حجم بسیار بالا</p>
                <p className="text-sm text-indigo-700">
                  پیش‌بینی حجم {formatCurrency(results.totalVolume)} است. زیرساخت مقیاس‌پذیر و نقدینگی کافی را تضمین کنید.
                </p>
              </div>
            )}

            {inputs.spreadMargin < 0.1 && (
              <div className="bg-pink-50 p-4 rounded-lg border-r-4 border-pink-500">
                <p className="font-bold text-pink-800 mb-2">📉 حاشیه سود کم</p>
                <p className="text-sm text-pink-700">
                  حاشیه اسپرد {inputs.spreadMargin}% است. با این نرخ، سودآوری پایین خواهد بود.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Success/Failure Criteria */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">شاخص‌های موفقیت و شکست</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-green-700 mb-3 flex items-center">
                <CheckCircle2 className="w-5 h-5 ml-2" />
                معیارهای موفقیت
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>حجم معاملات هفته اول بالاتر از تارگت ({formatCurrency(results.totalVolume)} تومان)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>حاشیه سود اسپرد بالاتر از {inputs.spreadMargin}% از حجم کل</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>نرخ اسلیپیج کمتر از 0.5% (L<sub>f</sub> {'>'}= 0.99)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>افزایش TVL و میزان deposit بعد از لیستینگ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>حاشیه سود مثبت در بازه 30-90 روز</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>نرخ پایداری معاملات (حداقل حجم در هفته دوم)</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-red-700 mb-3 flex items-center">
                <TrendingDown className="w-5 h-5 ml-2" />
                نشانه‌های شکست
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 ml-2">✗</span>
                  <span>اسپرد منفی یا بسیار پایین (زیان مالی)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 ml-2">✗</span>
                  <span>بروز ریسک‌های حقوقی، نوسانات شدید، یا اسکم</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 ml-2">✗</span>
                  <span>عدم پایداری معاملات (فقط رشد اولیه و بعد افت شدید)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 ml-2">✗</span>
                  <span>اسلیپیج بالای 1% به طور مکرر (تجربه کاربری بد)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 ml-2">✗</span>
                  <span>ROI منفی بعد از 30 روز</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinListingPredictor;