import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import ButtonComponent from '../../components/common/ButtonComponent';

export default function TestResultPage() {
  const { examId, attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/attempts/${attemptId}/result`);
        if (response.data && response.data.data) {
          const { attempt, answers } = response.data.data;
          
          // Tính toán các chỉ số từ answers
          const correctAnswers = answers.filter(a => a.is_correct).length;
          const unanswered = answers.filter(a => !a.selected_option_id && !a.text_answer).length;
          const incorrectAnswers = answers.filter(a => {
            // Câu đã trả lời (có selected_option_id hoặc text_answer) NHƯNG sai
            const isAnswered = a.selected_option_id || a.text_answer;
            return isAnswered && !a.is_correct;
          }).length;
          const totalQuestions = answers.length;
          
          // Tính tổng điểm tối đa
          const totalPoints = answers.reduce((sum, a) => sum + (a.points || 0), 0);
          
          // Kết hợp dữ liệu
          const processedResult = {
            attempt,
            answers,
            total_questions: totalQuestions,
            correct_answers: correctAnswers,
            incorrect_answers: incorrectAnswers,
            unanswered: unanswered,
            score: attempt.total_score,
            total_points: totalPoints,
            submitted_at: attempt.completed_at,
            duration_minutes: attempt.duration_minutes
          };
          
          setResult(processedResult);
        }
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Không thể tải kết quả bài kiểm tra');
      } finally {
        setLoading(false);
      }
    };

    if (attemptId) {
      fetchResult();
    }
  }, [attemptId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải kết quả...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không thể tải kết quả</h2>
          <p className="text-gray-600 mb-4">{error || 'Kết quả không tồn tại'}</p>
          <ButtonComponent 
            onClick={() => navigate('/')} 
            text="Về trang chủ" 
            className="bg-sky-500 hover:bg-sky-600"
          />
        </div>
      </div>
    );
  }

  const scorePercentage = result.total_points > 0 
    ? Math.round((result.score / result.total_points) * 100) 
    : 0;

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return '🎉 Xuất sắc!';
    if (percentage >= 50) return '👍 Khá tốt!';
    return '💪 Cố gắng hơn!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 rounded-full mb-4">
              <span className="text-5xl">🎯</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Kết quả bài kiểm tra</h1>
            <p className="text-gray-600">{result.attempt?.exam_title || 'Bài kiểm tra'}</p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl p-8 text-white mb-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                {result.score}/{result.total_points}
              </div>
              <div className="text-2xl mb-2">{scorePercentage}%</div>
              <div className="text-xl">{getScoreMessage(scorePercentage)}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{result.total_questions}</div>
              <div className="text-sm text-gray-600">Tổng câu hỏi</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{result.correct_answers}</div>
              <div className="text-sm text-gray-600">Câu đúng</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{result.incorrect_answers}</div>
              <div className="text-sm text-gray-600">Câu sai</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{result.unanswered}</div>
              <div className="text-sm text-gray-600">Chưa làm</div>
            </div>
          </div>

          {/* Time Info */}
          {result.duration_minutes && (
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">⏱️ Thời gian tối đa:</span>
                <span className="font-semibold text-gray-800">
                  {result.duration_minutes} phút
                </span>
              </div>
            </div>
          )}

          {/* Submitted At */}
          {result.submitted_at && (
            <div className="text-center text-sm text-gray-500 mb-4">
              Nộp bài lúc: {new Date(result.submitted_at).toLocaleString('vi-VN')}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonComponent 
              onClick={() => navigate('/')} 
              text="Về trang chủ" 
              className="bg-gray-500 hover:bg-gray-600"
            />
            <ButtonComponent 
              onClick={() => navigate(`/test/${examId}`)} 
              text="Làm lại" 
              className="bg-sky-500 hover:bg-sky-600"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Thông tin chi tiết</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Tỷ lệ chính xác</span>
              <span className={`font-bold ${getScoreColor(scorePercentage)}`}>
                {scorePercentage}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Điểm đạt được</span>
              <span className="font-bold text-gray-800">
                {result.score} / {result.total_points}
              </span>
            </div>
            {result.pass_score && (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Điểm đạt</span>
                <span className={`font-bold ${result.score >= result.pass_score ? 'text-green-600' : 'text-red-600'}`}>
                  {result.pass_score} điểm
                  {result.score >= result.pass_score ? ' ✓' : ' ✗'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Questions Review */}
        {result.answers && result.answers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Chi tiết từng câu</h2>
            <div className="space-y-4">
              {result.answers.map((answer, index) => {
                // Xác định trạng thái câu trả lời
                const isAnswered = answer.selected_option_id || answer.text_answer;
                const isCorrect = answer.is_correct;
                const isUnanswered = !isAnswered;
                
                // Xác định màu border
                let borderColor = 'border-gray-200 bg-gray-50'; // Mặc định
                if (isUnanswered) {
                  borderColor = 'border-yellow-200 bg-yellow-50';
                } else if (isCorrect) {
                  borderColor = 'border-green-200 bg-green-50';
                } else {
                  borderColor = 'border-red-200 bg-red-50';
                }
                
                return (
                  <div 
                    key={answer.answer_id || index} 
                    className={`border-2 rounded-lg p-4 ${borderColor}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-600">
                            Câu {index + 1}
                          </span>
                          {isUnanswered && (
                            <span className="inline-block bg-yellow-500 text-white px-2 py-1 text-xs rounded font-bold">
                              ? Chưa trả lời
                            </span>
                          )}
                          {!isUnanswered && isCorrect && (
                            <span className="inline-block bg-green-500 text-white px-2 py-1 text-xs rounded font-bold">
                              ✓ Đúng
                            </span>
                          )}
                          {!isUnanswered && !isCorrect && (
                            <span className="inline-block bg-red-500 text-white px-2 py-1 text-xs rounded font-bold">
                              ✗ Sai
                            </span>
                          )}
                        </div>
                      <p className="text-gray-800 font-semibold">{answer.question_text}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-xl font-bold text-gray-800">
                        {answer.score_obtained || 0}/{answer.points || 0}
                      </div>
                    </div>
                  </div>

                  {/* Question Image if exists */}
                  {answer.image_url && (
                    <div className="mb-3">
                      <img 
                        src={answer.image_url} 
                        alt="Question" 
                        className="max-w-full h-auto rounded max-h-48"
                      />
                    </div>
                  )}

                  {/* Answer Options */}
                  {answer.question_type !== 'essay' && answer.all_options && (
                    <div className="mb-3">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Các lựa chọn:</div>
                      <div className="space-y-2">
                        {answer.all_options.map((option) => {
                          const isSelected = option.id === answer.selected_option_id;
                          const isCorrectOption = option.is_correct;
                          
                          let bgColor = 'bg-white border-gray-200';
                          if (isCorrectOption && !isSelected) {
                            bgColor = 'bg-green-100 border-green-500';
                          } else if (isSelected && isCorrectOption) {
                            bgColor = 'bg-green-200 border-green-500';
                          } else if (isSelected && !isCorrectOption) {
                            bgColor = 'bg-red-200 border-red-500';
                          }
                          
                          return (
                            <div 
                              key={option.id} 
                              className={`border-2 rounded p-2 ${bgColor}`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <p className="text-gray-800">{option.option_text}</p>
                                </div>
                                {isSelected && <span className="text-lg">→ Bạn chọn</span>}
                                {isCorrectOption && <span className="text-green-600 font-bold">✓ Đúng</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Text Answer for Essay Questions */}
                  {answer.question_type === 'essay' && (
                    <div className="mb-3">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Câu trả lời của bạn:</div>
                      <div className="bg-white border border-gray-300 rounded p-2">
                        <p className="text-gray-800">{answer.text_answer || '(Trống)'}</p>
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  {answer.explanation && (
                    <div className="mt-3 pt-3 border-t-2 border-gray-200">
                      <div className="text-sm font-semibold text-gray-600 mb-2">💡 Giải thích:</div>
                      <p className="text-gray-700 text-sm">{answer.explanation}</p>
                    </div>
                  )}

                  {/* AI Feedback */}
                  {answer.ai_feedback_detail && (
                    <div className="mt-3 pt-3 border-t-2 border-blue-200 bg-blue-50 p-2 rounded">
                      <div className="text-sm font-semibold text-blue-600 mb-2">🤖 Nhận xét của AI:</div>
                      <p className="text-blue-900 text-sm">{answer.ai_feedback_detail}</p>
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
