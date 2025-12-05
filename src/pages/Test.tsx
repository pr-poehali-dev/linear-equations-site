import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  equation: string;
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: Array<{ text: string; explanation: string }>;
}

const questions: Question[] = [
  {
    id: 1,
    equation: '3x + 5 = 14',
    correctAnswer: 3,
    difficulty: 'easy',
    steps: [
      { text: '3x = 14 - 5', explanation: 'Переносим +5 вправо, меняем знак на -5' },
      { text: '3x = 9', explanation: 'Вычисляем правую часть: 14 - 5 = 9' },
      { text: 'x = 9 ÷ 3', explanation: 'Делим обе части на коэффициент 3' },
      { text: 'x = 3', explanation: 'Вычисляем: 9 ÷ 3 = 3' }
    ]
  },
  {
    id: 2,
    equation: '2x - 7 = 3',
    correctAnswer: 5,
    difficulty: 'easy',
    steps: [
      { text: '2x = 3 + 7', explanation: 'Переносим -7 вправо, меняем знак на +7' },
      { text: '2x = 10', explanation: 'Вычисляем правую часть: 3 + 7 = 10' },
      { text: 'x = 10 ÷ 2', explanation: 'Делим обе части на коэффициент 2' },
      { text: 'x = 5', explanation: 'Вычисляем: 10 ÷ 2 = 5' }
    ]
  },
  {
    id: 3,
    equation: 'x + 12 = 20',
    correctAnswer: 8,
    difficulty: 'easy',
    steps: [
      { text: 'x = 20 - 12', explanation: 'Переносим +12 вправо, меняем знак на -12' },
      { text: 'x = 8', explanation: 'Вычисляем: 20 - 12 = 8' }
    ]
  },
  {
    id: 4,
    equation: '4x + 3 = 2x + 11',
    correctAnswer: 4,
    difficulty: 'medium',
    steps: [
      { text: '4x - 2x = 11 - 3', explanation: 'Переносим 2x влево (получаем -2x), а 3 вправо (получаем -3)' },
      { text: '2x = 8', explanation: 'Приводим подобные: 4x - 2x = 2x. Вычисляем: 11 - 3 = 8' },
      { text: 'x = 8 ÷ 2', explanation: 'Делим обе части на коэффициент 2' },
      { text: 'x = 4', explanation: 'Вычисляем: 8 ÷ 2 = 4' }
    ]
  },
  {
    id: 5,
    equation: '5(x - 2) = 15',
    correctAnswer: 5,
    difficulty: 'medium',
    steps: [
      { text: '5x - 10 = 15', explanation: 'Раскрываем скобки: 5×x и 5×(-2)' },
      { text: '5x = 15 + 10', explanation: 'Переносим -10 вправо, меняем знак на +10' },
      { text: '5x = 25', explanation: 'Вычисляем правую часть: 15 + 10 = 25' },
      { text: 'x = 25 ÷ 5', explanation: 'Делим обе части на коэффициент 5' },
      { text: 'x = 5', explanation: 'Вычисляем: 25 ÷ 5 = 5' }
    ]
  },
  {
    id: 6,
    equation: '6x - 8 = 2x + 12',
    correctAnswer: 5,
    difficulty: 'medium',
    steps: [
      { text: '6x - 2x = 12 + 8', explanation: 'Переносим 2x влево (получаем -2x), а -8 вправо (получаем +8)' },
      { text: '4x = 20', explanation: 'Приводим подобные: 6x - 2x = 4x. Вычисляем: 12 + 8 = 20' },
      { text: 'x = 20 ÷ 4', explanation: 'Делим обе части на коэффициент 4' },
      { text: 'x = 5', explanation: 'Вычисляем: 20 ÷ 4 = 5' }
    ]
  },
  {
    id: 7,
    equation: '3(2x + 1) = 21',
    correctAnswer: 3,
    difficulty: 'medium',
    steps: [
      { text: '6x + 3 = 21', explanation: 'Раскрываем скобки: 3×2x=6x и 3×1=3' },
      { text: '6x = 21 - 3', explanation: 'Переносим +3 вправо, меняем знак на -3' },
      { text: '6x = 18', explanation: 'Вычисляем правую часть: 21 - 3 = 18' },
      { text: 'x = 18 ÷ 6', explanation: 'Делим обе части на коэффициент 6' },
      { text: 'x = 3', explanation: 'Вычисляем: 18 ÷ 6 = 3' }
    ]
  },
  {
    id: 8,
    equation: '2(3x - 4) = 4(x + 2)',
    correctAnswer: 8,
    difficulty: 'hard',
    steps: [
      { text: '6x - 8 = 4x + 8', explanation: 'Раскрываем скобки слева: 2×3x=6x, 2×(-4)=-8. Справа: 4×x=4x, 4×2=8' },
      { text: '6x - 4x = 8 + 8', explanation: 'Переносим 4x влево (получаем -4x), а -8 вправо (получаем +8)' },
      { text: '2x = 16', explanation: 'Приводим подобные: 6x - 4x = 2x. Вычисляем: 8 + 8 = 16' },
      { text: 'x = 16 ÷ 2', explanation: 'Делим обе части на коэффициент 2' },
      { text: 'x = 8', explanation: 'Вычисляем: 16 ÷ 2 = 8' }
    ]
  },
  {
    id: 9,
    equation: '5(x - 3) - 2(x + 1) = 8',
    correctAnswer: 7,
    difficulty: 'hard',
    steps: [
      { text: '5x - 15 - 2x - 2 = 8', explanation: 'Раскрываем скобки: 5×x и 5×(-3), затем 2×x и 2×1 (знак минус перед скобкой меняет знаки внутри)' },
      { text: '3x - 17 = 8', explanation: 'Приводим подобные слева: 5x - 2x = 3x, затем -15 - 2 = -17' },
      { text: '3x = 8 + 17', explanation: 'Переносим -17 вправо, меняем знак на +17' },
      { text: '3x = 25', explanation: 'Вычисляем правую часть: 8 + 17 = 25' },
      { text: 'x = 25 ÷ 3', explanation: 'Делим обе части на коэффициент 3' },
      { text: 'x = 8.33', explanation: 'Вычисляем: 25 ÷ 3 ≈ 8.33' }
    ]
  },
  {
    id: 10,
    equation: '4(2x - 1) - 3(x - 2) = 22',
    correctAnswer: 4,
    difficulty: 'hard',
    steps: [
      { text: '8x - 4 - 3x + 6 = 22', explanation: 'Раскрываем скобки: 4×2x и 4×(-1), затем 3×x и 3×(-2) со знаком минус' },
      { text: '5x + 2 = 22', explanation: 'Приводим подобные: 8x - 3x = 5x, затем -4 + 6 = 2' },
      { text: '5x = 22 - 2', explanation: 'Переносим +2 вправо, меняем знак на -2' },
      { text: '5x = 20', explanation: 'Вычисляем правую часть: 22 - 2 = 20' },
      { text: 'x = 20 ÷ 5', explanation: 'Делим обе части на коэффициент 5' },
      { text: 'x = 4', explanation: 'Вычисляем: 20 ÷ 5 = 4' }
    ]
  }
];

const Test = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState<{ [key: number]: boolean }>({});

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const checkAnswers = () => {
    const newResults: { [key: number]: boolean } = {};
    questions.forEach((q) => {
      const userAnswer = parseFloat(answers[q.id]);
      newResults[q.id] = Math.abs(userAnswer - q.correctAnswer) < 0.1;
    });
    setResults(newResults);
    setIsChecked(true);
  };

  const resetTest = () => {
    setAnswers({});
    setIsChecked(false);
    setResults({});
  };

  const correctCount = Object.values(results).filter(Boolean).length;
  const totalCount = questions.length;
  const percentage = isChecked ? Math.round((correctCount / totalCount) * 100) : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'hard': return 'Сложно';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="hover:scale-105 transition-transform"
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад к теории
          </Button>
        </div>

        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-xl">
            <Icon name="ClipboardCheck" size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Контрольная работа
          </h1>
          <p className="text-xl text-gray-600 font-semibold">
            Решите 10 линейных уравнений 📝
          </p>
        </header>

        {isChecked && (
          <Card className="mb-8 border-0 shadow-2xl overflow-hidden animate-scale-in">
            <div className={`h-2 ${percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}></div>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <Icon 
                    name={percentage >= 80 ? 'Trophy' : percentage >= 60 ? 'ThumbsUp' : 'AlertCircle'} 
                    size={48} 
                    className={percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'} 
                  />
                  <div>
                    <p className="text-4xl font-bold text-gray-800">{correctCount} из {totalCount}</p>
                    <p className="text-xl text-gray-600">правильных ответов</p>
                  </div>
                </div>
                <Progress value={percentage} className="h-3" />
                <p className="text-2xl font-bold">
                  {percentage >= 80 ? '🎉 Отлично!' : percentage >= 60 ? '👍 Хорошо!' : '💪 Продолжай практиковаться!'}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Badge className={`${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'} text-white text-lg px-4 py-2`}>
                    Оценка: {percentage}%
                  </Badge>
                  {percentage >= 80 && <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg px-4 py-2">⭐ Отличник</Badge>}
                </div>
                <Button
                  onClick={resetTest}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-4"
                >
                  <Icon name="RotateCcw" className="mr-2" size={20} />
                  Пройти тест заново
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {questions.map((question) => {
            const isCorrect = results[question.id];
            const isAnswered = answers[question.id] !== undefined && answers[question.id] !== '';

            return (
              <Card
                key={question.id}
                className={`border-0 shadow-xl overflow-hidden animate-scale-in transition-all ${
                  isChecked
                    ? isCorrect
                      ? 'border-4 border-green-500'
                      : 'border-4 border-red-500'
                    : ''
                }`}
              >
                <div
                  className={`h-2 ${
                    question.difficulty === 'easy'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : question.difficulty === 'medium'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                ></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {question.id}
                      </div>
                      <CardTitle className="text-2xl">Уравнение {question.id}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {getDifficultyLabel(question.difficulty)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <p className="text-3xl font-mono font-bold text-center text-gray-800">
                      {question.equation}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="text-lg font-semibold text-gray-700 whitespace-nowrap">
                      Ваш ответ: x =
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      disabled={isChecked}
                      className="text-xl font-bold text-center border-2 focus:border-purple-500"
                      placeholder="?"
                    />
                    {isChecked && (
                      <div className="flex-shrink-0">
                        {isCorrect ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <Icon name="CheckCircle" size={32} />
                            <span className="font-bold text-lg">Верно!</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <Icon name="XCircle" size={32} />
                            <span className="font-bold text-lg">Неверно</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {isChecked && !isCorrect && (
                    <div className="mt-6 p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border-2 border-red-300 animate-fade-in">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon name="BookOpen" size={24} className="text-red-600" />
                        <h3 className="text-xl font-bold text-red-800">Правильное решение:</h3>
                      </div>
                      <div className="space-y-3">
                        {question.steps.map((step, idx) => (
                          <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-red-500">
                            <p className="font-mono text-lg font-bold text-gray-800 mb-1">
                              {step.text}
                            </p>
                            <p className="text-sm text-gray-600">{step.explanation}</p>
                          </div>
                        ))}
                        <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg mt-4">
                          <p className="text-xl font-bold text-center">
                            ✓ Правильный ответ: x = {question.correctAnswer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!isChecked && (
          <div className="mt-8 text-center">
            <Button
              onClick={checkAnswers}
              disabled={Object.keys(answers).length < questions.length}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl py-6 px-12 shadow-2xl hover:shadow-3xl transition-all"
            >
              <Icon name="CheckCheck" className="mr-2" size={28} />
              Проверить все ответы
            </Button>
            {Object.keys(answers).length < questions.length && (
              <p className="text-gray-600 mt-4">
                Ответьте на все {questions.length} вопросов для проверки
              </p>
            )}
          </div>
        )}

        <footer className="mt-16 text-center text-gray-600 pb-8">
          <p className="text-lg">Успехов на контрольной! 🎯</p>
        </footer>
      </div>
    </div>
  );
};

export default Test;
