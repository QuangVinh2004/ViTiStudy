import { useState, useCallback } from "react";
import { genId, emptySection, emptyQuestion, emptyOption } from "./constants";

export const useExamState = () => {
  const [exam, setExam] = useState({
    id: genId(),
    title: "",
    subject: "",
    description: "",
    duration_minutes: 60,
    sections: [emptySection()],
  });

  const handleExamChange = useCallback((e) => {
    const { name, value, type } = e.target;
    setExam((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  }, []);

  const addSection = useCallback(() => {
    setExam((prev) => ({ ...prev, sections: [...prev.sections, emptySection()] }));
  }, []);

  const removeSection = useCallback((sectionId) => {
    setExam((prev) => ({ ...prev, sections: prev.sections.filter((s) => s.id !== sectionId) }));
  }, []);

  const updateSection = useCallback((sectionId, patch) => {
    setExam((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, ...patch } : s)),
    }));
  }, []);

  const addQuestion = useCallback((sectionId) => {
    setExam((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, questions: [...s.questions, emptyQuestion()] } : s
      ),
    }));
  }, []);

  const removeQuestion = useCallback((sectionId, questionId) => {
    setExam((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, questions: s.questions.filter((q) => q.id !== questionId) } : s
      ),
    }));
  }, []);

  const updateQuestion = useCallback((sectionId, questionId, patch) => {
    setExam((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          questions: s.questions.map((q) => (q.id === questionId ? { ...q, ...patch } : q)),
        };
      }),
    }));
  }, []);

  const changeQuestionType = useCallback((sectionId, questionId, newType) => {
    setExam((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          questions: s.questions.map((q) => {
            if (q.id !== questionId) return q;
            if (newType === "SHORT_ANSWER") {
              return { ...q, question_type: newType, options: [], correct_text_answer: q.correct_text_answer || "" };
            }
            if (q.options.length === 0) {
              return { ...q, question_type: newType, options: [emptyOption(), emptyOption()] };
            }
            return { ...q, question_type: newType };
          }),
        };
      }),
    }));
  }, []);

  const addOption = useCallback((sectionId, questionId) => {
    setExam((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          questions: s.questions.map((q) =>
            q.id === questionId ? { ...q, options: [...q.options, emptyOption()] } : q
          ),
        };
      }),
    }));
  }, []);

  const removeOption = useCallback((sectionId, questionId, optionId) => {
    setExam((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          questions: s.questions.map((q) =>
            q.id === questionId ? { ...q, options: q.options.filter((o) => o.id !== optionId) } : q
          ),
        };
      }),
    }));
  }, []);

  const updateOption = useCallback((sectionId, questionId, optionId, patch) => {
    setExam((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          questions: s.questions.map((q) => {
            if (q.id !== questionId) return q;
            if (patch.hasOwnProperty("is_correct") && q.question_type === "TRUE_FALSE" && patch.is_correct) {
              return {
                ...q,
                options: q.options.map((o) => (o.id === optionId ? { ...o, ...patch } : { ...o, is_correct: false })),
              };
            }
            return { ...q, options: q.options.map((o) => (o.id === optionId ? { ...o, ...patch } : o)) };
          }),
        };
      }),
    }));
  }, []);

  return {
    exam,
    handleExamChange,
    addSection,
    removeSection,
    updateSection,
    addQuestion,
    removeQuestion,
    updateQuestion,
    changeQuestionType,
    addOption,
    removeOption,
    updateOption,
  };
};
