import React, { useState } from 'react';

interface SurveyData {
  name: string;
  age: string;
  gender: string;
  giftBudget: string;
}

interface SurveyProps {
  onSubmit: (data: SurveyData) => void;
}

const Survey: React.FC<SurveyProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [giftBudget, setGiftBudget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && gender && giftBudget) {
      onSubmit({ name, age, gender, giftBudget });
    }
  };

  const giftBudgetOptions = [
    '1만원 미만',
    '1만원~3만원',
    '3만원~5만원',
    '5만원~10만원',
    '10만원 이상'
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">설문조사</h1>
          <p className="text-blue-100 text-sm">실험 시작 전 간단한 설문을 진행합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          {/* 나이 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              나이 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="나이를 입력하세요"
              min="1"
              max="120"
              required
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              성별 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="남성"
                  checked={gender === '남성'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  required
                />
                <span className="text-gray-700">남성</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="여성"
                  checked={gender === '여성'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  required
                />
                <span className="text-gray-700">여성</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="기타"
                  checked={gender === '기타'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  required
                />
                <span className="text-gray-700">기타</span>
              </label>
            </div>
          </div>

          {/* 선물 금액대 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              친구에게 선물할 때 주로 지출하는 금액대는 얼마인가요? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {giftBudgetOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    giftBudget === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="giftBudget"
                    value={option}
                    checked={giftBudget === option}
                    onChange={(e) => setGiftBudget(e.target.value)}
                    className="mr-3"
                    required
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!name || !age || !gender || !giftBudget}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
};

export default Survey;


