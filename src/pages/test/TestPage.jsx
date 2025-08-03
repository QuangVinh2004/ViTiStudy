import { useState, useEffect, useRef } from 'react';
import TestData from '../../data/test';
import ButtonComponent from '../../components/common/ButtonComponent';
import TestHeader from './TestHeader';
import TestConfirmStart from './TestConfirmStart';
import TestSidebar from './TestSidebar';
import TestQuestionList from './TestQuestionList';

function TestPage() {
    const TOTAL_TIME = 600;
    const getStarted = () => localStorage.getItem('quiz_started') === 'true';
    const getTimeLeft = () => {
        const val = localStorage.getItem('quiz_timeLeft');
        return val ? Number(val) : TOTAL_TIME;
    };

    const [userAnswers, setUserAnswers] = useState(Array(TestData.length).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const [started, setStarted] = useState(getStarted());
    const [showConfirm, setShowConfirm] = useState(false);
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    const questionRefs = useRef([]);

    const handleStartClick = () => setShowConfirm(true);
    const handleConfirmStart = () => {
        setStarted(true);
        setShowConfirm(false);
        localStorage.setItem('quiz_started', 'true');
        localStorage.setItem('quiz_timeLeft', TOTAL_TIME);
        setTimeLeft(TOTAL_TIME);
    };

    useEffect(() => {
        if (!started || submitted) return;
        if (timeLeft <= 0) {
            setSubmitted(true);
            localStorage.removeItem('quiz_started');
            localStorage.removeItem('quiz_timeLeft');
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((t) => {
                localStorage.setItem('quiz_timeLeft', t - 1);
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [started, timeLeft, submitted]);

    const handleSelect = (questionIndex, option) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionIndex] = option;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        setSubmitted(true);
        localStorage.removeItem('quiz_started');
        localStorage.removeItem('quiz_timeLeft');
    };

    const handleJumpToQuestion = (idx) => {
        questionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const score = userAnswers.filter((ans, i) => ans === TestData[i].answer).length;

    return (
        <>
            <TestHeader totalQuestions={TestData.length} time={10} />
            {!started ? (
                showConfirm ? (
                    <TestConfirmStart
                        onConfirm={handleConfirmStart}
                        onCancel={() => setShowConfirm(false)}
                    />
                ) : (
                    <div className="max-w-md mx-auto mt-8 flex justify-center">
                        <ButtonComponent onClick={handleStartClick} text="Bắt đầu làm bài" />
                    </div>
                )
            ) : (
                <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-2 flex flex-col md:flex-row gap-6">
                    <TestQuestionList
                        TestData={TestData}
                        userAnswers={userAnswers}
                        submitted={submitted}
                        handleSelect={handleSelect}
                        questionRefs={questionRefs}
                    />
                    <TestSidebar
                        timeLeft={timeLeft}
                        submitted={submitted}
                        formatTime={formatTime}
                        userAnswers={userAnswers}
                        TestData={TestData}
                        handleJumpToQuestion={handleJumpToQuestion}
                        handleSubmit={handleSubmit}
                        score={score}
                    />
                </div>
            )}
        </>
    );
}

export default TestPage;
