export const genId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

export const QUESTION_TYPES = [
  { value: "MULTIPLE_CHOICE", label: "Trắc nghiệm" },
  { value: "TRUE_FALSE", label: "Đúng/Sai" },
  { value: "SHORT_ANSWER", label: "Tự luận ngắn" },
];

export const emptyOption = () => ({ 
  id: genId(), 
  option_text: "", 
  is_correct: false 
});

export const emptyQuestion = (type = "MULTIPLE_CHOICE") => ({
  id: genId(),
  question_text: "",
  question_type: type,
  points: 1,
  options: type === "SHORT_ANSWER" ? [] : [emptyOption(), emptyOption()],
  correct_text_answer: "",
  image_url: "",
});

export const emptySection = () => ({ 
  id: genId(), 
  title: "", 
  description: "", 
  questions: [emptyQuestion()] 
});
