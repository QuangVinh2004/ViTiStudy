import { useState, useEffect, useCallback } from 'react';
import api from '../../../api/axios';

export const useExamTest = (examData, examId, onTimeUp) => {
  const STORAGE_KEYS = {
    STARTED: `exam_started_${examId}`,
    TIME_LEFT: `exam_timeLeft_${examId}`,
    ANSWERS: `exam_answers_${examId}`,
    ATTEMPT_ID: `exam_attemptId_${examId}`,
  };

  const totalDuration = examData?.duration_minutes * 60 || 3600;

  const getStoredData = () => {
    const started = localStorage.getItem(STORAGE_KEYS.STARTED) === 'true';
    const timeLeft = localStorage.getItem(STORAGE_KEYS.TIME_LEFT);
    const answers = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    const attemptId = localStorage.getItem(STORAGE_KEYS.ATTEMPT_ID);
    
    return {
      started,
      timeLeft: timeLeft ? Number(timeLeft) : totalDuration,
      answers: answers ? JSON.parse(answers) : {},
      attemptId: attemptId || null,
    };
  };

  const { started: initialStarted, timeLeft: initialTime, answers: initialAnswers, attemptId: initialAttemptId } = getStoredData();

  const [started, setStarted] = useState(initialStarted);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [attemptId, setAttemptId] = useState(initialAttemptId);
  const [submitting, setSubmitting] = useState(false);

  // Tính tổng số câu hỏi
  const totalQuestions = examData?.sections?.reduce((sum, section) => 
    sum + (section.questions?.length || 0), 0
  ) || 0;

  // Convert userAnswers object to array format for backend
  const convertAnswersToArray = useCallback(() => {
    const answersArray = [];
    
    Object.keys(userAnswers).forEach(key => {
      const [sectionIndex, questionIndex] = key.split('-').map(Number);
      const section = examData?.sections?.[sectionIndex];
      const question = section?.questions?.[questionIndex];
      
      if (question) {
        const answer = userAnswers[key];
        const answerObj = {
          question_id: question.id,
        };

        // Convert based on question type
        if (question.question_type === 'MULTIPLE_CHOICE') {
          // answer is option index (0, 1, 2, ...)
          // Get the actual option ID from question.options
          const selectedOption = question.options?.[answer];
          if (selectedOption?.id) {
            answerObj.selected_option_id = selectedOption.id;
          }
        } else if (question.question_type === 'TRUE_FALSE') {
          // answer is object like {0: true, 1: false}
          // Find the option index where value is true
          const selectedIndex = Object.keys(answer).find(idx => answer[idx] === true);
          if (selectedIndex !== undefined) {
            const selectedOption = question.options?.[parseInt(selectedIndex)];
            if (selectedOption?.id) {
              answerObj.selected_option_id = selectedOption.id;
            }
          }
        } else if (question.question_type === 'SHORT_ANSWER') {
          // answer is text string
          answerObj.text_answer = answer;
        }

        answersArray.push(answerObj);
      }
    });
    
    return answersArray;
  }, [userAnswers, examData]);

  // Define handleSubmit early so it can be used in timer
  const handleSubmit = useCallback(async () => {
    if (!attemptId || submitting) return { success: false, error: 'Không thể nộp bài' };
    
    setSubmitting(true);
    
    try {
      // Convert answers to array format
      const answersArray = convertAnswersToArray();
      
      console.log('========== SUBMIT EXAM ==========');
      console.log('UserAnswers object:', userAnswers);
      console.log('Converted answers array:', JSON.stringify(answersArray, null, 2));
      console.log('Number of answers:', answersArray.length);
      
      // Save final answers
      console.log('Saving to:', `/attempts/${attemptId}/answers`);
      await api.post(`/attempts/${attemptId}/answers`, {
        answers: answersArray,
      });

      // Submit the exam
      console.log('Submitting to:', `/attempts/${attemptId}/submit`);
      const response = await api.post(`/attempts/${attemptId}/submit`);
      console.log('Submit response:', response.data);
      console.log('=================================');

      if (response.data && response.data.success) {
        setSubmitted(true);
        
        // Clear localStorage
        localStorage.removeItem(STORAGE_KEYS.STARTED);
        localStorage.removeItem(STORAGE_KEYS.TIME_LEFT);
        localStorage.removeItem(STORAGE_KEYS.ANSWERS);
        localStorage.removeItem(STORAGE_KEYS.ATTEMPT_ID);
        
        return { 
          success: true, 
          attemptId,
          result: response.data.data 
        };
      } else {
        return {
          success: false,
          error: response.data?.message || 'Không thể nộp bài kiểm tra'
        };
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      console.error('Error response:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Không thể nộp bài kiểm tra' 
      };
    } finally {
      setSubmitting(false);
    }
  }, [attemptId, submitting, convertAnswersToArray, userAnswers]);

  // Lưu answers vào localStorage và gửi lên server
  useEffect(() => {
    if (started && !submitted && attemptId) {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(userAnswers));
      
      // Auto-save to server (debounced)
      const saveTimer = setTimeout(async () => {
        try {
          const answersArray = convertAnswersToArray();
          
          // Only save if there are answers
          if (answersArray.length === 0) {
            console.log('No answers to save yet');
            return;
          }
          
          console.log('Auto-saving answers array:', answersArray);
          console.log('Attempt ID:', attemptId);
          
          const response = await api.post(`/attempts/${attemptId}/answers`, {
            answers: answersArray,
          });
          
          console.log('Auto-save response:', response.data);
          console.log('Answers auto-saved to server');
        } catch (error) {
          console.error('Error auto-saving answers:', error);
          console.error('Error response:', error.response?.data);
        }
      }, 2000); // Debounce 2 seconds

      return () => clearTimeout(saveTimer);
    }
  }, [userAnswers, started, submitted, attemptId, convertAnswersToArray]);

  // Timer countdown
  useEffect(() => {
    if (!started || submitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem(STORAGE_KEYS.TIME_LEFT, newTime);
        
        // Auto-submit when time runs out
        if (newTime <= 0) {
          clearInterval(timer);
          
          // Submit exam and notify parent component
          handleSubmit().then(result => {
            if (result.success && onTimeUp) {
              onTimeUp(result.attemptId);
            }
          }).catch(err => {
            console.error('Error auto-submitting exam:', err);
            // Still notify parent even if submit fails
            if (onTimeUp && attemptId) {
              onTimeUp(attemptId);
            }
          });
        }
        
        return newTime > 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submitted, handleSubmit, onTimeUp, attemptId]);

  const handleStart = useCallback(async () => {
    try {
      // Call API to start attempt
      console.log('Starting exam with examId:', examId);
      const response = await api.post('/attempts/start', {
        exam_id: examId,
      });

      console.log('API Response:', response);
      console.log('Response data:', response.data);
      console.log('Response data.data:', response.data.data);
      console.log('Full data object:', JSON.stringify(response.data.data, null, 2));
      
      if (response.data && response.data.data && response.data.data.attempt) {
        const newAttemptId = response.data.data.attempt.id;
        console.log('Extracted attemptId:', newAttemptId);
        
        if (!newAttemptId) {
          console.error('attemptId is undefined! Response structure:', response.data);
          return { success: false, error: 'Server không trả về ID bài làm' };
        }
        
        setStarted(true);
        setTimeLeft(totalDuration);
        setAttemptId(newAttemptId);
        setUserAnswers({});
        
        localStorage.setItem(STORAGE_KEYS.STARTED, 'true');
        localStorage.setItem(STORAGE_KEYS.TIME_LEFT, totalDuration.toString());
        localStorage.setItem(STORAGE_KEYS.ATTEMPT_ID, newAttemptId);
        localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify({}));
        
        return { success: true, attemptId: newAttemptId };
      } else {
        console.error('Invalid response structure:', response.data);
        return { success: false, error: response.data?.message || 'Không thể bắt đầu bài kiểm tra' };
      }
    } catch (error) {
      console.error('Error starting exam attempt:', error);
      console.error('Error details:', error.response?.data);
      return { success: false, error: error.response?.data?.message || 'Không thể bắt đầu bài kiểm tra' };
    }
  }, [examId, totalDuration]);

  const handleAnswerChange = useCallback((sectionIndex, questionIndex, answer) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setUserAnswers((prev) => ({
      ...prev,
      [key]: answer,
    }));
  }, []);

  const getAnsweredCount = useCallback(() => {
    return Object.keys(userAnswers).filter(key => {
      const answer = userAnswers[key];
      if (Array.isArray(answer)) return answer.length > 0;
      if (typeof answer === 'string') return answer.trim() !== '';
      return answer !== null && answer !== undefined;
    }).length;
  }, [userAnswers]);

  const isQuestionAnswered = useCallback((sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    const answer = userAnswers[key];
    
    // For TRUE_FALSE, check if it's an object with at least one answer
    if (typeof answer === 'object' && !Array.isArray(answer)) {
      return Object.keys(answer).length > 0;
    }
    
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === 'string') return answer.trim() !== '';
    return answer !== null && answer !== undefined;
  }, [userAnswers]);

  return {
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
  };
};
