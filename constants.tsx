
import { Subject, Exam } from './types';

export const SUBJECTS: Subject[] = [];

export const ENTREPRENEURSHIP_EXAM: Exam = {
  id: 'ent_101',
  subjectId: 'business',
  title: { ar: 'امتحان ريادة الأعمال الشامل (75 سؤال)', en: 'Comprehensive Entrepreneurship Exam' },
  active: true,
  thumbnail: '🚀',
  questions: [
    // --- (1) 30 Multiple Choice Questions ---
    { id: 'q1', type: 'multiple-choice', questionText: { ar: '1. المقصود بريادة الأعمال:', en: 'Meaning of entrepreneurship:' }, options: [{ ar: 'أ) العمل في وظيفة حكومية', en: 'A) Gov job' }, { ar: 'ب) تأسيس مشروع مبتكر يحقق قيمة مضافة', en: 'B) Innovative project' }, { ar: 'ج) التجارة في المنتجات فقط', en: 'C) Trading products' }, { ar: 'د) الاستثمار في سوق الأسهم', en: 'D) Stocks' }], correctAnswer: '1' },
    { id: 'q2', type: 'multiple-choice', questionText: { ar: '2. أي من العبارات التالية تمثل العلاقة الصحيحة بين القيادة والريادة؟', en: 'Relationship between leadership and entrepreneurship?' }, options: [{ ar: 'أ) القيادة أوسع من الريادة', en: 'A) Leadership is broader' }, { ar: 'ب) الريادة أوسع من القيادة', en: 'B) Entrepreneurship is broader' }, { ar: 'ج) القيادة والريادة مترادفتان', en: 'C) Synonyms' }, { ar: 'د) لا علاقة بينهما', en: 'D) No relation' }], correctAnswer: '0' },
    { id: 'q3', type: 'multiple-choice', questionText: { ar: '3. يُعد تحويل الفكرة إلى ابتكار أو اختراع قابل للتطبيق من صفات:', en: 'Turning idea into innovation is a trait of:' }, options: [{ ar: 'أ) القائد الإداري', en: 'A) Admin leader' }, { ar: 'ب) المدير التنفيذي', en: 'B) CEO' }, { ar: 'ج) رائد الأعمال', en: 'C) Entrepreneur' }, { ar: 'د) المستثمر السلبي', en: 'D) Passive investor' }], correctAnswer: '2' },
    { id: 'q4', type: 'multiple-choice', questionText: { ar: '4. من المهارات الأساسية لرائد الأعمال:', en: 'Core entrepreneur skills:' }, options: [{ ar: 'أ) البطء في التعلم', en: 'A) Slow learning' }, { ar: 'ب) القدرة على التعلم والتكيف بسرعة', en: 'B) Quick adaptation' }, { ar: 'ج) إهمال فريق العمل', en: 'C) Neglecting team' }, { ar: 'د) الاعتزال عن المجتمع', en: 'D) Isolation' }], correctAnswer: '1' },
    { id: 'q5', type: 'multiple-choice', questionText: { ar: '5. من منظور المنهج السلوكي، يفترض أن رائد الأعمال يختلف عن غيره في:', en: 'Behavioral approach assumes difference in:' }, options: [{ ar: 'أ) مستوى التعليم الأكاديمي', en: 'A) Education' }, { ar: 'ب) عدد المشاريع التي يمتلكها', en: 'B) Projects' }, { ar: 'ج) سماته النفسية ودوافعه الداخلية', en: 'C) Psychological traits' }, { ar: 'د) مكان عمله داخل المؤسسة', en: 'D) Workplace' }], correctAnswer: '2' },
    { id: 'q6', type: 'multiple-choice', questionText: { ar: '6. يعد من أبعاد ريادة الأعمال:', en: 'Dimensions of entrepreneurship:' }, options: [{ ar: 'أ) المبادرة', en: 'A) Proactivity' }, { ar: 'ب) تحمل المخاطر', en: 'B) Risk taking' }, { ar: 'ج) الإبداع', en: 'C) Creativity' }, { ar: 'د) جميع ما سبق', en: 'D) All of the above' }], correctAnswer: '3' },
    { id: 'q7', type: 'multiple-choice', questionText: { ar: '7. من أنواع ريادة الأعمال:', en: 'Types of entrepreneurship:' }, options: [{ ar: 'أ) ريادة فردية واجتماعية ومؤسسية', en: 'A) Indiv, Social, Corp' }, { ar: 'ب) ريادة حكومية فقط', en: 'B) Gov only' }, { ar: 'ج) ريادة علمية فقط', en: 'C) Sci only' }, { ar: 'د) لا توجد أنواع محددة', en: 'D) None' }], correctAnswer: '0' },
    { id: 'q8', type: 'multiple-choice', questionText: { ar: '8. من أبرز مظاهر أهمية ريادة الأعمال في التنمية المستدامة:', en: 'Importance in sustainable development:' }, options: [{ ar: 'أ) التركيز على الأرباح قصيرة المدى', en: 'A) Short profit' }, { ar: 'ب) إهمال الجوانب البيئية والاجتماعية', en: 'B) Neglecting Env' }, { ar: 'ج) إقامة مشروعات تراعي الأبعاد الاقتصادية والاجتماعية والبيئية', en: 'C) Integrated projects' }, { ar: 'د) زيادة الاعتماد على الموارد الأجنبية', en: 'D) Foreign resources' }], correctAnswer: '2' },
    { id: 'q9', type: 'multiple-choice', questionText: { ar: '9. تساهم الجامعات في تطوير ريادة الأعمال بـ:', en: 'Universities contribution:' }, options: [{ ar: 'أ) تقديم برامج ريادية وتدريب عملي', en: 'A) Programs & Training' }, { ar: 'ب) الاكتفاء بالتركيز على الجوانب النظرية', en: 'B) Theory focus' }, { ar: 'ج) تجاهل الطلاب المبدعين', en: 'C) Ignore creators' }, { ar: 'د) تقليل فرص المبادرات', en: 'D) Less initiatives' }], correctAnswer: '0' },
    { id: 'q10', type: 'multiple-choice', questionText: { ar: '10. تقييم الأداء في المشروع الريادي يُستخدم من أجل:', en: 'Performance evaluation uses:' }, options: [{ ar: 'أ) إيقاف المشروع فوراً عند وجود مشاكل', en: 'A) Stop project' }, { ar: 'ب) مراقبة الموظفين فقط', en: 'B) Monitor staff' }, { ar: 'ج) تحديد نقاط القوة والضعف وتحسين الاستراتيجيات', en: 'C) SWOT & Improvement' }, { ar: 'د) تقليل عدد العاملين', en: 'D) Reduce staff' }], correctAnswer: '2' },
    { id: 'q11', type: 'multiple-choice', questionText: { ar: '11. من أبرز المهارات التي يجب أن يمتلكها الموظف في مجال وسائل التواصل الاجتماعي:', en: 'Social media employee skills:' }, options: [{ ar: 'أ) معرفة اللغات الأجنبية فقط', en: 'A) Languages only' }, { ar: 'ب) المحاسبة والإدارة المالية', en: 'B) Accounting' }, { ar: 'ج) كتابة بريد إلكتروني احترافي واستخدام الفيديو في التسويق', en: 'C) Email & Video marketing' }, { ar: 'د) تصميم المنتجات فقط', en: 'D) Design' }], correctAnswer: '2' },
    { id: 'q12', type: 'multiple-choice', questionText: { ar: '12. يُعد عنصر الرؤية في ريادة الأعمال مرتبطاً أساساً بـ:', en: 'Vision element related to:' }, options: [{ ar: 'أ) تحديد رأس المال اللازم للمشروع', en: 'A) Capital' }, { ar: 'ب) القدرة على التنبؤ باتجاهات السوق المستقبلية', en: 'B) Future trends' }, { ar: 'ج) مراقبة أداء العاملين فقط', en: 'C) Monitoring' }, { ar: 'د) الحفاظ على الوضع القائم دون تغيير', en: 'D) Status quo' }], correctAnswer: '1' },
    { id: 'q13', type: 'multiple-choice', questionText: { ar: '13. يُقصد بعنصر التنظيم في المشروع الريادي:', en: 'Organization element means:' }, options: [{ ar: 'أ) تحديد الأدوار والمسؤوليات بوضوح', en: 'A) Define roles' }, { ar: 'ب) إعداد الدعاية للمشروع', en: 'B) Promotion' }, { ar: 'ج) توزيع الأرباح', en: 'C) Profit distribution' }, { ar: 'د) مراقبة الإنتاج فقط', en: 'D) Monitor production' }], correctAnswer: '0' },
    { id: 'q14', type: 'multiple-choice', questionText: { ar: '14. عندما يسعى رائد الأعمال لإنشاء مشروع يحقق أثراً اجتماعياً دون التركيز على الربح فهو يعمل في مجال:', en: 'Social impact project without profit focus:' }, options: [{ ar: 'أ) الريادة التجارية', en: 'A) Commercial' }, { ar: 'ب) الريادة الاجتماعية', en: 'B) Social' }, { ar: 'ج) الريادة التقنية', en: 'C) Tech' }, { ar: 'د) الريادة الزراعية', en: 'D) Agr' }], correctAnswer: '1' },
    { id: 'q15', type: 'multiple-choice', questionText: { ar: '15. ما الميزة الأساسية لاستخدام الخدمات السحابية في الشركات الناشئة؟', en: 'Cloud services advantage:' }, options: [{ ar: 'أ) ارتفاع التكلفة والمخاطر', en: 'A) High cost' }, { ar: 'ب) انخفاض التكلفة وإمكانية الابتكار', en: 'B) Low cost & Innovation' }, { ar: 'ج) الحاجة إلى عدد كبير من الموظفين', en: 'C) More staff' }, { ar: 'د) الاعتماد على التسويق التقليدي', en: 'D) Traditional marketing' }], correctAnswer: '1' },
    { id: 'q16', type: 'multiple-choice', questionText: { ar: '16. العنصر الذي يساهم في تحقيق التوازن بين الموارد والفرص هو:', en: 'Balance between resources and opportunities:' }, options: [{ ar: 'أ) التنظيم', en: 'A) Organization' }, { ar: 'ب) التمويل', en: 'B) Funding' }, { ar: 'ج) الإعلان', en: 'C) Ads' }, { ar: 'د) الإنتاج', en: 'D) Production' }], correctAnswer: '0' },
    { id: 'q17', type: 'multiple-choice', questionText: { ar: '17. تهدف العلاقات العامة إلى:', en: 'PR goals:' }, options: [{ ar: 'أ) خفض تكاليف الإنتاج', en: 'A) Lower costs' }, { ar: 'ب) تحسين صورة الشركة والتواصل مع الجمهور', en: 'B) Image & Comm' }, { ar: 'ج) تطوير البرمجيات السحابية', en: 'C) Software' }, { ar: 'د) تنظيم الموارد البشرية', en: 'D) HR' }], correctAnswer: '1' },
    { id: 'q18', type: 'multiple-choice', questionText: { ar: '18. أي من العبارات التالية يعبر عن مفهوم تحقيق الاستقلال المالي في ريادة الأعمال؟', en: 'Financial independence concept:' }, options: [{ ar: 'أ) الاعتماد الكامل على الوظائف الحكومية', en: 'A) Gov jobs' }, { ar: 'ب) خفض الأرباح لتحقيق الاستقرار', en: 'B) Lower profit' }, { ar: 'ج) التخلي عن المخاطرة المالية', en: 'C) No risk' }, { ar: 'د) التحرر من القيود الوظيفية وتحقيق الحرية الاقتصادية', en: 'D) Freedom from jobs' }], correctAnswer: '3' },
    { id: 'q19', type: 'multiple-choice', questionText: { ar: '19. من الخصائص التي تميز رائد الأعمال عن المدير التقليدي:', en: 'Entrepreneur vs Manager:' }, options: [{ ar: 'أ) الالتزام باللوائح دون ابتكار', en: 'A) Regulations only' }, { ar: 'ب) تقليد المنافسين لتجنب المخاطر', en: 'B) Imitation' }, { ar: 'ج) امتلاك رؤية مستقبلية وابتكار حلول غير مألوفة', en: 'C) Future vision & Innovation' }, { ar: 'د) الاكتفاء بالأساليب القديمة', en: 'D) Old methods' }], correctAnswer: '2' },
    { id: 'q20', type: 'multiple-choice', questionText: { ar: '20. من مظاهر التطور والنمو في ريادة الأعمال الحديثة:', en: 'Modern growth manifestations:' }, options: [{ ar: 'أ) الاعتماد الكامل على الأسواق المحلية', en: 'A) Local markets' }, { ar: 'ب) التحول الرقمي وانتشار التجارة الإلكترونية', en: 'B) Digital & E-commerce' }, { ar: 'ج) التراجع في دور المرأة الريادية', en: 'C) Less female roles' }, { ar: 'د) اقتصار المشاريع على القطاع الصناعي', en: 'D) Industrial only' }], correctAnswer: '1' },
    { id: 'q21', type: 'multiple-choice', questionText: { ar: '21. من أساليب تحفيز ثقافة ريادة الأعمال الأكثر تأثيراً على المدى الطويل:', en: 'Long-term motivation methods:' }, options: [{ ar: 'أ) الحملات الإعلانية القصيرة', en: 'A) Short ads' }, { ar: 'ب) التعليم والتدريب على التفكير الابتكاري', en: 'B) Education & Innovation' }, { ar: 'ج) تقديم القروض فقط دون متابعة', en: 'C) Loans only' }, { ar: 'د) تشديد القوانين الاقتصادية', en: 'D) Tight laws' }], correctAnswer: '1' },
    { id: 'q22', type: 'multiple-choice', questionText: { ar: '22. من التحديات التي تواجه ريادة الأعمال في البيئة المحلية:', en: 'Local challenges:' }, options: [{ ar: 'أ) زيادة المبادرات الريادية', en: 'A) More initiatives' }, { ar: 'ب) ضعف الخبرة الإدارية ونقص التمويل', en: 'B) Poor exp & funding' }, { ar: 'ج) انتشار الوعي الريادي بين الشباب', en: 'C) More awareness' }, { ar: 'د) دعم الحاضنات والمسرعات', en: 'D) Incubator support' }], correctAnswer: '1' },
    { id: 'q23', type: 'multiple-choice', questionText: { ar: '23. المهارة التي تمكن رائد الأعمال من تحقيق اتفاقات ناجحة مع الأطراف المختلفة هي:', en: 'Successful negotiation skill:' }, options: [{ ar: 'أ) مهارة الإقناع والتفاوض', en: 'A) Persuasion & Neg' }, { ar: 'ب) مهارة التحليل المالي', en: 'B) Fin Analysis' }, { ar: 'ج) مهارة البرمجة', en: 'C) Coding' }, { ar: 'د) مهارة المحاسبة الدقيقة', en: 'D) Accounting' }], correctAnswer: '0' },
    { id: 'q24', type: 'multiple-choice', questionText: { ar: '24. الهدف من دراسة الجدوى:', en: 'Feasibility study goal:' }, options: [{ ar: 'أ) تقييم الجدوى المالية والفنية للمشروع', en: 'A) Fin & Tech eval' }, { ar: 'ب) تقليل رأس المال المطلوب', en: 'B) Less capital' }, { ar: 'ج) تعزيز الدعاية والتسويق', en: 'C) Promo' }, { ar: 'د) عرض المشروع على الجمهور', en: 'D) Public show' }], correctAnswer: '0' },
    { id: 'q25', type: 'multiple-choice', questionText: { ar: '25. تشمل خطة الإدارة:', en: 'Management plan includes:' }, options: [{ ar: 'أ) تحديد المهام والأدوار والمسؤوليات', en: 'A) Tasks & Roles' }, { ar: 'ب) تنظيم الموارد والوقت', en: 'B) Resources & Time' }, { ar: 'ج) وضع نظام رقابة وتقييم للأداء', en: 'C) Control system' }, { ar: 'د) جميع ما سبق', en: 'D) All of the above' }], correctAnswer: '3' },
    { id: 'q26', type: 'multiple-choice', questionText: { ar: '26. الهدف من الإطلاق التجريبي للمشروع هو:', en: 'Pilot launch goal:' }, options: [{ ar: 'أ) ضمان النجاح المالي الفوري', en: 'A) Instant success' }, { ar: 'ب) جذب المستثمرين الكبار', en: 'B) Big investors' }, { ar: 'ج) اختبار المنتج وتحليل ردود فعل العملاء قبل التوسع', en: 'C) Test & Feedback' }, { ar: 'د) تسجيل العلامة التجارية', en: 'D) Trademark' }], correctAnswer: '2' },
    { id: 'q27', type: 'multiple-choice', questionText: { ar: '27. الخطة التنفيذية للمشروع تُستخدم أساساً في:', en: 'Executive plan uses:' }, options: [{ ar: 'أ) وضع أفكار أولية للمشروع', en: 'A) Initial ideas' }, { ar: 'ب) إعداد نموذج العمل التجاري', en: 'B) Business model' }, { ar: 'ج) تحديد مراحل التنفيذ والجدول الزمني والأهداف التفصيلية', en: 'C) Stages & Schedule' }, { ar: 'د) تحليل المنافسين فقط', en: 'D) Competitors' }], correctAnswer: '2' },
    { id: 'q28', type: 'multiple-choice', questionText: { ar: '28. التسويق في المشروع الريادي يهدف إلى:', en: 'Entrepreneurial marketing goal:' }, options: [{ ar: 'أ) دراسة احتياجات العملاء وإشباعها', en: 'A) Customer needs' }, { ar: 'ب) التركيز على الإنتاج فقط', en: 'B) Production only' }, { ar: 'ج) البيع بأي وسيلة', en: 'C) Selling anyway' }, { ar: 'د) تجاهل المنافسة', en: 'D) Ignore competition' }], correctAnswer: '0' },
    { id: 'q29', type: 'multiple-choice', questionText: { ar: '29. من مهام الإدارة التشغيلية:', en: 'Operational management tasks:' }, options: [{ ar: 'أ) تنفيذ الخطط ومتابعة الأداء', en: 'A) Execution & Monitor' }, { ar: 'ب) رسم السياسات العامة فقط', en: 'B) Policy making' }, { ar: 'ج) الاهتمام بالإعلانات', en: 'C) Advertising' }, { ar: 'د) وضع الخطط البعيدة فقط', en: 'D) Long-term plans' }], correctAnswer: '0' },
    { id: 'q30', type: 'multiple-choice', questionText: { ar: '30. قدم مؤسسة مصر الخير برنامج GESR لخدماته للفئات المعروفة بـ:', en: 'GESR program targets:' }, options: [{ ar: 'أ) الطبقة المتوسطة', en: 'A) Middle class' }, { ar: 'ب) قاعدة الهرم الاقتصادي والفئات الأكثر احتياجاً', en: 'B) BOP & Needy' }, { ar: 'ج) المستثمرين الأجانب', en: 'C) Foreign investors' }, { ar: 'د) المؤسسات الحكومية', en: 'D) Gov entities' }], correctAnswer: '1' },

    // --- (2) 30 True/False Questions ---
    { id: 'q31', type: 'true-false', questionText: { ar: '31. المنظور المهني لريادة الأعمال ينظر إلى الريادة كعملية اجتماعية تهدف لخدمة المجتمع فقط.', en: 'Professional view sees entrepreneurship as social only.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q32', type: 'true-false', questionText: { ar: '32. رائد الأعمال الناجح يعتمد على فريق عمل متكامل بدلاً من الاكتفاء بالجهود الفردية.', en: 'Successful entrepreneur depends on a team.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q33', type: 'true-false', questionText: { ar: '33. الابتكار عنصر ثانوي في نجاح أي مشروع ريادي.', en: 'Innovation is secondary for success.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q34', type: 'true-false', questionText: { ar: '34. تعتبر المرونة في اتخاذ القرار من الصفات السلبية لرائد الأعمال.', en: 'Decision flexibility is negative for entrepreneurs.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q35', type: 'true-false', questionText: { ar: '35. التعليم والتدريب لا يلعبان دوراً كبيراً في تنمية القدرات الريادية للأفراد ونشر الثقافة الريادية.', en: 'Education plays no role in entrepreneurship.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q36', type: 'true-false', questionText: { ar: '36. التفكير الريادي يعتمد على البحث عن الفرص الجديدة واستغلالها ضمن بيئة العمل.', en: 'Entrepreneurial thinking seeks opportunities.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q37', type: 'true-false', questionText: { ar: '37. الإصرار والمثابرة يعتبران من السمات التي تميز رائد الأعمال الناجح والمبدع.', en: 'Persistence distinguishes successful entrepreneurs.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q38', type: 'true-false', questionText: { ar: '38. لا يمكن الجمع بين الريادة والمسؤولية الاجتماعية في المشروع الواحد.', en: 'Entrepreneurship and social responsibility cannot coexist.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q39', type: 'true-false', questionText: { ar: '39. يتميز رائد الأعمال الناجح بقدرته على التكيف مع التغيرات في السوق.', en: 'Successful entrepreneur adapts to market changes.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q40', type: 'true-false', questionText: { ar: '40. من صفات الريادي الناجح تجنب الفشل بأي ثمن حتى لو أوقف المشروع مبكراً.', en: 'Successful entrepreneurs avoid failure at any cost.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q41', type: 'true-false', questionText: { ar: '41. تُعد القدرة على التواصل من مهارات رائد الأعمال الناجح.', en: 'Communication is an entrepreneur skill.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q42', type: 'true-false', questionText: { ar: '42. التفكير الإبداعي والتخطيط من أسس النجاح في ريادة الأعمال.', en: 'Creative thinking and planning are success pillars.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q43', type: 'true-false', questionText: { ar: '43. من مكونات عناصر ريادة الأعمال الفكرة، التمويل، والمخاطرة المحسوبة.', en: 'Entrepreneurship components are idea, funds, risk.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q44', type: 'true-false', questionText: { ar: '44. تحقيق التنمية الاقتصادية أحد الأهداف الرئيسية لريادة الأعمال.', en: 'Economic development is a main goal.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q45', type: 'true-false', questionText: { ar: '45. المستشار المالي يساعد رواد الأعمال في اتخاذ قرارات مالية مدروسة لتحقيق النمو.', en: 'Financial advisor helps in growth decisions.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q46', type: 'true-false', questionText: { ar: '46. وسائل التواصل الاجتماعي لم تعد مهمة في بناء العلامة التجارية لرواد الأعمال.', en: 'Social media is no longer important for branding.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q47', type: 'true-false', questionText: { ar: '47. تهدف وظيفة مدير العلاقات العامة إلى تحسين الصورة العامة للشركة أمام الجمهور ووسائل الإعلام.', en: 'PR manager improves company image.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q48', type: 'true-false', questionText: { ar: '48. من المهارات الأساسية لموظفي التسويق عبر الإنترنت معرفة كيفية كتابة بريد إلكتروني احترافي.', en: 'Online marketing staff need professional email skills.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q49', type: 'true-false', questionText: { ar: '49. الاعتماد على البرامج والخدمات السحابية يساعد الشركات الجديدة على خفض التكاليف وتقليل المخاطر.', en: 'Cloud services help startups lower costs.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q50', type: 'true-false', questionText: { ar: '50. تلعب الموارد البشرية دوراً حيوياً في إنجاح المشاريع الريادية عبر تطوير الكفاءات اللازمة.', en: 'HR plays a vital role in entrepreneurship success.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q51', type: 'true-false', questionText: { ar: '51. حاضنة EBNI تعمل في مجال المشروعات الزراعية والغذاء.', en: 'EBNI incubator works in agriculture and food.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q52', type: 'true-false', questionText: { ar: '52. مرحلة التقييم والتطوير المستمر تساعد في تحسين الأداء واستدامة المشروع.', en: 'Constant evaluation helps project sustainability.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q53', type: 'true-false', questionText: { ar: '53. تقدم حاضنات الأعمال الدعم لتحويل الأفكار إلى مشاريع ملموسة.', en: 'Incubators help turn ideas into projects.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q54', type: 'true-false', questionText: { ar: '54. من سمات ثقافة الريادة قبول المخاطرة المحسوبة.', en: 'Entrepreneurial culture accepts calculated risk.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q55', type: 'true-false', questionText: { ar: '55. من التحديات التي تواجه رواد الأعمال نقص التمويل، وضعف الخبرة الإدارية.', en: 'Funding and poor exp are challenges.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q56', type: 'true-false', questionText: { ar: '56. الخطوة الأولى لإنشاء المشروع الريادي هي تحديد الميزانية.', en: 'First step is defining budget.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q57', type: 'true-false', questionText: { ar: '57. دراسة الجدوى لا تشمل التحليل المالي.', en: 'Feasibility study doesn\'t include financial analysis.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q58', type: 'true-false', questionText: { ar: '58. التمويل عنصر ثانوي لا يؤثر في نجاح المشروع.', en: 'Funding is secondary for success.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'q59', type: 'true-false', questionText: { ar: '59. الترويض أداة مهمة لتعريف الجمهور بالمنتج وبناء جسور الثقة مع العملاء.', en: 'Promotion is important for trust.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'q60', type: 'true-false', questionText: { ar: '60. المتابعة الدورية تُشكل أحد العوامل الضرورية لضمان استدامة المشروع الريادي ونجاحه.', en: 'Periodic follow-up is necessary for success.' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },

    // --- (3) 15 Fill-in-the-Blank Questions ---
    { id: 'q61', type: 'fill-in-the-blank', questionText: { ar: '61. هو الشخص الذي يبتكر فكرة، ويحولها إلى مشروع واقعي ناجح، ويتحمل مسؤولية النتائج والمخاطر.', en: 'Person who innovates and turns idea into reality.' }, correctAnswer: 'رائد الأعمال' },
    { id: 'q62', type: 'fill-in-the-blank', questionText: { ar: '62. هي البصيرة المستقبلية التي تمكن رائد الأعمال من استشراف الاتجاهات القادمة في السوق وتحديد أهداف بعيدة المدى.', en: 'Future insight enabling entrepreneur to see trends.' }, correctAnswer: 'الرؤية' },
    { id: 'q63', type: 'fill-in-the-blank', questionText: { ar: '63. قدرة رائد الأعمال على تنسيق الموارد والمهام والأفراد بطريقة تحقق أهداف المشروع بفعالية.', en: 'Ability to coordinate resources and tasks effectively.' }, correctAnswer: 'التنظيم' },
    { id: 'q64', type: 'fill-in-the-blank', questionText: { ar: '64. مجالات ريادة الأعمال: ............. ............. ............. .............', en: 'Fields: Tech, Health, Edu, Env' }, correctAnswer: 'التكنولوجيا، الصحة، التعليم، والبيئة' },
    { id: 'q65', type: 'fill-in-the-blank', questionText: { ar: '65. هي المؤسسات التي تدعم رواد الأعمال عبر التدريب، التوجيه، والتمويل في المراحل الأولى من المشروع.', en: 'Incubators support early stages.' }, correctAnswer: 'حاضنات الأعمال' },
    { id: 'q66', type: 'fill-in-the-blank', questionText: { ar: '66. المرحلة الأولى من إنشاء المشروع حيث تُولد أفكار جديدة ومبتكرة تسمى .............', en: 'First stage is Idea Generation.' }, correctAnswer: 'توليد الفكرة' },
    { id: 'q67', type: 'fill-in-the-blank', questionText: { ar: '67. هي وثيقة تحدد الأهداف والاستراتيجيات والموارد اللازمة لتأسيس المشروع.', en: 'Document defining goals.' }, correctAnswer: 'خطة العمل' },
    { id: 'q68', type: 'fill-in-the-blank', questionText: { ar: '68. هو توفير رأس المال اللازم للمشروع من مصادر مختلفة (شخصية، مصرفية، استثمارية).', en: 'Providing capital.' }, correctAnswer: 'التمويل' },
    { id: 'q69', type: 'fill-in-the-blank', questionText: { ar: '69. من أساليب تحفيز ثقافة ريادة الأعمال ............. .............', en: 'Methods to motivate: Gov and Media support' }, correctAnswer: 'توفر الدعم الحكومي، الدعم الإعلامي' },
    { id: 'q70', type: 'fill-in-the-blank', questionText: { ar: '70. هي عملية الوصول إلى اتفاق يرضي جميع الأطراف.', en: 'Reaching agreement.' }, correctAnswer: 'التفاوض' },
    { id: 'q71', type: 'fill-in-the-blank', questionText: { ar: '71. هو التأثير في الآخرين لتبني فكرة أو منتج.', en: 'Influencing others.' }, correctAnswer: 'الإقناع' },
    { id: 'q72', type: 'fill-in-the-blank', questionText: { ar: '72. هي تقييم الجدوى الاقتصادية والتكلفة والعائد وتحديد المخاطر المحتملة.', en: 'Economic evaluation.' }, correctAnswer: 'دراسة الجدوى' },
    { id: 'q73', type: 'fill-in-the-blank', questionText: { ar: '73. هي مجموعة من القيم والسلوكيات التي تشجع على الابتكار والمبادرة.', en: 'Set of values.' }, correctAnswer: 'ثقافة ريادة الأعمال' },
    { id: 'q74', type: 'fill-in-the-blank', questionText: { ar: '74. هو دراسة المنافسين والعملاء والفجوات السوقية وتحديد القيمة المضافة.', en: 'Study of competitors.' }, correctAnswer: 'تحليل السوق' },
    { id: 'q75', type: 'fill-in-the-blank', questionText: { ar: '75. من مهارات التفاوض الفعال ............. ............. .............', en: 'Listening, Prep, Persuasion.' }, correctAnswer: 'الاستماع الجيد - التحضير المسبق - القدرة على الإقناع' }
  ]
};

export const TRANSLATIONS = {
  ar: {
    dashboard: 'الرئيسية',
    startExam: 'ابدأ الآن',
    totalExams: 'إجمالي الاختبارات',
    accuracy: 'معدل الدقة',
    progress: 'نسبة التقدم',
    lastScore: 'آخر درجة',
    noExams: 'لا توجد اختبارات متاحة',
    next: 'السؤال التالي',
    previous: 'السؤال السابق',
    submit: 'إنهاء الاختبار',
    backToHome: 'العودة للرئيسية',
    score: 'درجتك النهائية',
    timeSpent: 'الوقت',
    correctAnswers: 'إجابات صحيحة',
    wrongAnswers: 'إجابات خاطئة',
    review: 'مراجعة الأسئلة',
    checking: 'يتم التصحيح...',
    check: 'تحقق من صحة الإجابة',
    yourAnswer: 'إجابتك',
    correctAnswer: 'الإجابة الصحيحة',
    langToggle: 'English',
    admin_login: 'دخول المسؤول',
    username: 'اسم المستخدم',
    password: 'كلمة السر',
    login_btn: 'دخول',
    cancel: 'إلغاء',
    invalid_creds: 'بيانات خاطئة',
    admin_control: 'لوحة التحكم للمسؤول',
    exit_admin: 'خروج من الإدارة',
    upload_success: 'تم الحفظ بنجاح',
    preparing: 'جاري التحضير...',
    admin_badge: 'إدارة',
    exam_builder: 'بناء اختبار جديد',
    exam_info: 'بيانات الاختبار',
    exam_title: 'عنوان الاختبار',
    select_subject: 'اختر المادة',
    add_question: 'إضافة سؤال',
    question_text: 'نص السؤال',
    question_type: 'نوع السؤال',
    options_label: 'خيارات الإجابة',
    add_option: 'إضافة خيار',
    save_exam: 'حفظ الاختبار ونشره',
    mcq: 'اختياري',
    tf: 'صح/خطأ',
    fill: 'مقالي/أكمل',
    import_file: 'استيراد من ملف',
    no_questions: 'لا توجد أسئلة',
    active_exams: 'الاختبارات النشطة',
    hidden_exams: 'المخفية',
    upload_image: 'صورة مصغرة',
    saved_questions: 'المواد والملفات',
    folders: 'موادي التعليمية',
    create_folder: 'إنشاء مادة جديدة',
    folder_name: 'اسم المادة (مثلاً: ريادة أعمال)',
    save_folder: 'حفظ المادة',
    practice_folder: 'بدء تدريب شامل',
    download_pdf: 'تحميل كـ PDF',
    save_to_folder: 'حفظ في ملف',
    bulk_save_wrong: 'حفظ الأخطاء لمراجعتها',
    review_folder: 'مراجعة الأخطاء',
    no_folders: 'لا توجد مواد مضافة بعد',
    delete_folder: 'حذف المجلد',
    edit_folder: 'تعديل',
    fav_questions: 'سؤال محفوظ'
  },
  en: {
    dashboard: 'Dashboard',
    startExam: 'Start Now',
    totalExams: 'Total Exams',
    accuracy: 'Accuracy',
    progress: 'Progress',
    lastScore: 'Last Score',
    noExams: 'No exams available',
    next: 'Next Question',
    previous: 'Previous',
    submit: 'Finish',
    backToHome: 'Back Home',
    score: 'Final Score',
    timeSpent: 'Time',
    correctAnswers: 'Correct',
    wrongAnswers: 'Wrong',
    review: 'Review',
    checking: 'Correcting...',
    check: 'Check Answer',
    yourAnswer: 'Your Answer',
    correctAnswer: 'Correct Answer',
    langToggle: 'العربية',
    admin_login: 'Admin Login',
    username: 'Username',
    password: 'Password',
    login_btn: 'Login',
    cancel: 'Cancel',
    invalid_creds: 'Invalid',
    admin_control: 'Admin Control',
    exit_admin: 'Exit Admin',
    upload_success: 'Saved successfully',
    preparing: 'Preparing...',
    admin_badge: 'ADMIN',
    exam_builder: 'New Exam Builder',
    exam_info: 'Exam Info',
    exam_title: 'Exam Title',
    select_subject: 'Select Subject',
    add_question: 'Add Question',
    question_text: 'Question Text',
    question_type: 'Type',
    options_label: 'Options',
    add_option: 'Add Option',
    save_exam: 'Save & Publish',
    mcq: 'MCQ',
    tf: 'T/F',
    fill: 'Fill in Blank',
    import_file: 'Import',
    no_questions: 'No questions',
    active_exams: 'Active',
    hidden_exams: 'Hidden',
    upload_image: 'Thumbnail',
    saved_questions: 'My Files',
    folders: 'Folders',
    create_folder: 'Create New Subject',
    folder_name: 'Subject Name',
    save_folder: 'Save Folder',
    practice_folder: 'Start Practice',
    download_pdf: 'Download PDF',
    save_to_folder: 'Save to File',
    bulk_save_wrong: 'Save Mistakes',
    review_folder: 'Review Mistakes',
    no_folders: 'No folders added',
    delete_folder: 'Delete',
    edit_folder: 'Edit',
    fav_questions: 'Saved Questions'
  }
};
