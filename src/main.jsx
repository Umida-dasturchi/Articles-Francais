import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allOptions = ['le', 'la', "l'", 'les', 'un', 'une', 'des'];

  const handleAnswer = (index, option) => {
    if (!submitted) {
      setSelectedAnswers(prev => ({ ...prev, [index]: option }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const correctCount = Object.keys(selectedAnswers).filter(
    index => questions[index].answer === selectedAnswers[index]
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">French Articles Quiz (70 Questions)</h1>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-md">
            <p className="font-semibold text-lg mb-3">
              {index + 1}. ____ {q.word}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {allOptions.map(option => {
                const isSelected = selectedAnswers[index] === option;
                const isCorrect = submitted && option === q.answer;
                const isWrongSelected = submitted && isSelected && option !== q.answer;

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(index, option)}
                    disabled={submitted}
                    className={`
                      py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200
                      ${isSelected ? 'ring-2 ring-blue-400' : 'bg-gray-100 hover:bg-gray-200'}
                      ${isCorrect ? 'bg-green-200' : ''}
                      ${isWrongSelected ? 'bg-red-200' : ''}
                    `}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-blue-700 transition"
          >
            Submit Answers
          </button>
        ) : (
          <p className="text-xl font-semibold mt-4">
            You got {correctCount} out of {questions.length} correct.
          </p>
        )}
      </div>
    </div>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(<Quiz />);
