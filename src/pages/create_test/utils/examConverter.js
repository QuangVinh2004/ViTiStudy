import { genId } from "../constants";

/**
 * Convert AI generated exam to editable format (with IDs)
 */
export const convertAIExamToEditable = (aiExam) => {
  return {
    id: genId(),
    title: aiExam.title || "",
    subject: aiExam.subject || "",
    description: aiExam.description || "",
    duration_minutes: aiExam.duration_minutes || 60,
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
  const { id: examId, sections, ...restExam } = exam;
  return {
    ...restExam,
    sections: sections.map((section) => {
      const { id: secId, questions, ...restSection } = section;
      return {
        ...restSection,
        questions: questions.map((question) => {
          const { id: qId, options, ...restQuestion } = question;
          return {
            ...restQuestion,
            options: options.map((option) => {
              const { id: optId, ...restOption } = option;
              return restOption;
            }),
          };
        }),
      };
    }),
  };
};
