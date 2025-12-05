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
    const bSign = numB >= 0 ? '+' : '-';
    const bAbs = Math.abs(numB);

    return {
      steps: [
        { 
          text: `Исходное уравнение:`, 
          formula: `${numA}x ${bSign} ${bAbs} = ${numC}`,
          explanation: 'Записываем уравнение в стандартном виде',
          color: 'from-purple-500 to-pink-500' 
        },
        { 
          text: `Шаг 1: Перенос свободного члена`, 
          formula: `${numA}x = ${numC} - (${numB})`,
          explanation: `Переносим ${numB} в правую часть с противоположным знаком. При переносе через знак «=» меняем знак числа на противоположный.`,
          color: 'from-pink-500 to-orange-500' 
        },
        { 
          text: `Шаг 2: Упрощение правой части`, 
          formula: `${numA}x = ${numC - numB}`,
          explanation: `Вычисляем: ${numC} - (${numB}) = ${numC - numB}`,
          color: 'from-orange-500 to-amber-500' 
        },
        { 
          text: `Шаг 3: Деление на коэффициент`, 
          formula: `x = ${numC - numB} ÷ ${numA}`,
          explanation: `Делим обе части уравнения на коэффициент ${numA}, чтобы получить x. Деление на коэффициент — это обратная операция к умножению.`,
          color: 'from-amber-500 to-blue-500' 
        },
        { 
          text: `Шаг 4: Вычисление ответа`, 
          formula: `x = ${x.toFixed(2)}`,
          explanation: `Выполняем деление: ${numC - numB} ÷ ${numA} = ${x.toFixed(2)}`,
          color: 'from-blue-500 to-purple-500' 
        },
        { 
          text: `Проверка:`, 
          formula: `${numA} × ${x.toFixed(2)} ${bSign} ${bAbs} = ${(numA * x + numB).toFixed(2)} ≈ ${numC}`,
          explanation: 'Подставляем найденное значение в исходное уравнение для проверки',
          color: 'from-green-500 to-emerald-500' 
        }
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
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg">
                      <Icon name="ArrowRightLeft" size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">1. Перенос членов уравнения</h3>
                  </div>
                  <p className="text-gray-700 mb-3 text-lg">При переносе члена уравнения через знак равенства нужно изменить его знак на противоположный:</p>
                  <div className="space-y-2 bg-white p-4 rounded-lg">
                    <p className="font-mono text-lg">• Если было <span className="text-pink-600 font-bold">+5</span>, станет <span className="text-pink-600 font-bold">-5</span></p>
                    <p className="font-mono text-lg">• Если было <span className="text-pink-600 font-bold">-3</span>, станет <span className="text-pink-600 font-bold">+3</span></p>
                  </div>
                  <div className="mt-4 p-4 bg-pink-100 rounded-lg">
                    <p className="font-bold text-gray-800 mb-2">Пример:</p>
                    <p className="font-mono text-lg">3x + 7 = 15</p>
                    <p className="font-mono text-lg text-pink-600">3x = 15 - 7</p>
                    <p className="text-sm text-gray-600 mt-2">Число 7 перешло вправо и стало -7</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                      <Icon name="Merge" size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">2. Приведение подобных слагаемых</h3>
                  </div>
                  <p className="text-gray-700 mb-3 text-lg">Подобные слагаемые — это члены уравнения с одинаковой переменной или без неё. Их можно складывать и вычитать:</p>
                  <div className="space-y-3 bg-white p-4 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-800">Подобные с переменной:</p>
                      <p className="font-mono text-lg">3x + 5x = 8x</p>
                      <p className="font-mono text-lg">7x - 2x = 5x</p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-800">Подобные числа:</p>
                      <p className="font-mono text-lg">12 + 8 = 20</p>
                      <p className="font-mono text-lg">15 - 7 = 8</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-orange-100 rounded-lg">
                    <p className="font-bold text-gray-800 mb-2">Пример:</p>
                    <p className="font-mono text-lg">5x + 2x - 3 = 17 + 3</p>
                    <p className="font-mono text-lg text-orange-600">7x - 3 = 20</p>
                    <p className="text-sm text-gray-600 mt-2">Сложили 5x и 2x, получили 7x. Сложили 17 и 3, получили 20</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border-2 border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                      <Icon name="Divide" size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">3. Деление на коэффициент</h3>
                  </div>
                  <p className="text-gray-700 mb-3 text-lg">Чтобы найти x, нужно разделить обе части уравнения на число перед x (коэффициент):</p>
                  <div className="space-y-3 bg-white p-4 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-800 mb-2">⚠️ Важное правило:</p>
                      <p className="text-gray-700">Что делаем с одной частью уравнения, то же делаем и с другой!</p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="font-bold text-gray-800">Формула:</p>
                      <p className="font-mono text-xl">ax = b  →  x = b ÷ a</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-red-100 rounded-lg">
                    <p className="font-bold text-gray-800 mb-2">Примеры деления:</p>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">4x = 20  →  x = 20 ÷ 4  →  x = 5</p>
                      <p className="font-mono text-lg">3x = 15  →  x = 15 ÷ 3  →  x = 5</p>
                      <p className="font-mono text-lg">-2x = 10  →  x = 10 ÷ (-2)  →  x = -5</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                      <Icon name="CheckCircle" size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">4. Проверка решения</h3>
                  </div>
                  <p className="text-gray-700 mb-3 text-lg">Чтобы убедиться, что x найден верно, подставляем его в исходное уравнение:</p>
                  <div className="mt-4 p-4 bg-green-100 rounded-lg">
                    <p className="font-bold text-gray-800 mb-2">Пример проверки:</p>
                    <div className="space-y-1">
                      <p className="font-mono text-lg">Уравнение: 2x + 3 = 11</p>
                      <p className="font-mono text-lg">Нашли: x = 4</p>
                      <p className="font-mono text-lg text-green-600 mt-2">Проверка: 2 × 4 + 3 = 8 + 3 = 11 ✓</p>
                      <p className="text-sm text-gray-600 mt-2">Левая и правая части равны — решение верное!</p>
                    </div>
                  </div>
                </div>
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
                    { 
                      equation: '2x + 3 = 7', 
                      solution: 'x = 2', 
                      steps: [
                        { text: '2x = 7 - 3', explanation: 'Переносим +3 вправо, меняем знак на -3' },
                        { text: '2x = 4', explanation: 'Вычисляем правую часть: 7 - 3 = 4' },
                        { text: 'x = 4 ÷ 2', explanation: 'Делим обе части на коэффициент 2' },
                        { text: 'x = 2', explanation: 'Вычисляем: 4 ÷ 2 = 2' }
                      ]
                    },
                    { 
                      equation: '5x - 10 = 15', 
                      solution: 'x = 5', 
                      steps: [
                        { text: '5x = 15 + 10', explanation: 'Переносим -10 вправо, меняем знак на +10' },
                        { text: '5x = 25', explanation: 'Вычисляем правую часть: 15 + 10 = 25' },
                        { text: 'x = 25 ÷ 5', explanation: 'Делим обе части на коэффициент 5' },
                        { text: 'x = 5', explanation: 'Вычисляем: 25 ÷ 5 = 5' }
                      ]
                    },
                    { 
                      equation: 'x + 8 = 12', 
                      solution: 'x = 4', 
                      steps: [
                        { text: 'x = 12 - 8', explanation: 'Переносим +8 вправо, меняем знак на -8' },
                        { text: 'x = 4', explanation: 'Вычисляем: 12 - 8 = 4' }
                      ]
                    }
                  ].map((problem, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-lg">
                      <Badge className="mb-3 bg-green-500">Задача {idx + 1}</Badge>
                      <p className="text-xl font-bold mb-3 text-gray-800">Решите уравнение: <span className="font-mono bg-white px-3 py-1 rounded">{problem.equation}</span></p>
                      <details className="cursor-pointer">
                        <summary className="text-blue-600 hover:text-blue-800 font-semibold">Показать подробное решение</summary>
                        <div className="mt-4 space-y-3">
                          {problem.steps.map((step, i) => (
                            <div key={i} className="p-3 bg-white rounded-lg border-l-4 border-green-500">
                              <p className="font-mono text-lg font-bold text-gray-800 mb-1">{step.text}</p>
                              <p className="text-sm text-gray-600">{step.explanation}</p>
                            </div>
                          ))}
                          <div className="p-4 bg-green-200 rounded-lg mt-4">
                            <p className="text-xl font-bold text-green-800">✓ Ответ: {problem.solution}</p>
                          </div>
                        </div>
                      </details>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="medium" className="mt-6 space-y-4">
                  {[
                    { 
                      equation: '3x + 7 = 2x + 15', 
                      solution: 'x = 8', 
                      steps: [
                        { text: '3x - 2x = 15 - 7', explanation: 'Переносим 2x влево (получаем -2x), а 7 вправо (получаем -7)' },
                        { text: '1x = 8', explanation: 'Приводим подобные: 3x - 2x = 1x. Вычисляем: 15 - 7 = 8' },
                        { text: 'x = 8', explanation: '1x это просто x, поэтому ответ x = 8' }
                      ]
                    },
                    { 
                      equation: '4(x - 2) = 12', 
                      solution: 'x = 5', 
                      steps: [
                        { text: '4x - 8 = 12', explanation: 'Раскрываем скобки: умножаем 4 на x и 4 на (-2)' },
                        { text: '4x = 12 + 8', explanation: 'Переносим -8 вправо, меняем знак на +8' },
                        { text: '4x = 20', explanation: 'Вычисляем правую часть: 12 + 8 = 20' },
                        { text: 'x = 20 ÷ 4', explanation: 'Делим обе части на коэффициент 4' },
                        { text: 'x = 5', explanation: 'Вычисляем: 20 ÷ 4 = 5' }
                      ]
                    },
                    { 
                      equation: '2x/3 + 4 = 10', 
                      solution: 'x = 9', 
                      steps: [
                        { text: '2x/3 = 10 - 4', explanation: 'Переносим +4 вправо, меняем знак на -4' },
                        { text: '2x/3 = 6', explanation: 'Вычисляем правую часть: 10 - 4 = 6' },
                        { text: '2x = 6 × 3', explanation: 'Умножаем обе части на 3, чтобы избавиться от дроби' },
                        { text: '2x = 18', explanation: 'Вычисляем: 6 × 3 = 18' },
                        { text: 'x = 18 ÷ 2', explanation: 'Делим обе части на коэффициент 2' },
                        { text: 'x = 9', explanation: 'Вычисляем: 18 ÷ 2 = 9' }
                      ]
                    }
                  ].map((problem, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-400 shadow-lg">
                      <Badge className="mb-3 bg-yellow-500">Задача {idx + 1}</Badge>
                      <p className="text-xl font-bold mb-3 text-gray-800">Решите уравнение: <span className="font-mono bg-white px-3 py-1 rounded">{problem.equation}</span></p>
                      <details className="cursor-pointer">
                        <summary className="text-blue-600 hover:text-blue-800 font-semibold">Показать подробное решение</summary>
                        <div className="mt-4 space-y-3">
                          {problem.steps.map((step, i) => (
                            <div key={i} className="p-3 bg-white rounded-lg border-l-4 border-yellow-500">
                              <p className="font-mono text-lg font-bold text-gray-800 mb-1">{step.text}</p>
                              <p className="text-sm text-gray-600">{step.explanation}</p>
                            </div>
                          ))}
                          <div className="p-4 bg-yellow-200 rounded-lg mt-4">
                            <p className="text-xl font-bold text-yellow-800">✓ Ответ: {problem.solution}</p>
                          </div>
                        </div>
                      </details>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="advanced" className="mt-6 space-y-4">
                  {[
                    { 
                      equation: '2(3x - 5) = 4(x + 1)', 
                      solution: 'x = 7', 
                      steps: [
                        { text: '6x - 10 = 4x + 4', explanation: 'Раскрываем скобки слева: 2×3x=6x, 2×(-5)=-10. Справа: 4×x=4x, 4×1=4' },
                        { text: '6x - 4x = 4 + 10', explanation: 'Переносим 4x влево (получаем -4x), а -10 вправо (получаем +10)' },
                        { text: '2x = 14', explanation: 'Приводим подобные: 6x - 4x = 2x. Вычисляем: 4 + 10 = 14' },
                        { text: 'x = 14 ÷ 2', explanation: 'Делим обе части на коэффициент 2' },
                        { text: 'x = 7', explanation: 'Вычисляем: 14 ÷ 2 = 7' }
                      ]
                    },
                    { 
                      equation: '(x + 3)/2 = (2x - 1)/3', 
                      solution: 'x = 11', 
                      steps: [
                        { text: '3(x + 3) = 2(2x - 1)', explanation: 'Умножаем обе части на 6 (наименьшее общее кратное 2 и 3), упрощаем' },
                        { text: '3x + 9 = 4x - 2', explanation: 'Раскрываем скобки: слева 3×x и 3×3, справа 2×2x и 2×(-1)' },
                        { text: '3x - 4x = -2 - 9', explanation: 'Переносим 4x влево, а 9 вправо с изменением знаков' },
                        { text: '-1x = -11', explanation: 'Приводим подобные: 3x - 4x = -x. Вычисляем: -2 - 9 = -11' },
                        { text: 'x = -11 ÷ (-1)', explanation: 'Делим обе части на коэффициент -1' },
                        { text: 'x = 11', explanation: 'Вычисляем: -11 ÷ (-1) = 11 (минус на минус дает плюс)' }
                      ]
                    },
                    { 
                      equation: '5(x - 1) - 3(x + 2) = 7', 
                      solution: 'x = 9', 
                      steps: [
                        { text: '5x - 5 - 3x - 6 = 7', explanation: 'Раскрываем скобки: 5×x и 5×(-1), затем 3×x и 3×2 (знак минус перед скобкой меняет знаки внутри)' },
                        { text: '2x - 11 = 7', explanation: 'Приводим подобные слева: 5x - 3x = 2x, затем -5 - 6 = -11' },
                        { text: '2x = 7 + 11', explanation: 'Переносим -11 вправо, меняем знак на +11' },
                        { text: '2x = 18', explanation: 'Вычисляем правую часть: 7 + 11 = 18' },
                        { text: 'x = 18 ÷ 2', explanation: 'Делим обе части на коэффициент 2' },
                        { text: 'x = 9', explanation: 'Вычисляем: 18 ÷ 2 = 9' }
                      ]
                    }
                  ].map((problem, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border-2 border-red-400 shadow-lg">
                      <Badge className="mb-3 bg-red-500">Задача {idx + 1}</Badge>
                      <p className="text-xl font-bold mb-3 text-gray-800">Решите уравнение: <span className="font-mono bg-white px-3 py-1 rounded">{problem.equation}</span></p>
                      <details className="cursor-pointer">
                        <summary className="text-blue-600 hover:text-blue-800 font-semibold">Показать подробное решение</summary>
                        <div className="mt-4 space-y-3">
                          {problem.steps.map((step, i) => (
                            <div key={i} className="p-3 bg-white rounded-lg border-l-4 border-red-500">
                              <p className="font-mono text-lg font-bold text-gray-800 mb-1">{step.text}</p>
                              <p className="text-sm text-gray-600">{step.explanation}</p>
                            </div>
                          ))}
                          <div className="p-4 bg-red-200 rounded-lg mt-4">
                            <p className="text-xl font-bold text-red-800">✓ Ответ: {problem.solution}</p>
                          </div>
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
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
                            {idx + 1}
                          </div>
                          <p className="text-lg font-bold">{step.text}</p>
                        </div>
                        <p className="text-2xl font-mono font-bold ml-13">{step.formula}</p>
                        <p className="text-sm bg-white/10 p-3 rounded-lg ml-13">{step.explanation}</p>
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