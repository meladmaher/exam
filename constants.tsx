
import { Subject, Exam } from './types';

export const SUBJECTS: Subject[] = [];

export const ELECTRONIC_EXAMS_MCQ: Exam = {
  id: 'e_exams_mcq_101',
  subjectId: 'electronic_exams',
  title: { ar: 'مقرر الاختبارات الإلكترونية (اختيار وصح/خطأ)', en: 'Electronic Exams Course (MCQ & T/F)' },
  active: true,
  thumbnail: '💻',
  questions: [
    // --- 25 Multiple Choice Questions ---
    { id: 'eq1', type: 'multiple-choice', questionText: { ar: 'أي من المفاهيم التالية يشير إلى العملية التي نحدد بواسطتها كمية ما يوجد في الشيء من المقاييس المدرجة، أو السمة التي نقيسها ويعبر عنها بقيمة رقمية؟', en: 'Q1' }, options: [{ ar: 'أ) العد', en: 'A' }, { ar: 'ب) القياس', en: 'B' }, { ar: 'ج) التقدير', en: 'C' }, { ar: 'د) التقييم', en: 'D' }], correctAnswer: '1' },
    { id: 'eq2', type: 'multiple-choice', questionText: { ar: 'أي من المفاهيم التالية هو أقدم من القياس ومرادف للتخمين، ويتم اللجوء إليه فقط إذا كانت الفروق في السمة واضحة أو لم تكن لدينا أداة قياس؟', en: 'Q2' }, options: [{ ar: 'أ) التقييم', en: 'A' }, { ar: 'ب) التقدير', en: 'B' }, { ar: 'ج) التقويم', en: 'C' }, { ar: 'د) العد', en: 'D' }], correctAnswer: '1' },
    { id: 'eq3', type: 'multiple-choice', questionText: { ar: 'أي من الخطوات التالية تُعّد المرحلة الأخيرة في عملية التقويم المكونة من ثماني خطوات؟', en: 'Q3' }, options: [{ ar: 'أ) تحديد الهدف من التقويم', en: 'A' }, { ar: 'ب) تصميم وبناء أدوات التقويم', en: 'B' }, { ar: 'ج) إصدار الحكم أو القرار ومتابعة تنفيذه', en: 'C' }, { ar: 'د) تحليل البيانات وتسجيلها', en: 'D' }], correctAnswer: '2' },
    { id: 'eq4', type: 'multiple-choice', questionText: { ar: 'من وظائف التقويم "تمكين صانعي القرارات من اتخاذ قرارات مناسبة حول التطوير التربوي وتطوير المنهج". هذا يندرج تحت وظيفة:', en: 'Q4' }, options: [{ ar: 'أ) مساعدة المتعلم على اتخاذ القرار المناسب حول مواصلة الدراسة', en: 'A' }, { ar: 'ب) توفير معلومات وافية وصحيحة عن الفرد أو مجموعة الأفراد', en: 'B' }, { ar: 'ج) تقدير مستوى التحصيل المبدئي للمتعلم', en: 'C' }, { ar: 'د) تحفيز المتعلمين على التعلم', en: 'D' }], correctAnswer: '1' },
    { id: 'eq5', type: 'multiple-choice', questionText: { ar: 'أي من أسس التقويم التالية تعني أن الأدوات المستخدمة فيه يجب أن تعطي نتائج متسقة نسبيًا حول تحصيل المتعلم في كل مرة تطبق فيها؟', en: 'Q5' }, options: [{ ar: 'أ) الصدق', en: 'A' }, { ar: 'ب) الثبات', en: 'B' }, { ar: 'ج) الموضوعية', en: 'C' }, { ar: 'د) الشمولية', en: 'D' }], correctAnswer: '1' },
    { id: 'eq6', type: 'multiple-choice', questionText: { ar: 'أي نوع من التقويم يطلق عليه أيضًا التقويم البنائي أو الشكلي أو المستمر؟', en: 'Q6' }, options: [{ ar: 'أ) التقويم المبدئي', en: 'A' }, { ar: 'ب) التقويم التكويني', en: 'B' }, { ar: 'ج) التقويم التشخيصي', en: 'C' }, { ar: 'د) التقويم الختامي', en: 'D' }], correctAnswer: '1' },
    { id: 'eq7', type: 'multiple-choice', questionText: { ar: 'أي معيار تقارن فيه الدرجة التي يحصل عليها المتعلم إما في ضوء مستواه القبلي أو في ضوء أداء محكي؟', en: 'Q7' }, options: [{ ar: 'أ) القياس معياري المرجع', en: 'A' }, { ar: 'ب) المعيار السيكومتري', en: 'B' }, { ar: 'ج) القياس محكي المرجع', en: 'C' }, { ar: 'د) المعيار النسبي', en: 'D' }], correctAnswer: '2' },
    { id: 'eq8', type: 'multiple-choice', questionText: { ar: 'أي من مصطلحات التقييم بالكمبيوتر تشير إلى التقييم الذي يكون فيه استخدام الكمبيوتر جوهريًا ويستخدَم لتقييم ووضع درجات للاستجابات المقدمة من الطلاب؟', en: 'Q8' }, options: [{ ar: 'أ) التقييم بمساعدة الكمبيوتر (CAA)', en: 'A' }, { ar: 'ب) التقييم بوساطة الكمبيوتر (CMA)', en: 'B' }, { ar: 'ج) التقييم المعتمد على الكمبيوتر (CBA)', en: 'C' }, { ar: 'د) التقييم على الإنترنت (Online Assessment)', en: 'D' }], correctAnswer: '2' },
    { id: 'eq9', type: 'multiple-choice', questionText: { ar: 'أي من أدوات التقويم الإلكتروني التالية تتضمن أدوات اختبارية تتصف بالموضوعية وتستخدم في تقويم الجانب المعرفي للنتاجات التعليمية؟', en: 'Q9' }, options: [{ ar: 'أ) الاستبانات', en: 'A' }, { ar: 'ب) قوائم التقدير', en: 'B' }, { ar: 'ج) سلالم التقدير', en: 'C' }, { ar: 'د) الاختبارات التحصيلية', en: 'D' }], correctAnswer: '3' },
    { id: 'eq10', type: 'multiple-choice', questionText: { ar: 'في طرق القياس والتقويم الإلكتروني، أي طريقة تهدف إلى قياس الوعي الذاتي والمهارات فوق المعرفية؟', en: 'Q10' }, options: [{ ar: 'أ) الأنشطة التطبيقية', en: 'A' }, { ar: 'ب) الأوراق البحثية', en: 'B' }, { ar: 'ج) القياس الذاتي', en: 'C' }, { ar: 'د) الاختبارات الفترية', en: 'D' }], correctAnswer: '2' },
    { id: 'eq11', type: 'multiple-choice', questionText: { ar: 'أي من الأساليب التالية تُعد من أبرز أساليب التقييم الإلكتروني شيوعًا؟', en: 'Q11' }, options: [{ ar: 'أ) برامج التعلم الخصوصي', en: 'A' }, { ar: 'ب) التكليفات على الشبكة (Online Assignments)', en: 'B' }, { ar: 'ج) أنظمة التعلم التكاملية', en: 'C' }, { ar: 'د) الحقيبة الوثائقية الإلكترونية', en: 'D' }], correctAnswer: '1' },
    { id: 'eq12', type: 'multiple-choice', questionText: { ar: 'من ميزات الاختبارات الإلكترونية سهولة إعداد الأسئلة والمهام والتكليفات وتوفير الوقت والجهد في ذلك. أي من التالي يدعم هذه الميزة؟', en: 'Q12' }, options: [{ ar: 'أ) توظيف تكنولوجيا الوسائط المتعددة', en: 'A' }, { ar: 'ب) إمكانية إجراء تعديلات في أسئلة الاختبارات بسهولة ويسر', en: 'B' }, { ar: 'ج) مرونة التطبيق', en: 'C' }, { ar: 'د) توافر عنصر الموضوعية في التصحيح', en: 'D' }], correctAnswer: '1' },
    { id: 'eq13', type: 'multiple-choice', questionText: { ar: 'من أبرز مشكلات الاختبارات الإلكترونية التي تتطلب وقتًا وجهدًا كبيرًا في غياب بنوك الأسئلة؟', en: 'Q13' }, options: [{ ar: 'أ) صعوبة تقدير الدرجات في حالة الإجابة ليست صحيحة تمامًا', en: 'A' }, { ar: 'ب) تكلفة البنية الأساسية للتقييم الإلكتروني', en: 'B' }, { ar: 'ج) إعداد الأسئلة', en: 'C' }, { ar: 'د) صعوبة تصحيح الاختبارات الطويلة آليًا', en: 'D' }], correctAnswer: '2' },
    { id: 'eq14', type: 'multiple-choice', questionText: { ar: 'أي من الإجراءات الاحترازية التالية تهدف إلى منع الغش من الآخرين في الاختبارات الإلكترونية؟', en: 'Q14' }, options: [{ ar: 'أ) تحميل ملف أسئلة الاختبار والإجابة الصحيحة على خادم آخر لحين الحاجة', en: 'A' }, { ar: 'ب) عمل اختبار وهمي (Fake Test) على الخادم لسبيل التمويه', en: 'B' }, { ar: 'ج) تقديم صور متكافئة من الاختبار الواحد للمتعلمين المتجاورين في قاعة الاختبار', en: 'C' }, { ar: 'د) منع المتعلم من استخدام المصادر الإلكترونية أو الورقية غير المسموح بها', en: 'D' }], correctAnswer: '2' },
    { id: 'eq15', type: 'multiple-choice', questionText: { ar: 'أي من أنواع الاختبارات الإلكترونية التالية يقوم فيها الكمبيوتر برسم الأسئلة بشكل عشوائي من مجموعة أسئلة ليحصل كل ممتحن على اختبار فريد بمحتويات إحصائية معادلة؟', en: 'Q15' }, options: [{ ar: 'أ) اختبار الشكل الثابت المعتمد على الكمبيوتر (CBT)', en: 'A' }, { ar: 'ب) الاختبار الطائر الخطي (LOFT)', en: 'B' }, { ar: 'ج) الاختبارات التكيفية', en: 'C' }, { ar: 'د) الاختبارات الخطية', en: 'D' }], correctAnswer: '1' },
    { id: 'eq16', type: 'multiple-choice', questionText: { ar: 'ما الفرق بين الاختبارات الخطية والتكيفية، أي من العبارات التالية صحيحة؟', en: 'Q16' }, options: [{ ar: 'أ) زمن تطبيق الاختبار موحد لجميع المتعلمين في الاختبار التكيفي', en: 'A' }, { ar: 'ب) المتعلم يجيب عن عدد معين من الأسئلة في الاختبار التكيفي مختلف عن زميله المطبق عليه الاختبار ذاته', en: 'B' }, { ar: 'ج) تقدر درجة المتعلم في الاختبار الخطي بمستوى صعوبة الأسئلة التي أجاب عنها', en: 'C' }, { ar: 'د) تقديم أسئلة الاختبار الخطي يتوقف متى حدد الكمبيوتر المستوى التحصيلي للمتعلم', en: 'D' }], correctAnswer: '1' },
    { id: 'eq17', type: 'multiple-choice', questionText: { ar: 'أي نوع من الاختبارات يستخدم للحصول على معلومات أساسية قبل إعداد أي برنامج تعليمي، مثل تحديد الاحتياجات والأهداف؟', en: 'Q17' }, options: [{ ar: 'أ) اختبارات التسكين', en: 'A' }, { ar: 'ب) الاختبارات القبلية', en: 'B' }, { ar: 'ج) الاختبارات التشخيصية', en: 'C' }, { ar: 'د) الاختبارات البنائية', en: 'D' }], correctAnswer: '1' },
    { id: 'eq18', type: 'multiple-choice', questionText: { ar: 'من استراتيجيات إعطاء اختبارات التسكين، إعطاء الاختبار عند المستوى الذي لا يستطيع التلميذ أن يحرز مزيدًا من التقدم. أي من التالي يُعد من عيوب هذه الإستراتيجية؟', en: 'Q18' }, options: [{ ar: 'أ) عدم إثارة التلاميذ ذوي الخبرات الوفيرة المتعلقة بالمقرر الدراسي', en: 'A' }, { ar: 'ب) تقليل الوقت الذي يستغرقه التلميذ في الإجابة عن الاختبار', en: 'B' }, { ar: 'ج) تحديد نقاط بداية ملائمة لكل تلميذ', en: 'C' }, { ar: 'د) إمكانية قياس مدى تقدم التلميذ بشكل دقیق', en: 'D' }], correctAnswer: '0' },
    { id: 'eq19', type: 'multiple-choice', questionText: { ar: 'أي نوع من الاختبارات يهدف إلى معرفة درجة التلاميذ في محتوى المادة الدراسية، ويصحح عن طريق عدد المفردات الصحيحة التي أجاب عنها التلميذ؟', en: 'Q19' }, options: [{ ar: 'أ) الاختبارات التشخيصية', en: 'A' }, { ar: 'ب) الاختبارات التحصيلية العادية', en: 'B' }, { ar: 'ج) الاختبارات التتبعية', en: 'C' }, { ar: 'د) اختبارات التسكين', en: 'D' }], correctAnswer: '1' },
    { id: 'eq20', type: 'multiple-choice', questionText: { ar: 'أي من أنواع الاختبارات الإلكترونية تتم فيها الاختبارات على محطات عمل قائمة بذاتها على جهاز الكمبيوتر مباشرة باستخدام البرامج؟', en: 'Q20' }, options: [{ ar: 'أ) الاختبارات المعتمدة على الشبكة المحلية', en: 'A' }, { ar: 'ب) الاختبارات المعتمدة على الإنترنت', en: 'B' }, { ar: 'ج) الاختبارات على محطة عمل قائمة بذاتها', en: 'C' }, { ar: 'د) الاختبارات التكيفية', en: 'D' }], correctAnswer: '2' },
    { id: 'eq21', type: 'multiple-choice', questionText: { ar: 'أي من أشكال نشر الاختبارات الإلكترونية يسمح بتسجيل إجابات المتعلمين إلكترونيًا ويمكن أن يكون مفيدًا في تحديد الدروس القادمة والحكم على كفاءة المتعلم؟', en: 'Q21' }, options: [{ ar: 'أ) اختبارات مفردة', en: 'A' }, { ar: 'ب) اختبارات ضمن مقرر', en: 'B' }, { ar: 'ج) اختبارات تكيفية', en: 'C' }, { ar: 'د) اختبارات خطية', en: 'D' }], correctAnswer: '1' },
    { id: 'eq22', type: 'multiple-choice', questionText: { ar: 'أي من برامج إنشاء الاختبارات الإلكترونية الجاهزة التالية تُعد من البرامج التي توفر خيارات عديدة لتصدير الاختبارات بأنواع مختلفة مثل exe وcd ؟', en: 'Q22' }, options: [{ ar: 'أ) Hot Potatoes', en: 'A' }, { ar: 'ب) Quiz Creator', en: 'B' }, { ar: 'ج) Google Forms', en: 'C' }, { ar: 'د) Kahoot', en: 'D' }], correctAnswer: '1' },
    { id: 'eq23', type: 'multiple-choice', questionText: { ar: 'أي من البرامج التالية يمكن استخدامها كبرنامج غير متخصص في إنشاء الاختبارات الإلكترونية؟', en: 'Q23' }, options: [{ ar: 'أ) Quiz Creator', en: 'A' }, { ar: 'ب) Moodle', en: 'B' }, { ar: 'ج) Hot Potatoes', en: 'C' }, { ar: 'د) TCExam', en: 'D' }], correctAnswer: '1' },
    { id: 'eq24', type: 'multiple-choice', questionText: { ar: 'أي من الاختبارات التحصيلية الموقوتة يكون أحد معاييرها تحديد فترة زمنية للإجابة عن الاختبار ككل، وتستخدم غالبًا عند قياس مهارات يتطلب فيها إتقان المهارة أداء العمل بدقة وفي أقل وقت ممكن؟', en: 'Q24' }, options: [{ ar: 'أ) اختبارات التمكن', en: 'A' }, { ar: 'ب) الاختبارات الخطية', en: 'B' }, { ar: 'ج) اختبار سرعة الكتابة (مثل)', en: 'C' }, { ar: 'د) الاختبارات التكيفية', en: 'D' }], correctAnswer: '2' },
    { id: 'eq25', type: 'multiple-choice', questionText: { ar: 'أي من العناصر التالية لا يدخل في تحديد زمن الاختبار؟', en: 'Q25' }, options: [{ ar: 'أ) عدد الأسئلة التي يتكون منها الاختبار', en: 'A' }, { ar: 'ب) نوع الوسائط المتعددة المستخدمة', en: 'B' }, { ar: 'ج) نوع الإجابة الصحيحة', en: 'C' }, { ar: 'د) خصائص المتعلمين', en: 'D' }], correctAnswer: '2' },

    // --- 54 True/False Questions ---
    { id: 'etf1', type: 'true-false', questionText: { ar: 'العد هو العملية التي نحدد بواسطتها كمية ما يوجد في الشيء من المقاييس المدرجة.', en: 'TF1' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf2', type: 'true-false', questionText: { ar: 'القياس تقريبي دائمًا، ووحداته متصلة ومستمرة فلا فجوات بينها.', en: 'TF2' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf3', type: 'true-false', questionText: { ar: 'التقييم يعني بيان قيمة الشيء بصورة نوعية (كيفية).', en: 'TF3' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf4', type: 'true-false', questionText: { ar: 'من خطوات التقويم تحديد الهدف من التقويم.', en: 'TF4' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf5', type: 'true-false', questionText: { ar: 'تقويم الأهداف غير الصالحة يساعد على عدم نشوء فجوة بين التوقع والإنجاز، أو بين ما يطمح إليه المنهج والنتائج الفعلية.', en: 'TF5' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf6', type: 'true-false', questionText: { ar: 'يشترط في التقويم الجيد أن يكون متحيزًا نحو فئة دون أخرى لضمان الفروق الفردية.', en: 'TF6' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf7', type: 'true-false', questionText: { ar: 'التقويم المبدئي يتم قبل البدء في تطبيق مقرر دراسي أو وحدة دراسية.', en: 'TF7' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf8', type: 'true-false', questionText: { ar: 'التقويم التشخيصي يكشف عن صعوبات التعلم التي يواجهها المتعلمون، ويهدف إلى اتخاذ القرار العلاجي لهذه الصعوبات.', en: 'TF8' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf9', type: 'true-false', questionText: { ar: 'غالبًا ما يتم تسليم دورات تقييم المخاطر العالية عبر الإنترنت في الوقت الحقيقي.', en: 'TF9' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf10', type: 'true-false', questionText: { ar: 'من مكونات التقويم الإلكتروني محرك التقييم وبنك العناصر.', en: 'TF10' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf11', type: 'true-false', questionText: { ar: 'الأنشطة التطبيقية في طرق القياس والتقويم الإلكتروني تزيد أو تنقص بناء المعرفة الجماعية ونوعيتها.', en: 'TF11' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf12', type: 'true-false', questionText: { ar: 'الاختبارات التحصيلية هي المقياس الوحيد وأكثر أدوات التقويم شيوعًا في المدارس.', en: 'TF12' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf13', type: 'true-false', questionText: { ar: 'الثبات في الاختبار التحصيلي يعني أن الاختبار يقيس ما ينبغي قياسه فعلاً.', en: 'TF13' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf14', type: 'true-false', questionText: { ar: 'الاختبارات المعتمدة على الكمبيوتر هي ببساطة اختبارات تقدم بواسطة الكمبيوتر.', en: 'TF14' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf15', type: 'true-false', questionText: { ar: 'من مميزات الاختبارات الإلكترونية سرعة تلقي المتعلم للتغذية الراجعة، والتي يمكن أن تشمل الدرجة النهائية ونقاط القوة والضعف.', en: 'TF15' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf16', type: 'true-false', questionText: { ar: 'إعداد الاختبارات الموضوعية الجيدة يتطلب مهارة وتدريبًا ووقتًا طويلاً.', en: 'TF16' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf17', type: 'true-false', questionText: { ar: 'من محددات الاختبارات الإلكترونية سهولة قياس المهارات العليا فيها.', en: 'TF17' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf18', type: 'true-false', questionText: { ar: 'توجد صعوبة قصوى في تصحيح الاختبارات الطويلة (اختبارات المقال) بشكل آلي.', en: 'TF18' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf19', type: 'true-false', questionText: { ar: 'من الإجراءات الاحترازية لمواجهة الغش من الآخرين في الاختبارات الإلكترونية، تعديل ترتيب خيارات الإجابة لكل سؤال من أسئلة الاختبار الواحد.', en: 'TF19' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf20', type: 'true-false', questionText: { ar: 'يمكن التغلب على مشكلة انقطاع التيار الكهربائي أثناء الاختبار باستخدام جهاز مولد للتيار الكهربائي في المؤسسات الكبيرة.', en: 'TF20' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf21', type: 'true-false', questionText: { ar: 'في الاختبارات الخطية، يشاهد جميع الممتحنين نفس المجموعة من الأسئلة.', en: 'TF21' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf22', type: 'true-false', questionText: { ar: 'من مزايا الاختبارات التكيفية أنها تستخدم عادة في التقييم التكويني للمتعلمين قبل التحاقهم ببرامج دراسية معينة.', en: 'TF22' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf23', type: 'true-false', questionText: { ar: 'الاختبارات البنائية يطلق عليها أيضًا الاختبارات التكوينية.', en: 'TF23' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf24', type: 'true-false', questionText: { ar: 'يمكن إنشاء الاختبارات الإلكترونية من خلال لغات البرمجة أو البرامج الجاهزة.', en: 'TF24' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf25', type: 'true-false', questionText: { ar: 'اختبارات التمكن هي اختبارات تحصيلية تحدد نسبة التقديرات بناءً على معاييرها الخاصة.', en: 'TF25' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf26', type: 'true-false', questionText: { ar: 'تعتمد جودة الاختبار الإلكتروني على وضوح تعليمات الاختبار وسهولة التعامل مع واجهته.', en: 'TF26' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf27', type: 'true-false', questionText: { ar: 'يمكن استخدام الاختبارات الإلكترونية فقط لقياس الجانب المعرفي ولا يمكن استخدامها في أي نوع آخر من التقويم.', en: 'TF27' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf28', type: 'true-false', questionText: { ar: 'يساعد بنك الأسئلة الإلكتروني في إنشاء نماذج متعددة للاختبار الواحد.', en: 'TF28' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf29', type: 'true-false', questionText: { ar: 'لا تحتاج الاختبارات الإلكترونية إلى أي إجراءات لحماية سرية الأسئلة قبل موعد الاختبار.', en: 'TF29' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf30', type: 'true-false', questionText: { ar: 'تؤثر سرعة الاتصال بالإنترنت في تجربة المتعلم أثناء أداء الاختبار الإلكتروني.', en: 'TF30' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf31', type: 'true-false', questionText: { ar: 'يمكن أن تسهم التغذية الراجعة الفورية في تحسين تعلم المتعلم بعد أداء الاختبار.', en: 'TF31' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf32', type: 'true-false', questionText: { ar: 'تصميم الاختبار الإلكتروني الجيد لا يتطلب مراعاة الفروق الفردية بين المتعلمين.', en: 'TF32' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf33', type: 'true-false', questionText: { ar: 'يمكن استخدام الوسائط المتعددة في الاختبارات الإلكترونية لدعم عرض بعض المهام التعليمية.', en: 'TF33' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf34', type: 'true-false', questionText: { ar: 'الاختبارات الإلكترونية تمنع تمامًا جميع أشكال الغش أثناء عملية التقويم.', en: 'TF34' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf35', type: 'true-false', questionText: { ar: 'تحليل نتائج الاختبارات الإلكترونية يساعد المعلم في اتخاذ قرارات تعليمية مناسبة.', en: 'TF35' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf36', type: 'true-false', questionText: { ar: 'يجب أن تكون جميع أسئلة الاختبار الإلكتروني من نوع الاختيار من متعدد فقط.', en: 'TF36' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf37', type: 'true-false', questionText: { ar: 'يمكن تحديث محتوى الاختبار الإلكتروني وإجراء تعديلات عليه بسهولة مقارنة بالاختبارات الورقية.', en: 'TF37' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf38', type: 'true-false', questionText: { ar: 'تعتمد صلاحية الاختبار الإلكتروني على مدى ارتباط أسئلته بالأهداف التعليمية.', en: 'TF38' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf39', type: 'true-false', questionText: { ar: 'استخدام كلمات مرور خاصة بالمتعلمين يعد أحد أساليب حماية الاختبارات الإلكترونية.', en: 'TF39' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf40', type: 'true-false', questionText: { ar: 'لا يمكن استخدام الاختبارات الإلكترونية في التعليم عن بعد.', en: 'TF40' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf41', type: 'true-false', questionText: { ar: 'يحتاج بناء اختبار إلكتروني فعال إلى التخطيط المسبق وتنظيم محتوى المادة العلمية.', en: 'TF41' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf42', type: 'true-false', questionText: { ar: 'يمكن أن تساعد التقنيات الحديثة في تقليل الوقت اللازم لتصحيح بعض أنواع الاختبارات.', en: 'TF42' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf43', type: 'true-false', questionText: { ar: 'يختلف تقويم الأداء العملي عن تقويم المعرفة النظرية في طبيعة المهارات التي يقيسها.', en: 'TF43' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf44', type: 'true-false', questionText: { ar: 'الاختبار الإلكتروني الناجح يجب أن يركز على عدد الأسئلة فقط دون الاهتمام بجودتها.', en: 'TF44' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf45', type: 'true-false', questionText: { ar: 'يمكن للمعلم الاستفادة من تقارير الاختبارات الإلكترونية لمعرفة نقاط القوة والضعف لدى المتعلمين.', en: 'TF45' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf46', type: 'true-false', questionText: { ar: 'تعتمد الاختبارات التكيفية على تغيير مستوى صعوبة الأسئلة وفقًا لاستجابات المتعلم.', en: 'TF46' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf47', type: 'true-false', questionText: { ar: 'استخدام الصور والرسوم التوضيحية في الاختبارات الإلكترونية قد يساعد في قياس بعض المهارات بشكل أفضل.', en: 'TF47' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf48', type: 'true-false', questionText: { ar: 'من الضروري تجربة الاختبار الإلكتروني قبل تطبيقه بشكل رسمي لاكتشاف المشكلات التقنية.', en: 'TF48' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf49', type: 'true-false', questionText: { ar: 'لا يحتاج الاختبار الإلكتروني إلى معايير واضحة لتفسير درجات المتعلمين.', en: 'TF49' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf50', type: 'true-false', questionText: { ar: 'يمكن أن توفر الاختبارات الإلكترونية بيئة أكثر مرونة من حيث مكان وزمان التطبيق.', en: 'TF50' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf51', type: 'true-false', questionText: { ar: 'تصميم الأسئلة الإلكترونية بطريقة غير واضحة قد تؤثر سلبًا على نتائج الاختبار.', en: 'TF51' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf52', type: 'true-false', questionText: { ar: 'التقويم الإلكتروني يقتصر على إعطاء الدرجات فقط ولا يقدم أي معلومات إضافية عن أداء المتعلم.', en: 'TF52' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'etf53', type: 'true-false', questionText: { ar: 'يمكن استخدام قواعد البيانات لحفظ نتائج الاختبارات الإلكترونية وتحليلها.', en: 'TF53' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'etf54', type: 'true-false', questionText: { ar: 'يعتمد نجاح الاختبار الإلكتروني على توفر الأجهزة والبرمجيات المناسبة للتطبيق.', en: 'TF54' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' }
  ]
};

export const ELECTRONIC_EXAMS_ESSAY: Exam = {
  id: 'e_exams_essay_202',
  subjectId: 'electronic_exams',
  title: { ar: 'مقرر الاختبارات الإلكترونية - أسئلة المقالي', en: 'Electronic Exams Course - Essay Questions' },
  active: true,
  thumbnail: '📝',
  questions: [
    { 
      id: 'ee1', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'ما الفرق بين التقييم والتقويم؟', en: 'E1' }, 
      correctAnswer: 'التقييم: هو بيان قيمة الشئ بصوره نوعية (كيفية) فالقياس يسبق التقييم ويعد حكمآ (كميآ).\nالتقويم: عملية جمع وتصنيف وتحليل وتفسير بيانات او معلومات (كمية / كيفية) عن ظاهرة او موقف او سلوك بقصد أستخدامها في إصدار حكم او قرار.' 
    },
    { 
      id: 'ee2', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'مكونات التقويم الالكتروني؟', en: 'E2' }, 
      correctAnswer: '- محرك التقييم: (Software - Hardware)\n- بنك العناصر: (الاسئلة او لإنشاء الاختبارات)' 
    },
    { 
      id: 'ee3', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'الاساليب الاكثر شيوعآ في التقييم الالكتروني؟', en: 'E3' }, 
      correctAnswer: '- الاختبارات الالكترونية الرسمية.\n- الاختبارات القصيرة على الشبكة (الاختبارات الفصيره الفورية).\n- التكليفات على الشبكه (التكليفات الفورية).\n- الحقيبة الوثائقية (البورتفليو) الالكترونية.\n- برامج التعلم الخصوصي, التدريب, الممارسة, انظمة التعلم التكاملية.\n- استبانات التقييم الذاتي الالكتروني.' 
    },
    { 
      id: 'ee4', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'مميزات الاختبارات الالكترونية؟', en: 'E4' }, 
      correctAnswer: '- سهوله إعداد الاسئله والمهام والتكليفات، وتوفر الوقت والجهد في ذلك.\n- إمكانية توظيف تكنلوجيا الوسائط المتعددة في إعداد الاختبارات وإنجازها.\n- مرونة التطبيق.\n- سرعة تقديم التغذية الراجعة back feed وتنوعها.\n- سرعة وسهولة التصحيح ورصد النتائج واستدعاؤها ومتابعة التقدم الدراسي للمتعلم.\n- توافر عنصر الموضوعية في التصحيح وعنصر الخصوصية.\n- اقل تكلفه علي المدي الطويل.' 
    },
    { 
      id: 'ee5', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'عيوب الاختبارات الالكترونية؟', en: 'E5' }, 
      correctAnswer: '- الحفاظ علي أمن اسئلة الاختبار.\n- الغش من الآخرين.\n- الغش من مصادر غير مسموح بها.\n- قيام شخص بالاجابة عن الاختبار منتحآل شخصية آخر.\n- تعطل الاجهزة والبرمجيات في أثناء تادية الاختبار.\n- انقطاع التيار الكهربي.' 
    },
    { 
      id: 'ee6', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'تعريف الاختبارات التكيفية؟', en: 'E6' }, 
      correctAnswer: 'هى التي يقدم فيها السؤال للمتعلم بحسب اجابته على السؤال السابق فان اصاب في الاجابه عنه قدم له سؤاال اكثر صعوبه منه وان اخفق قدم له سؤاال اقل صعوبه.' 
    },
    { 
      id: 'ee7', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'مزايا الاختبارات التكيفيه؟', en: 'E7' }, 
      correctAnswer: '- تحتاج الى زمن اقل في تطبيقها عن الاختبارات الخطيه.\n- اقل تكلفه في تطبيقها من الاختبارات الخطيه.\n- تحدد المستوى التحصيلي بدرجه اكثر دقه من الاختبارات الخطيه.' 
    },
    { 
      id: 'ee8', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'امثله لبرامج متخصصه في انشاء الاختبارات الالكترونيه؟', en: 'E8' }, 
      correctAnswer: '- Quizcreator\n- Quizmaker\n- Quick test\n- Tc exam\n- Quizfaber\n- Hot potatoes' 
    },
    { 
      id: 'ee9', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'عناصر بناء الاختبارات الالكترونيه؟', en: 'E9' }, 
      correctAnswer: '- اسئله الاختبار.\n- الوصالت المتعدده.\n- زمن الاختبار.\n- تامين الاختبار.\n- طرق التصحيح واالعالن عن النتائج.\n- التغذيه الراجعه.\n- اساليب التفاعل مع الاختبار.\n- التحكم في برنامج الاختبار.' 
    },
    { 
      id: 'ee10', 
      type: 'fill-in-the-blank', 
      questionText: { ar: 'العوامل المؤثره في بنك الاختبارات الالكترونيه؟', en: 'E10' }, 
      correctAnswer: '- الاهداف التربويه للمرحله التعليميه.\n- خصائص المتعلمين.\n- مهارات المتعلمين.\n- الغرض من الاختبار.\n- اشكال التقويم الالكتروني.\n- التوافق في قدرات التشغيل.\n- انماط الاستجابه.' 
    }
  ]
};

export const TRANSLATIONS = {
  ar: {
    dashboard: 'الرئيسية',
    startExam: 'ابدأ الامتحان',
    score: 'الدرجة',
    langToggle: 'English',
    admin_login: 'دخول المسؤول',
    username: 'اسم المستخدم',
    password: 'كلمة السر',
    login_btn: 'دخول',
    cancel: 'إلغاء',
    invalid_creds: 'بيانات خاطئة',
    checking: 'جاري التحقق...',
    correctAnswer: 'الإجابة الصحيحة',
    saved_questions: 'المواد والملفات'
  },
  en: {
    dashboard: 'Dashboard',
    startExam: 'Start Exam',
    score: 'Score',
    langToggle: 'العربية',
    admin_login: 'Admin Login',
    username: 'Username',
    password: 'Password',
    login_btn: 'Login',
    cancel: 'Cancel',
    invalid_creds: 'Invalid',
    checking: 'Checking...',
    correctAnswer: 'Correct Answer',
    saved_questions: 'My Files'
  }
};
