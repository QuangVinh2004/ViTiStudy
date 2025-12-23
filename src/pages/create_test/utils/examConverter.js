import { genId } from "../constants";

/**
 * Convert AI generated exam to editable format (with IDs)
 */
export const convertAIExamToEditable = (aiExam, userInputDuration = null) => {
  console.log("AI Exam received:", aiExam); // 🔍 Debug log
  console.log("Duration from AI:", aiExam.duration, aiExam.duration_minutes); // 🔍 Debug log
  console.log("User input duration:", userInputDuration); // 🔍 Debug log
  
  // Ưu tiên duration từ user input, sau đó mới đến AI response
  const finalDuration = userInputDuration || aiExam.duration || aiExam.duration_minutes || 60;
  
  return {
    id: genId(),
    title: aiExam.title || "",
    subject: aiExam.subject || "",
    grade: aiExam.grade || "",
    description: aiExam.description || "",
    duration_minutes: finalDuration, // ✅ Sử dụng duration_minutes để khớp với ExamBasicInfo
    sections: (aiExam.sections || []).map((section) => ({
      id: genId(),
      title: section.title || "",
      description: section.description || "",
      questions: (section.questions || []).map((question) => ({
        id: genId(),
        question_text: question.question_text || "",
        question_type: question.question_type || "MULTIPLE_CHOICE",
        points: question.points || 1,
        image_url: question.image_url || "",
        correct_text_answer: question.correct_text_answer || "",
        options: (question.options || []).map((option) => ({
          id: genId(),
          option_text: option.option_text || "",
          is_correct: option.is_correct || false,
        })),
      })),
    })),
  };
};

/**
 * Convert editable format to backend format (remove IDs)
 */
export const convertEditableToBackend = (exam) => {
  console.log("Converting to backend, duration_minutes:", exam.duration_minutes); // 🔍 Debug log
  
  return {
    title: exam.title || "",
    description: exam.description || "",
    subject: exam.subject || "",
    grade: exam.grade || "",
    duration_minutes: exam.duration_minutes ? parseInt(exam.duration_minutes) : 60,
    sections: exam.sections?.map((section, sIdx) => ({
      section_number: sIdx + 1,
      title: section.title || `Phần ${sIdx + 1}`,
      questions: section.questions?.map((q, qIdx) => ({
        question_number: qIdx + 1,
        question_text: q.question_text || "",
        question_type: q.question_type || "multiple_choice",
        points: q.points ? parseFloat(parseFloat(q.points).toFixed(2)) : 1, // ✅ Parse và làm tròn 2 chữ số thập phân
        image_url: q.image_url || null,
        options: q.options?.map((opt, optIdx) => ({
          option_number: optIdx + 1,
          option_text: opt.option_text || "",
          is_correct: opt.is_correct || false,
        })) || [],
        correct_answer: q.correct_answer || null,
      })) || [],
    })) || [],
  };
};
