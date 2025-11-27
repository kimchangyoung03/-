import React, { useState } from 'react';

interface PostSurveyProps {
  onSubmit: (preference: '빵' | '과일') => void;
}

const PostSurvey: React.FC<PostSurveyProps> = ({ onSubmit }) => {
  const [preference, setPreference] = useState<'빵' | '과일' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preference) {
      onSubmit(preference);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">사후 설문조사</h1>
          <p className="text-blue-100 text-sm">실험에 참여해주셔서 감사합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              선택하는데 어느 쪽의 웹사이트가 더 편리했나요? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  preference === '빵'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="preference"
                  value="빵"
                  checked={preference === '빵'}
                  onChange={(e) => setPreference(e.target.value as '빵')}
                  className="mr-3"
                  required
                />
                <span className="text-gray-700 text-lg font-medium">빵</span>
              </label>
              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  preference === '과일'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="preference"
                  value="과일"
                  checked={preference === '과일'}
                  onChange={(e) => setPreference(e.target.value as '과일')}
                  className="mr-3"
                  required
                />
                <span className="text-gray-700 text-lg font-medium">과일</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!preference}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostSurvey;



