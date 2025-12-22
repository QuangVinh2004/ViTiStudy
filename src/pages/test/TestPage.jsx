import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import ButtonComponent from '../../components/common/ButtonComponent';
import TestHeader from './TestHeader';
import TestConfirmStart from './TestConfirmStart';
import TestSidebar from './TestSidebar';
import TestQuestionList from './TestQuestionList';
import { useExamTest } from './hooks/useExamTest';

function TestPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [startError, setStartError] = useState(null);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const questionRefs = useRef([]);

  // Fetch exam data from API
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/exams/${examId}`);
        if (response.data && response.data.data) {
          setExamData(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError('Không thể tải dữ liệu bài kiểm tra');
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      fetchExamData();
    }
  }, [examId]);

  const {
    started,
    timeLeft,
    userAnswers,
    submitted,
    submitting,
    attemptId,
    totalQuestions,
    handleStart,
    handleAnswerChange,
    handleSubmit,
    getAnsweredCount,
    isQuestionAnswered,
  } = useExamTest(examData, examId);

  // Prevent navigation when exam is in progress
  useEffect(() => {
    if (started && !submitted) {
      const handleBeforeUnload = (e) => {
        // This will show browser's default warning dialog
        const message = 'Bạn đang làm bài kiểm tra. Bạn có chắc muốn rời khỏi trang?';
        e.preventDefault();
        e.returnValue = message;
        return message;
      };

      const handleUnload = () => {
        // Only clear localStorage if not reloading
        // Check if navigation is happening (not reload)
        const isReloading = performance.navigation?.type === 1 || 
                           performance.getEntriesByType('navigation')[0]?.type === 'reload';
        
        if (!isReloading) {
          // User is closing tab or navigating away - clear storage and submit
          localStorage.removeItem(`exam_started_${examId}`);
          localStorage.removeItem(`exam_timeLeft_${examId}`);
          localStorage.removeItem(`exam_answers_${examId}`);
          localStorage.removeItem(`exam_attemptId_${examId}`);
          
          // Try to submit (may not complete if page is closing)
          try {
            handleSubmit();
          } catch (err) {
            console.error('Error submitting exam on exit:', err);
          }
        }
        // If reloading, keep localStorage intact
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('unload', handleUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('unload', handleUnload);
      };
    }
  }, [started, submitted, handleSubmit, examId]);

  const handleStartClick = () => setShowConfirm(true);
  
  const handleConfirmStart = async () => {
    setStartError(null);
    const result = await handleStart();
    
    if (result.success) {
      setShowConfirm(false);
      console.log('Exam started successfully with attemptId:', result.attemptId);
    } else {
      console.error('Failed to start exam:', result.error);
      setStartError(result.error);
      // Keep confirmation modal open to show error
    }
  };

  const handleSubmitExam = async () => {
    // Confirm submission
    const answeredCount = getAnsweredCount();
    const unansweredCount = totalQuestions - answeredCount;
    
    if (unansweredCount > 0) {
      const confirmMsg = `Bạn còn ${unansweredCount} câu chưa trả lời.\n\nBạn có chắc chắn muốn nộp bài?`;
      if (!window.confirm(confirmMsg)) {
        return;
      }
    } else {
      const confirmMsg = 'Bạn có chắc chắn muốn nộp bài?';
      if (!window.confirm(confirmMsg)) {
        return;
      }
    }

    const result = await handleSubmit();
    
    if (result.success) {
      console.log('Exam submitted successfully');
      // Navigate to result page
      navigate(`/test/${examId}/result/${result.attemptId}`);
    } else {
      console.error('Failed to submit exam:', result.error);
      alert(result.error);
    }
  };

  const handleJumpToQuestion = (idx) => {
    questionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài kiểm tra...</p>
        </div>
      </div>
    );
  }

  if (error || !examData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không thể tải bài kiểm tra</h2>
          <p className="text-gray-600 mb-4">{error || 'Bài kiểm tra không tồn tại'}</p>
          <ButtonComponent 
            onClick={() => navigate(-1)} 
            text="Quay lại" 
            className="bg-sky-500 hover:bg-sky-600"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <TestHeader examData={examData} />
      {!started ? (
        showConfirm ? (
          <TestConfirmStart
            onConfirm={handleConfirmStart}
            onCancel={() => {
              setShowConfirm(false);
              setStartError(null);
            }}
            examData={examData}
            error={startError}
          />
        ) : startError ? (
          <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Không thể bắt đầu bài kiểm tra</h2>
              <p className="text-gray-600 mb-4">{startError}</p>
            </div>
            <div className="flex justify-center gap-3">
              <ButtonComponent 
                onClick={() => navigate(-1)} 
                text="Quay lại" 
                className="bg-gray-500 hover:bg-gray-600"
              />
              <ButtonComponent 
                onClick={() => setStartError(null)} 
                text="Thử lại" 
                className="bg-sky-500 hover:bg-sky-600"
              />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Sẵn sàng bắt đầu?</h2>
              <p className="text-gray-600 mb-2">
                Bài kiểm tra gồm {totalQuestions} câu hỏi, thời gian làm bài {examData.duration_minutes} phút
              </p>
              <p className="text-sm text-gray-500">
                Hãy đảm bảo bạn có đủ thời gian để hoàn thành bài kiểm tra
              </p>
            </div>
            <div className="flex justify-center">
              <ButtonComponent 
                onClick={handleStartClick} 
                text="Bắt đầu làm bài" 
                className="px-8 py-3 text-lg"
              />
            </div>
          </div>
        )
      ) : (
        <div className="max-w-7xl mx-auto p-6 mt-4 flex flex-col md:flex-row gap-6">
          <TestQuestionList
            examData={examData}
            userAnswers={userAnswers}
            submitted={submitted}
            onAnswerChange={handleAnswerChange}
            questionRefs={questionRefs}
          />
          <TestSidebar
            timeLeft={timeLeft}
            submitted={submitted}
            submitting={submitting}
            formatTime={formatTime}
            examData={examData}
            userAnswers={userAnswers}
            onJumpToQuestion={handleJumpToQuestion}
            onSubmit={handleSubmitExam}
            getAnsweredCount={getAnsweredCount}
            isQuestionAnswered={isQuestionAnswered}
          />
        </div>
      )}
    </>
  );
}

export default TestPage;
