const testData = [
  {
    question: "Chiến tranh thế giới thứ hai bắt đầu vào năm nào?",
    options: ["1939", "1945", "1914", "1950"],
    answer: "1939",
    explanation: "Chiến tranh thế giới thứ hai bắt đầu vào ngày 1 tháng 9 năm 1939 khi Đức xâm lược Ba Lan.",
    image: null,
    audio: null
  },
  {
    question: "Ai là lãnh đạo của Đức trong Thế chiến II?",
    options: ["Winston Churchill", "Joseph Stalin", "Adolf Hitler", "Franklin D. Roosevelt"],
    answer: "Adolf Hitler",
    explanation: "Adolf Hitler là lãnh đạo Đức Quốc xã trong Thế chiến II.",
    image: "https://tulieuvankien.dangcongsan.vn/Uploads/2018/8/5/1/chien-tranh-the-gioi-thu-hai-1939-1945-1.jpg",
    audio: null
  },
  {
    question: "Trận Stalingrad là giữa quốc gia nào?",
    options: ["Đức và Liên Xô", "Mỹ và Nhật", "Anh và Ý", "Pháp và Đức"],
    answer: "Đức và Liên Xô",
    explanation: "Trận Stalingrad diễn ra giữa Đức và Liên Xô, là bước ngoặt quan trọng của cuộc chiến.",
    image: null,
    audio: null
  },
  {
    question: "Thành phố nào bị ném bom nguyên tử đầu tiên?",
    options: ["Hiroshima", "Tokyo", "Osaka", "Nagasaki"],
    answer: "Hiroshima",
    explanation: "Mỹ đã ném quả bom nguyên tử đầu tiên xuống Hiroshima vào ngày 6/8/1945.",
    image: null,
    audio: null
  },
  {
    question: "Nước nào là một phần của phe Trục?",
    options: ["Mỹ", "Anh", "Nhật Bản", "Liên Xô"],
    answer: "Nhật Bản",
    explanation: "Nhật Bản cùng với Đức và Ý tạo thành phe Trục trong Thế chiến II."
  },
  {
    question: "Ai là Thủ tướng Anh trong thời gian Thế chiến II?",
    options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Tony Blair"],
    answer: "Winston Churchill",
    explanation: "Winston Churchill là thủ tướng nổi bật trong thời kỳ chiến tranh."
  },
  {
    question: "Trận Trân Châu Cảng diễn ra vào năm nào?",
    options: ["1941", "1942", "1939", "1944"],
    answer: "1941",
    explanation: "Trận Trân Châu Cảng xảy ra vào ngày 7/12/1941, khiến Mỹ tham chiến."
  },
  {
    question: "Phe Đồng minh gồm những quốc gia chính nào?",
    options: ["Đức, Ý, Nhật", "Anh, Mỹ, Liên Xô", "Pháp, Đức, Nhật", "Ý, Mỹ, Pháp"],
    answer: "Anh, Mỹ, Liên Xô",
    explanation: "Ba quốc gia chính của phe Đồng minh là Anh, Mỹ và Liên Xô."
  },
  {
    question: "Thế chiến II kết thúc vào năm nào?",
    options: ["1943", "1944", "1945", "1946"],
    answer: "1945",
    explanation: "Chiến tranh kết thúc năm 1945 sau khi Đức và Nhật đầu hàng."
  },
  {
    question: "Trại tập trung Auschwitz nằm ở quốc gia nào?",
    options: ["Đức", "Ba Lan", "Áo", "Hungary"],
    answer: "Ba Lan",
    explanation: "Trại tập trung Auschwitz nổi tiếng nằm tại Ba Lan do Đức Quốc xã lập ra."
  },
  {
    question: "Chiến dịch Barbarossa là tên mã cho cuộc tấn công nào?",
    options: ["Đức tấn công Liên Xô", "Mỹ tấn công Nhật", "Anh tấn công Ý", "Nhật tấn công Trung Quốc"],
    answer: "Đức tấn công Liên Xô",
    explanation: "Chiến dịch Barbarossa là tên mã cho cuộc tấn công của Đức vào Liên Xô năm 1941."
  },
  {
    question: "Hiệp ước không xâm lược giữa Đức và Liên Xô được gọi là gì?",
    options: ["Hiệp ước Versailles", "Hiệp ước Molotov–Ribbentrop", "Hiệp ước Paris", "Hiệp ước Geneva"],
    answer: "Hiệp ước Molotov–Ribbentrop",
    explanation: "Hiệp ước Molotov–Ribbentrop được ký năm 1939 giữa Đức và Liên Xô."
  },
  {
    question: "Quốc gia nào bị Đức xâm lược đầu tiên trong Thế chiến II?",
    options: ["Pháp", "Ba Lan", "Bỉ", "Hà Lan"],
    answer: "Ba Lan",
    explanation: "Đức xâm lược Ba Lan ngày 1/9/1939, mở đầu Thế chiến II."
  },
  {
    question: "Ai là Tổng thống Mỹ khi Thế chiến II kết thúc?",
    options: ["Franklin D. Roosevelt", "Harry S. Truman", "Dwight D. Eisenhower", "John F. Kennedy"],
    answer: "Harry S. Truman",
    explanation: "Harry S. Truman là Tổng thống Mỹ khi chiến tranh kết thúc năm 1945."
  },
  {
    question: "Quốc gia nào đầu hàng vô điều kiện đầu tiên trong phe Trục?",
    options: ["Đức", "Nhật Bản", "Ý", "Hungary"],
    answer: "Ý",
    explanation: "Ý đầu hàng vô điều kiện vào năm 1943."
  },
  {
    question: "Trận Midway là bước ngoặt ở mặt trận nào?",
    options: ["Châu Âu", "Bắc Phi", "Thái Bình Dương", "Đông Âu"],
    answer: "Thái Bình Dương",
    explanation: "Trận Midway là bước ngoặt quan trọng ở mặt trận Thái Bình Dương."
  },
  {
    question: "Chiến dịch D-Day diễn ra ở đâu?",
    options: ["Ý", "Pháp", "Đức", "Bỉ"],
    answer: "Pháp",
    explanation: "D-Day là cuộc đổ bộ của Đồng minh lên bờ biển Normandy, Pháp ngày 6/6/1944."
  },
  {
    question: "Ai là lãnh đạo Liên Xô trong Thế chiến II?",
    options: ["Vladimir Lenin", "Joseph Stalin", "Nikita Khrushchev", "Leon Trotsky"],
    answer: "Joseph Stalin",
    explanation: "Joseph Stalin là lãnh đạo Liên Xô trong Thế chiến II."
  },
  {
    question: "Quốc gia nào bị chiếm đóng bởi cả Đức và Liên Xô?",
    options: ["Pháp", "Ba Lan", "Na Uy", "Đan Mạch"],
    answer: "Ba Lan",
    explanation: "Ba Lan bị chia cắt và chiếm đóng bởi cả Đức và Liên Xô năm 1939."
  },
  {
    question: "Hội nghị Yalta năm 1945 có sự tham gia của các lãnh đạo nào?",
    options: [
      "Churchill, Roosevelt, Stalin",
      "Hitler, Mussolini, Tojo",
      "De Gaulle, Eisenhower, Stalin",
      "Truman, Churchill, Hitler"
    ],
    answer: "Churchill, Roosevelt, Stalin",
    explanation: "Hội nghị Yalta có Churchill (Anh), Roosevelt (Mỹ), Stalin (Liên Xô)."
  },
  {
    question: "Quốc gia nào bị ném bom nguyên tử thứ hai?",
    options: ["Hiroshima", "Nagasaki", "Tokyo", "Osaka"],
    answer: "Nagasaki",
    explanation: "Nagasaki bị ném bom nguyên tử ngày 9/8/1945."
  },
  {
    question: "Chiến dịch Market Garden diễn ra ở quốc gia nào?",
    options: ["Pháp", "Hà Lan", "Bỉ", "Đức"],
    answer: "Hà Lan",
    explanation: "Market Garden là chiến dịch của Đồng minh tại Hà Lan năm 1944."
  },
  {
    question: "Ai là chỉ huy tối cao của lực lượng Đồng minh ở châu Âu?",
    options: ["George Patton", "Bernard Montgomery", "Dwight D. Eisenhower", "Douglas MacArthur"],
    answer: "Dwight D. Eisenhower",
    explanation: "Eisenhower là chỉ huy tối cao của lực lượng Đồng minh ở châu Âu."
  },
  {
    question: "Trận El Alamein diễn ra ở đâu?",
    options: ["Ai Cập", "Ý", "Pháp", "Đức"],
    answer: "Ai Cập",
    explanation: "Trận El Alamein là trận đánh lớn ở Ai Cập giữa Anh và Đức."
  },
  {
    question: "Quốc gia nào không thuộc phe Đồng minh?",
    options: ["Anh", "Mỹ", "Nhật Bản", "Liên Xô"],
    answer: "Nhật Bản",
    explanation: "Nhật Bản thuộc phe Trục, không phải Đồng minh."
  },
  {
    question: "Chiến dịch nào đánh dấu sự kết thúc của Đức Quốc xã?",
    options: ["Chiến dịch Barbarossa", "Chiến dịch Berlin", "Chiến dịch Overlord", "Chiến dịch Torch"],
    answer: "Chiến dịch Berlin",
    explanation: "Chiến dịch Berlin dẫn đến sự sụp đổ của Đức Quốc xã năm 1945."
  },
  {
    question: "Quốc gia nào bị Đức chiếm đóng nhưng vẫn duy trì chính phủ bù nhìn Vichy?",
    options: ["Pháp", "Bỉ", "Na Uy", "Hà Lan"],
    answer: "Pháp",
    explanation: "Pháp bị chia làm hai vùng, vùng Vichy do chính phủ bù nhìn kiểm soát."
  },
  {
    question: "Trận chiến nào là trận không chiến lớn nhất lịch sử?",
    options: ["Trận Stalingrad", "Trận Midway", "Trận Anh", "Trận Bulge"],
    answer: "Trận Anh",
    explanation: "Trận Anh là trận không chiến lớn nhất giữa Đức và Anh năm 1940."
  },
  {
    question: "Quốc gia nào bị Nhật chiếm đóng ở Đông Nam Á?",
    options: ["Việt Nam", "Ấn Độ", "Úc", "New Zealand"],
    answer: "Việt Nam",
    explanation: "Nhật chiếm đóng Việt Nam từ năm 1940 đến 1945."
  },
  {
    question: "Ai là lãnh đạo của Ý trong Thế chiến II?",
    options: ["Benito Mussolini", "Victor Emmanuel III", "Giuseppe Garibaldi", "Matteo Renzi"],
    answer: "Benito Mussolini",
    explanation: "Benito Mussolini là lãnh đạo phát xít Ý trong Thế chiến II."
  }
];


export default testData;