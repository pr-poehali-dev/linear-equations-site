import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [a, setA] = useState<string>('2');
  const [b, setB] = useState<string>('5');
  const [c, setC] = useState<string>('11');
  const [showSolution, setShowSolution] = useState(false);

  const calculateSolution = () => {
    const numA = parseFloat(a) || 0;
    const numB = parseFloat(b) || 0;
    const numC = parseFloat(c) || 0;

    if (numA === 0) {
      return { error: 'Коэффициент a не может быть равен 0' };
    }

    const x = (numC - numB) / numA;

    return {
      steps: [
        { text: `Исходное уравнение: ${numA}x + ${numB} = ${numC}`, color: 'from-purple-500 to-pink-500' },
        { text: `Переносим ${numB} вправо: ${numA}x = ${numC} - (${numB})`, color: 'from-pink-500 to-orange-500' },
        { text: `Упрощаем: ${numA}x = ${numC - numB}`, color: 'from-orange-500 to-blue-500' },
        { text: `Делим обе части на ${numA}: x = ${numC - numB} / ${numA}`, color: 'from-blue-500 to-purple-500' },
        { text: `Ответ: x = ${x.toFixed(2)}`, color: 'from-green-500 to-emerald-500' }
      ],
      answer: x.toFixed(2)
    };
  };

  const solution = calculateSolution();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-xl">
            <Icon name="Calculator" size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Линейные уравнения
          </h1>
          <p className="text-xl text-gray-600 font-semibold">
            Математика для 9 класса 📐
          </p>
        </header>

        <nav className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {[
            { icon: 'BookOpen', label: 'Определение', color: 'from-purple-500 to-purple-600' },
            { icon: 'GraduationCap', label: 'Теория', color: 'from-pink-500 to-pink-600' },
            { icon: 'Lightbulb', label: 'Примеры', color: 'from-orange-500 to-orange-600' },
            { icon: 'Calculator', label: 'Калькулятор', color: 'from-blue-500 to-blue-600' }
          ].map((item, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="lg"
              className={`bg-gradient-to-r ${item.color} text-white border-0 hover:scale-105 transition-transform shadow-lg`}
              onClick={() => document.getElementById(item.label)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name={item.icon} className="mr-2" size={20} />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="space-y-8">
          <Card id="Определение" className="border-0 shadow-2xl overflow-hidden animate-scale-in bg-gradient-to-br from-purple-100 to-purple-50">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Icon name="BookOpen" size={28} className="text-white" />
                </div>
                <CardTitle className="text-3xl">Определение</CardTitle>
              </div>
              <CardDescription className="text-lg">Что такое линейное уравнение?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p className="leading-relaxed">
                <strong className="text-purple-700">Линейное уравнение</strong> — это уравнение вида <span className="font-mono text-xl bg-white px-3 py-1 rounded-lg shadow-sm">ax + b = c</span>, где:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'a', desc: 'коэффициент при x (a ≠ 0)', color: 'purple' },
                  { label: 'b', desc: 'свободный член', color: 'pink' },
                  { label: 'c', desc: 'правая часть уравнения', color: 'orange' }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 bg-gradient-to-br from-${item.color}-200 to-${item.color}-100 rounded-xl border-2 border-${item.color}-300`}>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{item.label}</div>
                    <div className="text-sm text-gray-700">{item.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card id="Теория" className="border-0 shadow-2xl overflow-hidden animate-scale-in bg-gradient-to-br from-pink-100 to-pink-50">
            <div className="h-2 bg-gradient-to-r from-pink-500 to-orange-500"></div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl">
                  <Icon name="GraduationCap" size={28} className="text-white" />
                </div>
                <CardTitle className="text-3xl">Теория решения</CardTitle>
              </div>
              <CardDescription className="text-lg">Как решать линейные уравнения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Перенос членов', desc: 'Переносим все члены с переменной x в левую часть, а числа — в правую', icon: 'ArrowRightLeft', color: 'from-pink-500 to-pink-600' },
                  { step: '2', title: 'Упрощение', desc: 'Приводим подобные слагаемые в обеих частях уравнения', icon: 'Merge', color: 'from-orange-500 to-orange-600' },
                  { step: '3', title: 'Деление', desc: 'Делим обе части уравнения на коэффициент при x', icon: 'Divide', color: 'from-red-500 to-red-600' },
                  { step: '4', title: 'Проверка', desc: 'Подставляем найденное значение в исходное уравнение', icon: 'CheckCircle', color: 'from-green-500 to-green-600' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Icon name={item.icon} size={20} className="text-gray-600" />
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card id="Примеры" className="border-0 shadow-2xl overflow-hidden animate-scale-in bg-gradient-to-br from-orange-100 to-orange-50">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-blue-500"></div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl">
                  <Icon name="Lightbulb" size={28} className="text-white" />
                </div>
                <CardTitle className="text-3xl">Примеры задач</CardTitle>
              </div>
              <CardDescription className="text-lg">Разные уровни сложности</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-gradient-to-r from-orange-200 to-blue-200">
                  <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white py-3">
                    <Icon name="ThumbsUp" className="mr-2" size={18} />
                    Базовый
                  </TabsTrigger>
                  <TabsTrigger value="medium" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white py-3">
                    <Icon name="TrendingUp" className="mr-2" size={18} />
                    Средний
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white py-3">
                    <Icon name="Zap" className="mr-2" size={18} />
                    Продвинутый
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-6 space-y-4">
                  {[
                    { equation: '2x + 3 = 7', solution: 'x = 2', steps: ['2x = 7 - 3', '2x = 4', 'x = 2'] },
                    { equation: '5x - 10 = 15', solution: 'x = 5', steps: ['5x = 15 + 10', '5x = 25', 'x = 5'] },
                    { equation: 'x + 8 = 12', solution: 'x = 4', steps: ['x = 12 - 8', 'x = 4'] }
                  ].map((problem, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-lg">
                      <Badge className="mb-3 bg-green-500">Задача {idx + 1}</Badge>
                      <p className="text-xl font-bold mb-3 text-gray-800">Решите уравнение: <span className="font-mono bg-white px-3 py-1 rounded">{problem.equation}</span></p>
                      <details className="cursor-pointer">
                        <summary className="text-blue-600 hover:text-blue-800 font-semibold">Показать решение</summary>
                        <div className="mt-4 space-y-2 pl-4 border-l-4 border-green-500">
                          {problem.steps.map((step, i) => (
                            <p key={i} className="font-mono text-gray-700">{i + 1}. {step}</p>
                          ))}
                          <p className="text-lg font-bold text-green-700 mt-3">✓ Ответ: {problem.solution}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="medium" className="mt-6 space-y-4">
                  {[
                    { equation: '3x + 7 = 2x + 15', solution: 'x = 8', steps: ['3x - 2x = 15 - 7', 'x = 8'] },
                    { equation: '4(x - 2) = 12', solution: 'x = 5', steps: ['4x - 8 = 12', '4x = 20', 'x = 5'] },
                    { equation: '2x/3 + 4 = 10', solution: 'x = 9', steps: ['2x/3 = 6', '2x = 18', 'x = 9'] }
                  ].map((problem, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-400 shadow-lg">
                      <Badge className="mb-3 bg-yellow-500">Задача {idx + 1}</Badge>
                      <p className="text-xl font-bold mb-3 text-gray-800">Решите уравнение: <span className="font-mono bg-white px-3 py-1 rounded">{problem.equation}</span></p>
                      <details className="cursor-pointer">
                        <summary className="text-blue-600 hover:text-blue-800 font-semibold">Показать решение</summary>
                        <div className="mt-4 space-y-2 pl-4 border-l-4 border-yellow-500">
                          {problem.steps.map((step, i) => (
                            <p key={i} className="font-mono text-gray-700">{i + 1}. {step}</p>
                          ))}
                          <p className="text-lg font-bold text-yellow-700 mt-3">✓ Ответ: {problem.solution}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="advanced" className="mt-6 space-y-4">
                  {[
                    { equation: '2(3x - 5) = 4(x + 1)', solution: 'x = 7', steps: ['6x - 10 = 4x + 4', '6x - 4x = 4 + 10', '2x = 14', 'x = 7'] },
                    { equation: '(x + 3)/2 = (2x - 1)/3', solution: 'x = 11', steps: ['3(x + 3) = 2(2x - 1)', '3x + 9 = 4x - 2', 'x = 11'] },
                    { equation: '5(x - 1) - 3(x + 2) = 7', solution: 'x = 9', steps: ['5x - 5 - 3x - 6 = 7', '2x - 11 = 7', '2x = 18', 'x = 9'] }
                  ].map((problem, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border-2 border-red-400 shadow-lg">
                      <Badge className="mb-3 bg-red-500">Задача {idx + 1}</Badge>
                      <p className="text-xl font-bold mb-3 text-gray-800">Решите уравнение: <span className="font-mono bg-white px-3 py-1 rounded">{problem.equation}</span></p>
                      <details className="cursor-pointer">
                        <summary className="text-blue-600 hover:text-blue-800 font-semibold">Показать решение</summary>
                        <div className="mt-4 space-y-2 pl-4 border-l-4 border-red-500">
                          {problem.steps.map((step, i) => (
                            <p key={i} className="font-mono text-gray-700">{i + 1}. {step}</p>
                          ))}
                          <p className="text-lg font-bold text-red-700 mt-3">✓ Ответ: {problem.solution}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card id="Калькулятор" className="border-0 shadow-2xl overflow-hidden animate-scale-in bg-gradient-to-br from-blue-100 to-blue-50">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Icon name="Calculator" size={28} className="text-white" />
                </div>
                <CardTitle className="text-3xl">Интерактивный калькулятор</CardTitle>
              </div>
              <CardDescription className="text-lg">Решите своё уравнение с пошаговым разбором</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-white rounded-xl shadow-inner">
                <div className="flex items-center justify-center gap-3 mb-6 text-3xl font-bold flex-wrap">
                  <Input
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    className="w-20 text-center text-2xl font-bold border-2 border-purple-400 focus:border-purple-600"
                  />
                  <span className="text-purple-600">x +</span>
                  <Input
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    className="w-20 text-center text-2xl font-bold border-2 border-pink-400 focus:border-pink-600"
                  />
                  <span className="text-gray-600">=</span>
                  <Input
                    type="number"
                    value={c}
                    onChange={(e) => setC(e.target.value)}
                    className="w-20 text-center text-2xl font-bold border-2 border-orange-400 focus:border-orange-600"
                  />
                </div>

                <Button
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  <Icon name={showSolution ? 'EyeOff' : 'Eye'} className="mr-2" size={24} />
                  {showSolution ? 'Скрыть решение' : 'Показать решение'}
                </Button>
              </div>

              {showSolution && !solution.error && (
                <div className="space-y-4 animate-fade-in">
                  {solution.steps?.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-5 bg-gradient-to-r ${step.color} text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
                          {idx + 1}
                        </div>
                        <p className="text-lg font-semibold">{step.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-2xl text-center">
                    <Icon name="CheckCircle" size={48} className="mx-auto mb-3" />
                    <p className="text-2xl font-bold">Итоговый ответ: x = {solution.answer}</p>
                  </div>
                </div>
              )}

              {solution.error && showSolution && (
                <div className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg animate-fade-in">
                  <Icon name="AlertCircle" size={24} className="inline mr-2" />
                  <span className="text-lg font-semibold">{solution.error}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <footer className="mt-16 text-center text-gray-600 pb-8">
          <p className="text-lg">Удачи в изучении математики! 🎓✨</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
