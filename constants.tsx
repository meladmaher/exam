import { Subject, Exam, Question } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'smartphone_apps',
    name: { ar: 'مقرر تطبيقات الهواتف الذكية', en: 'Smartphone Applications Course' },
    description: { ar: 'بنك الأسئلة الشامل لمقرر تطبيقات الهواتف الذكية (صح وخطأ، اختيار من متعدد، وأسئلة مقالية)', en: 'Comprehensive question bank for Smartphone Applications course' },
    icon: '📱'
  }
];

export const ALL_QUESTIONS: Question[] = [
    // ==========================================
    // -------------- الفصل الأول --------------
    // ==========================================
    
    // --- أولاً: صح وأخطأ (الفصل الأول) ---
    { id: 'ch1_tf1', type: 'true-false', questionText: { ar: '1- الهواتف الذكية هي مجرد أجهزة لإجراء المكالمات وإرسال الرسائل.', en: 'Q1' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch1_tf2', type: 'true-false', questionText: { ar: '2- العلاقة بين كفاءة القطع المكونة للجهاز وكفاءة الجهاز نفسه علاقة طردية.', en: 'Q2' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf3', type: 'true-false', questionText: { ar: '3- يستخدم تطبيق (WAP) كبروتوكول للتطبيقات اللاسلكية.', en: 'Q3' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf4', type: 'true-false', questionText: { ar: '4- تعتبر أنظمة التشغيل مثل اندرويد جزء من المكونات المادية (Hardware) للجهاز.', en: 'Q4' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch1_tf5', type: 'true-false', questionText: { ar: '5- الجزء البرمجي (Software) هو الجزء الذي يمكن للمستخدم لمسه في الهاتف.', en: 'Q5' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch1_tf6', type: 'true-false', questionText: { ar: '6- شبكات الاتصالات الخلوية تستخدم بدائل صلبة للربط بين الأجهزة.', en: 'Q6' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch1_tf7', type: 'true-false', questionText: { ar: '7- تدعم الهواتف الذكية تقنية تتبع حركة العين لتصفح الإنترنت أو استعراض الصور.', en: 'Q7' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf8', type: 'true-false', questionText: { ar: '8- يتميز الهاتف الذكي بقدرته على مشاركة شاشته مع شاشات أكبر.', en: 'Q8' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf9', type: 'true-false', questionText: { ar: '9- تطبيقات التواصل الاجتماعي تفتقر لخاصية تبادل الصوت والصورة.', en: 'Q9' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch1_tf10', type: 'true-false', questionText: { ar: '10- الدوافع الوضعية لاستخدام الهاتف تعنى بإدارة شؤون الأسرة والسيطرة على الحالات الطارئة.', en: 'Q10' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf11', type: 'true-false', questionText: { ar: '11- نظام التشغيل يمثل الواجهة التي تمكن مقتني الجهاز من الوصول لمميزاته التقنية.', en: 'Q11' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf12', type: 'true-false', questionText: { ar: '12- الخصوصية وانتهاكها تعتبر من مخاطر استخدام الهواتف الذكية.', en: 'Q12' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf13', type: 'true-false', questionText: { ar: '13- تطبيق (GPRS) يستخدم للتراسل بالحزم العامة للراديو للولوج لشبكة الإنترنت.', en: 'Q13' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf14', type: 'true-false', questionText: { ar: '14- من إيجابيات الهواتف الذكية توسيع آفاق وثقافة الشخص المستخدم للتكنولوجيا.', en: 'Q14' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch1_tf15', type: 'true-false', questionText: { ar: '15- تتيح تطبيقات التراسل الفوري تبادل البيانات والوسائط في وقت قياسي.', en: 'Q15' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },

    // --- ثانياً: اختر الإجابة الصحيحة (الفصل الأول) ---
    {
      id: 'ch1_mcq1',
      type: 'multiple-choice',
      questionText: { ar: '1- أي جزء في الهاتف الذكي مسؤول عن حفظ البيانات والمعلومات وينقسم إلى داخلية وخارجية هو:', en: 'Q1' },
      options: [{ ar: 'أ) المعالج', en: 'A' }, { ar: 'ب) الذاكرة', en: 'B' }, { ar: 'ج) الشاشة', en: 'C' }, { ar: 'د) نظام التشغيل', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch1_mcq2',
      type: 'multiple-choice',
      questionText: { ar: '2- أي من المكونات التالية يمثل الوجهة التي تمكن مقتني الجهاز من الوصول لمميزاته التقنية؟', en: 'Q2' },
      options: [{ ar: 'أ) نظام التشغيل', en: 'A' }, { ar: 'ب) الذاكرة', en: 'B' }, { ar: 'ج) الشاشة', en: 'C' }, { ar: 'د) المعالج', en: 'D' }],
      correctAnswer: '0'
    },
    {
      id: 'ch1_mcq3',
      type: 'multiple-choice',
      questionText: { ar: '3- أي مما يلي يعد من دوافع استخدام الهاتف الذكي؟', en: 'Q3' },
      options: [{ ar: 'أ) دوافع نفسية', en: 'A' }, { ar: 'ب) دوافع اجتماعية', en: 'B' }, { ar: 'ج) دوافع مهنية', en: 'C' }, { ar: 'د) جميع ما سبق', en: 'D' }],
      correctAnswer: '3'
    },
    {
      id: 'ch1_mcq4',
      type: 'multiple-choice',
      questionText: { ar: '4- ماذا يعني اختصار (MMS)؟', en: 'Q4' },
      options: [{ ar: 'أ) الرسائل النصية القصيرة', en: 'A' }, { ar: 'ب) الوسائط المتعددة', en: 'B' }, { ar: 'ج) تصفح الإنترنت', en: 'C' }, { ar: 'د) لا شيء مما سبق', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch1_mcq5',
      type: 'multiple-choice',
      questionText: { ar: '5- أي من التالي يعتبر من إيجابيات الهواتف الذكية؟', en: 'Q5' },
      options: [{ ar: 'أ) العزلة', en: 'A' }, { ar: 'ب) الإدمان', en: 'B' }, { ar: 'ج) تقريب المسافات', en: 'C' }, { ar: 'د) انتهاك الخصوصية', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch1_mcq6',
      type: 'multiple-choice',
      questionText: { ar: '6- نظام تشغيل "أندرويد" تدعمه شركة:', en: 'Q6' },
      options: [{ ar: 'أ) أبل', en: 'A' }, { ar: 'ب) جوجل', en: 'B' }, { ar: 'ج) نوكيا', en: 'C' }, { ar: 'د) إركسون', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch1_mcq7',
      type: 'multiple-choice',
      questionText: { ar: '7- ما هو التطبيق الذي يسمح بتبادل البيانات والملفات لاسلكياً قصير المدى؟', en: 'Q7' },
      options: [{ ar: 'أ) Bluetooth', en: 'A' }, { ar: 'ب) GPRS', en: 'B' }, { ar: 'ج) WAP', en: 'C' }, { ar: 'د) SMS', en: 'D' }],
      correctAnswer: '0'
    },
    {
      id: 'ch1_mcq8',
      type: 'multiple-choice',
      questionText: { ar: '8- تقنية تتبع حركة العين في الهواتف الذكية تستخدم في:', en: 'Q8' },
      options: [{ ar: 'أ) إجراء المكالمات', en: 'A' }, { ar: 'ب) تصفح الإنترنت', en: 'B' }, { ar: 'ج) إرسال الرسائل', en: 'C' }, { ar: 'د) تشغيل الألعاب', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch1_mcq9',
      type: 'multiple-choice',
      questionText: { ar: '9- في المجال الصحي يستخدم الهاتف الذكي من أجل:', en: 'Q9' },
      options: [{ ar: 'أ) إجراء العمليات الجراحية عن بعد', en: 'A' }, { ar: 'ب) مراقبة المستشفيات أمنياً', en: 'B' }, { ar: 'ج) صناعة الأدوية', en: 'C' }, { ar: 'د) تبادل المعلومات ونتائج الفحوصات والزيارات الميدانية', en: 'D' }],
      correctAnswer: '3'
    },
    {
      id: 'ch1_mcq10',
      type: 'multiple-choice',
      questionText: { ar: '10- الهدف الأساسي من وجود نظام التشغيل في الجهاز هو:', en: 'Q10' },
      options: [{ ar: 'أ) زيادة وزن الهاتف', en: 'A' }, { ar: 'ب) إدارة المكونات البرمجية والمادية وتوفير واجهة للمستخدم', en: 'B' }, { ar: 'ج) استهلاك طاقة البطارية بشكل أسرع', en: 'C' }, { ar: 'د) تقليل مساحة التخزين المتاحة', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch1_mcq11',
      type: 'multiple-choice',
      questionText: { ar: '11- ما هو التعريف الأساسي للهاتف الذكي ؟', en: 'Q11' },
      options: [{ ar: 'أ) جهاز اتصال لاسلكي بسيط للمكالمات الصوتية فقط.', en: 'A' }, { ar: 'ب) جهاز ثابت يستخدم في المكاتب لإرسال الفاكسات.', en: 'B' }, { ar: 'ج) وحدة تخزين سحابية متنقلة لا تحتوي على شاشة.', en: 'C' }, { ar: 'د) هاتف محمول متنقل يتضمن وظائف متقدمة تتعدى المكالمات والرسائل النصية.', en: 'D' }],
      correctAnswer: '3'
    },
    {
      id: 'ch1_mcq12',
      type: 'multiple-choice',
      questionText: { ar: '12- يعتبر الهاتف الذكي حاسوب محمول باليد لأنه يتيح للمستخدم:', en: 'Q12' },
      options: [{ ar: 'أ) معرفة آخر الأخبار عبر الاشتراك في خدمة الإنترنت.', en: 'A' }, { ar: 'ب) استخدامه كمرآة عاكسة فقط.', en: 'B' }, { ar: 'ج) العمل بدون بطارية داخلية.', en: 'C' }, { ar: 'د) إجراء المكالمات الصوتية التقليدية فقط', en: 'D' }],
      correctAnswer: '0'
    },
    {
      id: 'ch1_mcq13',
      type: 'multiple-choice',
      questionText: { ar: '13- من أمثلة أنظمة التشغيل المتطورة التي تعمل عليها الهواتف الذكية:', en: 'Q13' },
      options: [{ ar: 'أ) نظام الويندوز القديم 95', en: 'A' }, { ar: 'ب) برامج الأوفيس فقط.', en: 'B' }, { ar: 'ج) نظام الأندرويد ، iOS', en: 'C' }, { ar: 'د) نظام الرسائل القصيرة SMS', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch1_mcq14',
      type: 'multiple-choice',
      questionText: { ar: '14- تعتمد التطبيقات في تثبيتها بشكل أساسي على نوع:', en: 'Q14' },
      options: [{ ar: 'أ) لون الهاتف.', en: 'A' }, { ar: 'ب) حجم الشاشة.', en: 'B' }, { ar: 'ج) نظام التشغيل المثبت.', en: 'C' }, { ar: 'د) نوع الشاحن المستخدم.', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch1_mcq15',
      type: 'multiple-choice',
      questionText: { ar: '15- التخزين السحابي يساعد على:', en: 'Q15' },
      options: [{ ar: 'أ) حذف الملفات.', en: 'A' }, { ar: 'ب) مزامنة الملفات.', en: 'B' }, { ar: 'ج) إيقاف الإنترنت.', en: 'C' }, { ar: 'د) تقليل الذاكرة', en: 'D' }],
      correctAnswer: '1'
    },

    // --- ثالثاً: أسئلة مقالية وأكمل (الفصل الأول) ---
    {
      id: 'ch1_e1',
      type: 'fill-in-the-blank',
      questionText: { ar: '1- اشرح الفرق بين الدوافع النفسية والدوافع الاجتماعية لاستخدام الهاتف.', en: 'E1' },
      correctAnswer: '- النفسية: تتمثل في حب الظهور وتوفير الأمان والاطمئنان.\n- الاجتماعية: تعني المحافظة على المكانة الاجتماعية وتحقيق القبول الاجتماعي.'
    },
    {
      id: 'ch1_e2',
      type: 'fill-in-the-blank',
      questionText: { ar: '2- اذكر ثلاث من خدمات الهواتف الذكية العامة مع الشرح ؟', en: 'E2' },
      correctAnswer: '- تصفح الإنترنت: يتيح الهاتف الذكي تصفح الإنترنت بسرعة عالية.\n- الاتصال المرئي: تتيح إجراء مكالمات بالصوت والصورة (فيديو كول)\n- الوسائط المتعددة: تتيح إرسال الصور والفيديو بالبيانات التي لا يمكن إرسالها برسالة نصية عادية.'
    },
    {
      id: 'ch1_e3',
      type: 'fill-in-the-blank',
      questionText: { ar: '3- عرف الهاتف الذكي ؟', en: 'E3' },
      correctAnswer: 'هو هاتف متنقل يقدم وظائف متقدمة تتعدى المكالمات والرسائل ويعمل على أنظمة تشغيل متطورة كنظام الأندرويد والإيزو .'
    },
    {
      id: 'ch1_e4',
      type: 'fill-in-the-blank',
      questionText: { ar: '4- وضح كيف ساهمت الهواتف الذكية في تقريب المسافات.', en: 'E4' },
      correctAnswer: 'عبر توفير إمكانية التواصل الفوري بين الأشخاص في الداخل والخارج، مما قلل الحاجة للزيارات المباشرة.'
    },
    {
      id: 'ch1_e5',
      type: 'fill-in-the-blank',
      questionText: { ar: '5- اذكر مكونات الهاتف الذكي ؟', en: 'E5' },
      correctAnswer: '- المكون الفيزيائي (Hardware) وهو الجزء الممكن لمسه في الجهاز مثل المعالج : الذي يقوم بمعالجة البيانات وكلما كان أسرع كان الجهاز أفضل ، والذاكرة : هي الجزء المسؤول عن حفظ المعلومات والبيانات ، والشاشة: عنصر مهم لعرض المحتوى وتحديد نوع الهاتف .\n- المكون البرمجي (Software): هو الجزء المشغل للجهاز مثل نظام التشغيل : هو همزة الوصل بين مكونات الجهاز الصلبة والبرمجيات ، والتطبيقات : تتعدد أنواعها ولكن عند التثبيت تعتمد على نظام التشغيل .'
    },
    {
      id: 'ch1_e7',
      type: 'fill-in-the-blank',
      questionText: { ar: '7- اذكر مميزات وخصائص الهواتف الذكية.', en: 'E7' },
      correctAnswer: 'تتميز الهواتف الذكية بعدة مميزات منها :\n١ - سهولة التواصل مع الآخرين\n٢ - يستخدم تقنية تتبع حركة العين لتصفح الإنترنت\n٣ - يتميز بقدرته على مشاركة شاشته مع شاشات أكبر .'
    },
    {
      id: 'ch1_e8',
      type: 'fill-in-the-blank',
      questionText: { ar: '8- وضح سلبيات ومخاطر الهاتف الذكي.', en: 'E8' },
      correctAnswer: 'يؤثر الهاتف الذكي بشكل سلبي على مجموعة من الجوانب مثل :\n- الصحة : يتسبب في أمراض وآلام واضطرابات في النوم .\n- الإدمان: الإفراط في استخدامه صار درباً من دروب الإدمان .\n- العزلة : تغييرات سلبية في طبيعة العلاقات الاجتماعية مما أدى إلى العزلة ،والتشتت الذهني .\n- الخصوصية : أدى إلى انتهاك خصوصية الناس.'
    },
    {
      id: 'ch1_e9',
      type: 'fill-in-the-blank',
      questionText: { ar: '9- اذكر ثلاثة من مجالات استخدام الهواتف الذكية.', en: 'E9' },
      correctAnswer: 'المجال التعليمي، المجال الصحي، المجال التجاري'
    },
    {
      id: 'ch1_fill8',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 8- الوظيفة الأساسية للمعالج Processor في الهاتف الذكي هي .....................................', en: 'Fill8' },
      correctAnswer: 'معالجة البيانات وسرعة أداء الجهاز.'
    },
    {
      id: 'ch1_fill9',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 9- مصطلح ..................................... يطلق على الانتشار الواسع والسريع في استخدام وسائط الربط والتواصل دون بدائل صلبة.', en: 'Fill9' },
      correctAnswer: 'شبكات الاتصالات الخلوية.'
    },
    {
      id: 'ch1_fill10',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 10- ................................هو النظام الذي يمثل الواجهة التي تمكن المستخدم من الوصول لمميزاته الهاتف.', en: 'Fill10' },
      correctAnswer: 'نظام التشغيل.'
    },

    // ==========================================
    // -------------- الفصل الثاني --------------
    // ==========================================

    // --- أولاً: صح وأخطأ (الفصل الثاني) ---
    { id: 'ch2_tf1', type: 'true-false', questionText: { ar: '1- الهاتف الذكي هو جهاز محمول يقدم خدمات الاتصال والحوسبة معًا.', en: 'Q1' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf2', type: 'true-false', questionText: { ar: '2- نظام التشغيل يمثل حلقة الوصل بين مكونات الهاتف والتطبيقات.', en: 'Q2' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf3', type: 'true-false', questionText: { ar: '3- نظام Android نظام مغلق المصدر.', en: 'Q3' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch2_tf4', type: 'true-false', questionText: { ar: '4- نظام IOS خاص بأجهزة شركة Apple.', en: 'Q4' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf5', type: 'true-false', questionText: { ar: '5- الفعاليات (Activities) تمثل واجهات التفاعل مع المستخدم داخل التطبيق.', en: 'Q5' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf6', type: 'true-false', questionText: { ar: '6- مزودات المحتوى (Content Providers) تستخدم لمشاركة البيانات بين التطبيقات.', en: 'Q6' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf7', type: 'true-false', questionText: { ar: '7- مستقبلات النشر (Broadcast Receivers) تستقبل الرسائل والأحداث من النظام أو التطبيقات الأخرى.', en: 'Q7' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf8', type: 'true-false', questionText: { ar: '8- التطبيق الأصلي (Native App) يعمل من خلال متصفح الويب فقط.', en: 'Q8' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch2_tf9', type: 'true-false', questionText: { ar: '9- تطبيق الويب (Web App) يعمل داخل متصفح الإنترنت.', en: 'Q9' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf10', type: 'true-false', questionText: { ar: '10- التطبيق الهجين يجمع بين خصائص التطبيقات الأصلية وتطبيقات الويب.', en: 'Q10' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf11', type: 'true-false', questionText: { ar: '11- واجهة المستخدم هي الجزء الذي يتفاعل معه المستخدم مباشرة.', en: 'Q11' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf12', type: 'true-false', questionText: { ar: '12- كثرة الألوان والخطوط المختلفة دائمًا تحسن تجربة المستخدم.', en: 'Q12' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch2_tf13', type: 'true-false', questionText: { ar: '13- البساطة من أهم مبادئ تصميم واجهات المستخدم.', en: 'Q13' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf14', type: 'true-false', questionText: { ar: '14- تقسيم المهام إلى خطوات صغيرة يسهل استخدام التطبيق.', en: 'Q14' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch2_tf15', type: 'true-false', questionText: { ar: '15- حجم الأزرار لا يؤثر على سهولة استخدام التطبيق.', en: 'Q15' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },

    // --- ثانياً: اختر الإجابة الصحيحة (الفصل الثاني) ---
    {
      id: 'ch2_mcq1',
      type: 'multiple-choice',
      questionText: { ar: '1- الشركة المطورة لنظام IOS هي:', en: 'Q1' },
      options: [{ ar: 'أ) Google', en: 'A' }, { ar: 'ب) Samsung', en: 'B' }, { ar: 'ج) Apple', en: 'C' }, { ar: 'د) Huawei', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch2_mcq2',
      type: 'multiple-choice',
      questionText: { ar: '2- أي مكون مسؤول عن عرض واجهات التطبيق للمستخدم؟', en: 'Q2' },
      options: [{ ar: 'أ) الخدمات Services', en: 'A' }, { ar: 'ب) الفعاليات Activities', en: 'B' }, { ar: 'ج) Layout', en: 'C' }, { ar: 'د) مستقبلات النشر', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch2_mcq3',
      type: 'multiple-choice',
      questionText: { ar: '3- أي مكون يعمل في الخلفية دون تفاعل مباشر مع المستخدم؟', en: 'Q3' },
      options: [{ ar: 'أ) الخدمات Services', en: 'A' }, { ar: 'ب) الفعاليات Activities', en: 'B' }, { ar: 'ج) UI', en: 'C' }, { ar: 'د) مستقبلات النشر', en: 'D' }],
      correctAnswer: '0'
    },
    {
      id: 'ch2_mcq4',
      type: 'multiple-choice',
      questionText: { ar: '4- المكون المسؤول عن استقبال الرسائل والتنبيهات هو:', en: 'Q4' },
      options: [{ ar: 'أ) مستقبلات النشر', en: 'A' }, { ar: 'ب) الفعاليات Activities', en: 'B' }, { ar: 'ج) Layout', en: 'C' }, { ar: 'د) UI', en: 'D' }],
      correctAnswer: '0'
    },
    {
      id: 'ch2_mcq5',
      type: 'multiple-choice',
      questionText: { ar: '5- التطبيق الذي يتم تثبيته مباشرة على الجهاز يسمى:', en: 'Q5' },
      options: [{ ar: 'أ) التطبيق الويب Web App', en: 'A' }, { ar: 'ب) التطبيق الأصلي Native App', en: 'B' }, { ar: 'ج) التطبيق السحابة Cloud App', en: 'C' }, { ar: 'د) التطبيق الذكي Smart App', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch2_mcq6',
      type: 'multiple-choice',
      questionText: { ar: '6- التطبيق الذي يعمل من خلال المتصفح يسمى:', en: 'Q6' },
      options: [{ ar: 'أ) تطبيق الويب Web App', en: 'A' }, { ar: 'ب) تطبيق الأصلي Native App', en: 'B' }, { ar: 'ج) التطبيق الهجين Hybrid App', en: 'C' }, { ar: 'د) التطبيق الذكي Smart App', en: 'D' }],
      correctAnswer: '0'
    },
    {
      id: 'ch2_mcq7',
      type: 'multiple-choice',
      questionText: { ar: '7- واجهة المستخدم تهدف إلى:', en: 'Q7' },
      options: [{ ar: 'أ) تخزين البيانات', en: 'A' }, { ar: 'ب) تسهيل التفاعل بين المستخدم والتطبيق', en: 'B' }, { ar: 'ج) إدارة البطارية', en: 'C' }, { ar: 'د) إدارة الشبكة', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch2_mcq8',
      type: 'multiple-choice',
      questionText: { ar: '8- أي مما يلي يعد من أسس تصميم الواجهة؟', en: 'Q8' },
      options: [{ ar: 'أ) تعقيد القوائم', en: 'A' }, { ar: 'ب) استخدام خطوط غير واضحة', en: 'B' }, { ar: 'ج) البساطة والوضوح', en: 'C' }, { ar: 'د) زيادة عدد الأزرار', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch2_mcq9',
      type: 'multiple-choice',
      questionText: { ar: '9- عند تصميم واجهة المستخدم يفضل:', en: 'Q9' },
      options: [{ ar: 'أ) استخدام عدد كبير من الألوان العشوائية', en: 'A' }, { ar: 'ب) استخدام ألوان مناسبة ومتناسقة', en: 'B' }, { ar: 'ج) استخدام خطوط صغيرة جدًا', en: 'C' }, { ar: 'د) إخفاء المعلومات المهمة', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch2_mcq10',
      type: 'multiple-choice',
      questionText: { ar: '10- أي نظام يعد مفتوح المصدر؟', en: 'Q10' },
      options: [{ ar: 'أ) IOS', en: 'A' }, { ar: 'ب) Android', en: 'B' }, { ar: 'ج) macOS', en: 'C' }, { ar: 'د) Windows', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch2_mcq11',
      type: 'multiple-choice',
      questionText: { ar: '11- أي مقارنة صحيحة بين أنظمة التشغيل iOS و Android ؟', en: 'Q11' },
      options: [{ ar: 'أ) iOS مفتوح المصدر و Android نظام مغلق المصدر', en: 'A' }, { ar: 'ب) كلاهما من إنتاج شركة جوجل', en: 'B' }, { ar: 'ج) iOS خاص بشركة أبل ومغلق المصدر و Android مفتوح المصدر خاص بجوجل وتستخدمه شركات متعددة', en: 'C' }, { ar: 'د) كلا النظامين مغلقان المصدر', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch2_mcq12',
      type: 'multiple-choice',
      questionText: { ar: '12- أي من الصفات التالية تميز التطبيقات الهجينة (Hybrid apps) ؟', en: 'Q12' },
      options: [{ ar: 'أ) تعمل فقط على نظام تشغيل واحد', en: 'A' }, { ar: 'ب) مزيج من التطبيق الأصلي وتطبيق الويب لتلائم أجهزة متعددة', en: 'B' }, { ar: 'ج) لا تعتمد على المتصفح إطلاقًا', en: 'C' }, { ar: 'د) تعني أن التطبيق دائمًا بلا اتصال بالإنتـرنت', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch2_mcq13',
      type: 'multiple-choice',
      questionText: { ar: '13- ما المقصود بواجهة المستخدم (UI) ؟', en: 'Q13' },
      options: [{ ar: 'أ) مجموعة من قطع الهاردوير داخل الهاتف', en: 'A' }, { ar: 'ب) تصميم يركز على سهولة التفاعل والتواصل للمستخدم ويشمل المداخل والمخرجات', en: 'B' }, { ar: 'ج) اسم نظام تشغيل معين', en: 'C' }, { ar: 'د) نوع من قواعد البيانات', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch2_mcq14',
      type: 'multiple-choice',
      questionText: { ar: '14- من أساسيات تصميم واجهة المستخدم يهدف إلى جعل التنقل مريحًا وسريعًا', en: 'Q14' },
      options: [{ ar: 'أ) استخدام ألوان زاهية فقط', en: 'A' }, { ar: 'ب) يجب حذف جميع التعليقات السلبية فقط', en: 'B' }, { ar: 'ج) الاعتماد فقط على آراء المطورين', en: 'C' }, { ar: 'د) استخدام عناصر مألوفة ومتسقة', en: 'D' }],
      correctAnswer: '3'
    },
    {
      id: 'ch2_mcq15',
      type: 'multiple-choice',
      questionText: { ar: '15- أي من العبارات التالية تمثل تعريف لتطبيقات الهواتف الذكية ؟', en: 'Q15' },
      options: [{ ar: 'أ) برامج تعمل فقط على الحواسيب الشخصية', en: 'A' }, { ar: 'ب) خدمات تقدمها الهواتف الذكية وتطورها شركات متعددة لتعمل على أنظمة التشغيل المختلفة', en: 'B' }, { ar: 'ج) مواقع إلكترونية لا يمكن الوصول إليها من الهواتف', en: 'C' }, { ar: 'د) ملفات وسائط لا تتطلب تثبيت برامج', en: 'D' }],
      correctAnswer: '1'
    },

    // --- ثالثاً: أسئلة مقالية وأكمل (الفصل الثاني) ---
    {
      id: 'ch2_e1',
      type: 'fill-in-the-blank',
      questionText: { ar: '1- اذكر أنواع تطبيقات الهواتف الذكية مع الشرح .', en: 'E1' },
      correctAnswer: '- التطبيقات الأصلية : هي التطبيقات التي تتطلب من المستخدم تنزيلها وتثبيتها على هاتفه الذكي وصممت لتلائم أنظمة التشغيل جميعها.\n- تطبيقات الويب : هي التطبيقات المتوفرة على الموقع الإلكتروني، ولا تتطلب من المستخدم تحميلها وتثبيتها على الهاتف الذكي.\n- التطبيقات الهجينة : هي مزيج من التطبيق الأصلي وتطبيق الويب ليلائم الأجهزة المحمولة كافة.'
    },
    {
      id: 'ch2_e2',
      type: 'fill-in-the-blank',
      questionText: { ar: '2- اذكر مكونات التطبيقات الذكية مع شرح مختصر لكل مكون.', en: 'E2' },
      correctAnswer: '- الفعاليات: تمثل واجهات التطبيق التي يتفاعل معها المستخدم.\n- الخدمات: تنفذ العمليات في الخلفية دون تدخل المستخدم.\n- مزودات المحتوى: تنظم وتشارك البيانات بين التطبيقات.\n- مستقبلات النشر: تستقبل الإشعارات والأحداث الصادرة من النظام أو التطبيقات.'
    },
    {
      id: 'ch2_e3_compare',
      type: 'fill-in-the-blank',
      questionText: { ar: '3- قارن بين ( نظام تشغيل اندرويد ، ونظام تشغيل أبل IOS )', en: 'E3' },
      correctAnswer: 'نظام اندرويد: الشركة المطورة (شركة جوجل الأمريكية) | الأجهزة (يعمل على هواتف شركات متعددة) | نوع النظام (مفتوح المصدر)\nنظام أبل IOS: الشركة المطورة (شركة أبل الأمريكية) | الأجهزة (يعمل على أجهزة شركة أبل فقط) | نوع النظام (مغلق المصدر)'
    },
    {
      id: 'ch2_e3_def',
      type: 'fill-in-the-blank',
      questionText: { ar: '3- عرّف تطبيقات الهواتف الذكية.', en: 'E3_def' },
      correctAnswer: 'هي التكنولوجيا الداعمة للهواتف المحمولة، كالمعايير وأنظمة التشغيل ومنصات العمل والمتصفحات وبرمجيات.'
    },
    {
      id: 'ch2_e4',
      type: 'fill-in-the-blank',
      questionText: { ar: '4- ما المقصود بنظام تشغيل الهواتف الذكية؟', en: 'E4' },
      correctAnswer: 'عبارة عن مجموعة من الأوامر والتعليمات التي تعمل معًا لإدارة الهاتف ومكوناته المختلفة... وهو همزة الوصل بين مكونات الهاتف الصلبة'
    },
    {
      id: 'ch2_e5',
      type: 'fill-in-the-blank',
      questionText: { ar: '5- اذكر أربعة من أسس تصميم واجهات المستخدم.', en: 'E5' },
      correctAnswer: '- المحافظة على بساطة الواجهة\n- استخدام عناصر مألوفة، متعارف عليها\n- تخطيط الصفحة بشكل هادف\n- استخدام الخطوط الصحيحة'
    },
    {
      id: 'ch2_e6',
      type: 'fill-in-the-blank',
      questionText: { ar: '6- اذكري أربعة من مبادئ تصميم تجربة المستخدم على الهواتف الذكية؟', en: 'E6' },
      correctAnswer: '- التركيز على أهداف المستخدم.\n- التبسيط والتقليل من الفوضى.\n- تقسيم المهام إلى خطوات صغيرة.\n- تصميم الواجهة بما يتناسب مع شاشة الهاتف.'
    },
    {
      id: 'ch2_fill7',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 7- ..........نظام مفتوح المصدر، طورته شركة جوجل، ويعمل على أجهزة متعددة.', en: 'Fill7' },
      correctAnswer: 'أندرويد'
    },
    {
      id: 'ch2_fill8',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 8- ......... نظام مغلق، طورته شركة أبل، ويعمل فقط على أجهزة أيفون', en: 'Fill8' },
      correctAnswer: 'iOS'
    },
    {
      id: 'ch2_fill9',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 9- ......... هو فرع من فروع علم تفاعل الإنسان والحاسوب تتكون واجهة المستخدم من مدخلات ومخرجات.', en: 'Fill9' },
      correctAnswer: 'واجهة المستخدم'
    },
    {
      id: 'ch2_fill10',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 10- ........هي التطبيقات المتوفرة على الموقع الإلكتروني، ولا تتطلب من المستخدم تحميلها وتثبيتها على الهاتف الذكي.', en: 'Fill10' },
      correctAnswer: 'تطبيق الويب (Web Apps)'
    },

    // ==========================================
    // -------------- الفصل الثالث --------------
    // ==========================================

    // --- أولاً: صح وأخطأ (الفصل الثالث) ---
    { id: 'ch3_tf1', type: 'true-false', questionText: { ar: '1- تعمل شبكات GSM على الترددات 900 و1800 و 1900 ميجاهرتز.', en: 'Q1' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch3_tf2', type: 'true-false', questionText: { ar: '2- تتكون شبكة GSM من خمسة أجزاء رئيسية.', en: 'Q2' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch3_tf3', type: 'true-false', questionText: { ar: '3- محطة BTS مسؤولة عن إرسال واستقبال الإشارة اللاسلكية مع الهاتف.', en: 'Q3' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch3_tf4', type: 'true-false', questionText: { ar: '4- تغطي محطة BTS الواحدة مساحة تصل إلى نحو 8 كم في المناطق المفتوحة.', en: 'Q4' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch3_tf5', type: 'true-false', questionText: { ar: '5- سجل VLR يحتوي على البيانات الدائمة للمشترك.', en: 'Q5' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch3_tf6', type: 'true-false', questionText: { ar: '6- سجل HLR يحتفظ بالبيانات المؤقتة للمشترك الزائر.', en: 'Q6' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch3_tf7', type: 'true-false', questionText: { ar: '7- مركز AUC مسؤول عن التحقق من هوية المشترك.', en: 'Q7' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch3_tf8', type: 'true-false', questionText: { ar: '8- سجل EIR يعتمد على رقم IMEI للتعرف على الأجهزة.', en: 'Q8' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch3_tf9', type: 'true-false', questionText: { ar: '9- القائمة السوداء في EIR تضم الأجهزة غير المصرح لها باستخدام الشبكة.', en: 'Q9' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch3_tf10', type: 'true-false', questionText: { ar: '10- القائمة البيضاء تحتوي على الأجهزة التي تكون تحت الاختبار.', en: 'Q10' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },

    // --- ثانياً: اكتب المصطلح العلمي (الفصل الثالث) ---
    {
      id: 'ch3_term1',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 1- النظام العالمي للاتصالات المتنقلة . (..................)', en: 'Term1' },
      correctAnswer: 'GSM'
    },
    {
      id: 'ch3_term2',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 2- محطة الإرسال والاستقبال الأساسية. (..................)', en: 'Term2' },
      correctAnswer: 'BTS'
    },
    {
      id: 'ch3_term3',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 3- النظام الفرعي للمحطة الأساسية. (..................)', en: 'Term3' },
      correctAnswer: 'BSS'
    },
    {
      id: 'ch3_term4',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 4- السجل الذي يحتفظ بالبيانات الدائمة للمشترك. (..................)', en: 'Term4' },
      correctAnswer: 'HLR'
    },
    {
      id: 'ch3_term5',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 5- السجل الذي يحتفظ بالبيانات المؤقتة للمشترك الزائر. (..................)', en: 'Term5' },
      correctAnswer: 'VLR'
    },
    {
      id: 'ch3_term6',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 6- مركز الأمن بالشبكة والمسؤول عن التحقق من هوية المشترك ومنح صلاحية استخدام الشبكة. (..................)', en: 'Term6' },
      correctAnswer: 'AUC'
    },
    {
      id: 'ch3_term7',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 7- عبارة عن قاعدة معلومات لكل أرقام التعريف لجهاز الموبايل. (..................)', en: 'Term7' },
      correctAnswer: 'سجل تعريف الأجهزة ( EIR )'
    },
    {
      id: 'ch3_term8',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 8- الرقم المميز لكل جهاز هاتف محمول ويوضع بواسطة المصنع. (..................)', en: 'Term8' },
      correctAnswer: 'IMEI'
    },
    {
      id: 'ch3_term9',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 9- هو عبارة عن رقم خاص بكل شريحة SIM. (..................)', en: 'Term9' },
      correctAnswer: 'IMSI'
    },
    {
      id: 'ch3_term10',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 10- القائمة التي تضم الأجهزة المصرح لها باستخدام الشبكة. (..................)', en: 'Term10' },
      correctAnswer: 'White List (القائمة البيضاء)'
    },
    {
      id: 'ch3_term11',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 11- هي الأجهزة الغير مصرح لها باستخدام الشبكة (..................)', en: 'Term11' },
      correctAnswer: 'black list (القائمة السوداء)'
    },
    {
      id: 'ch3_term12',
      type: 'fill-in-the-blank',
      questionText: { ar: 'المصطلح العلمي: 12- هي الأجهزة التي تكون تحت الاختبار (..................)', en: 'Term12' },
      correctAnswer: 'Gray list (القائمة الرمادية)'
    },

    // --- ثالثاً: أسئلة المقالي (الفصل الثالث) ---
    {
      id: 'ch3_e1',
      type: 'fill-in-the-blank',
      questionText: { ar: '1- عرف نظام GSM.', en: 'E1' },
      correctAnswer: 'هو النظام العالمي للاتصالات المتنقلة ( Global System for Mobile Communications ) ويُستخدم لتوفير خدمات الاتصالات اللاسلكية بين الهواتف المحمولة.'
    },
    {
      id: 'ch3_e2',
      type: 'fill-in-the-blank',
      questionText: { ar: '2- اذكر مكونات شبكة GSM الرئيسية.', en: 'E2' },
      correctAnswer: 'تتكون شبكة GSM من اربع مكونات أساسية وهم :\n١ - المحطة المتنقلة (MS).\n٢ - النظام الفرعي للمحطة الأساسية (BSS).\n٣ - النظام الفرعي للشبكة والتحويل (NSS).\n٤ - نظام العمليات والدعم (OSS).'
    },
    {
      id: 'ch3_e3',
      type: 'fill-in-the-blank',
      questionText: { ar: '3- اشرح وظيفة BTS.', en: 'E3' },
      correctAnswer: 'هي محطة الإرسال والاستقبال الأساسية، وتقوم بإرسال واستقبال الإشارات اللاسلكية بين الهاتف المحمول والشبكة.'
    },
    {
      id: 'ch3_e4',
      type: 'fill-in-the-blank',
      questionText: { ar: '4- ما وظيفة مركز AUC؟', en: 'E4' },
      correctAnswer: 'هو مركز التحقق Authentication Center، ويختص بالتحقق من هوية المشترك وتأمين عملية دخوله إلى الشبكة، مما يضمن السماح فقط للمشتركين المصرح لهم باستخدام خدمات الشبكة.'
    },
    {
      id: 'ch3_e5',
      type: 'fill-in-the-blank',
      questionText: { ar: '5- عرف المحطة الفرعية BTS', en: 'E5' },
      correctAnswer: 'هي ما يعرف بالهوائيات أو القنوات المتواجدة في الميدان وتحتوي على جهاز ارسال واستقبال الذي يعرف لنا بالخلية والتي تعطي الموبايل اشارة الراديو التي سوف يرسل ويستقبل عليها .'
    },
    {
      id: 'ch3_e6',
      type: 'fill-in-the-blank',
      questionText: { ar: '6- أذكر مع الشرح أقسام سجل تعريف الأجهزة ( EIR ).', en: 'E6' },
      correctAnswer: 'يحتوي سجل تعريف الأجهزة على ثلاث أقسام أو قوائم :\n١ - القائمة البيضاء ( White list ): هي الأجهزة المصرح لها باستخدام الشبكة .\n٢ - القائمة السوداء ( Black list ): هي الأجهزة الغير مصرح لها باستخدام الشبكة .\n٣ - القائمة الرمادية( Gray list ): هي الأجهزة التي تكون تحت الاختبار .'
    },

    // ==========================================
    // -------------- الفصل الرابع --------------
    // ==========================================

    // --- أولاً: صح وأخطأ (الفصل الرابع) ---
    { id: 'ch4_tf1', type: 'true-false', questionText: { ar: '1- تُعتبر العملية التعليمية اليوم مجرد نقل للمعارف من طرف المعلم إلى طرف المتعلم دون تفاعل.', en: 'Q1' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch4_tf2', type: 'true-false', questionText: { ar: '2- يقتصر دور المعلم في المناهج الحديثة على كونه ملقناً ومصدراً وحيداً للمعلومات.', en: 'Q2' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch4_tf3', type: 'true-false', questionText: { ar: '3- يُعد المتعلم هو المحور والطرف المستهدف الرئيسي الذي تُبنى حوله العملية التعليمية.', en: 'Q3' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf4', type: 'true-false', questionText: { ar: '4- من صفات المتعلم الناجح أن يكون مثابراً لديه القدرة على تعدي الصعوبات التعليمية.', en: 'Q4' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf5', type: 'true-false', questionText: { ar: '5- تُعد "الأهداف" هي العنصر الذي يتم في ضوئه اختيار محتويات المنهج الدراسي.', en: 'Q5' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf6', type: 'true-false', questionText: { ar: '6- يُعتبر تطبيق (Twitter) من أفضل النظم المستخدمة لإدارة التعلم (LMS) وتقديم المقررات .', en: 'Q6' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch4_tf7', type: 'true-false', questionText: { ar: '7- يتيح تطبيق (WhatsApp) إمكانية إجراء اختبارات شفوية وتبادل الملفات والإجابة على الاستفسارات مجاناً.', en: 'Q7' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf8', type: 'true-false', questionText: { ar: '8- التعليم عبر الهواتف الذكية يساعد في مراعاة الفروق الفردية.', en: 'Q8' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf9', type: 'true-false', questionText: { ar: '9- تطبيق ديولينجو ( Doulingo ) يوفر دورات للتعلم ويتيح للمستخدمين إجراء محادثات تقديم الدروس .', en: 'Q9' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf10', type: 'true-false', questionText: { ar: '10- التعلم عبر الهواتف الذكية عملية صعبة وتقلل من نطاق التعليم .', en: 'Q10' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch4_tf11', type: 'true-false', questionText: { ar: '11- التعليم عبر الهواتف الذكية يساعد في التغلب على مشكلة نقص أجهزة الحاسب في المؤسسات التعليمية.', en: 'Q11' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf12', type: 'true-false', questionText: { ar: '12- التعلم عبر الهواتف الذكية يساعد في القضاء على الأمية الحديثة.', en: 'Q12' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf13', type: 'true-false', questionText: { ar: '13- تؤثر الفجوة الرقمية في نتائج الطلاب .', en: 'Q13' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },
    { id: 'ch4_tf14', type: 'true-false', questionText: { ar: '14- يتميز نظام التعليم عبر الهواتف الذكية بصعوبة تطبيقه.', en: 'Q14' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '1' },
    { id: 'ch4_tf15', type: 'true-false', questionText: { ar: '15- ضعف القدرات التكنولوجية لدى المتعلمين يعتبر من العوائق في توظيف الهواتف في التعليم.', en: 'Q15' }, options: [{ ar: 'صح', en: 'True' }, { ar: 'خطأ', en: 'False' }], correctAnswer: '0' },

    // --- ثانياً: اختر الإجابة الصحيحة (الفصل الرابع) ---
    {
      id: 'ch4_mcq1',
      type: 'multiple-choice',
      questionText: { ar: '1- تتمثل "مخرجات" العملية التعليمية في نظامها المتكامل في:', en: 'Q1' },
      options: [{ ar: 'أ) المعارف والخبرات.', en: 'A' }, { ar: 'ب) العمليات التنسيقية.', en: 'B' }, { ar: 'ج) متعلم ذو كفاءات.', en: 'C' }, { ar: 'د) الوسائل التقنية', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch4_mcq2',
      type: 'multiple-choice',
      questionText: { ar: '2- الطرف الذي يعمل كـ "مخطط وموجه" ومحفز للمتعلم في النظم الحديثة هو :', en: 'Q2' },
      options: [{ ar: 'أ) المدير.', en: 'A' }, { ar: 'ب) المعلم.', en: 'B' }, { ar: 'ج) ولي الأمر.', en: 'C' }, { ar: 'د) المنهج', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch4_mcq3',
      type: 'multiple-choice',
      questionText: { ar: '3- أي مما يلي يُعد من الصفات "المهنية" التي يجب أن يتسم بها المعلم؟', en: 'Q3' },
      options: [{ ar: 'أ) التفكير التقليدي.', en: 'A' }, { ar: 'ب) الانعزال.', en: 'B' }, { ar: 'ج) التمكن التام من المجال المعرفي.', en: 'C' }, { ar: 'د) التردد في التعبير', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch4_mcq4',
      type: 'multiple-choice',
      questionText: { ar: '4- يجب على من يتعامل مع المتعلم أن يكون مدركاً لخلفياته الفردية والاجتماعية و ...', en: 'Q4' },
      options: [{ ar: 'أ) المادية.', en: 'A' }, { ar: 'ب) البيولوجية.', en: 'B' }, { ar: 'ج) الجغرافية.', en: 'C' }, { ar: 'د) السياسية', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch4_mcq5',
      type: 'multiple-choice',
      questionText: { ar: '5- المفهوم الحديث للمنهج يُعرف بأنه مجموعة من:', en: 'Q5' },
      options: [{ ar: 'أ) الكتب المدرسية فقط.', en: 'A' }, { ar: 'ب) الاختبارات النهائية.', en: 'B' }, { ar: 'ج) الخبرات والأنشطة.', en: 'C' }, { ar: 'د) القواعد الإدارية', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch4_mcq6',
      type: 'multiple-choice',
      questionText: { ar: '6- تسمح الهواتف الذكية للطلاب بالقيام بـ ........ مباشرة على شاشات الأجهزة:', en: 'Q6' },
      options: [{ ar: 'أ) الطباعة الورقية.', en: 'A' }, { ar: 'ب) رسم البيانات والمخططات.', en: 'B' }, { ar: 'ج) التصوير السينمائي.', en: 'C' }, { ar: 'د) الاتصال بالأقمار الصناعية', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch4_mcq7',
      type: 'multiple-choice',
      questionText: { ar: '7- تُسهل التقنيات اللاسلكية (Bluetooth, Wi-Fi) في الهواتف الذكية عملية:', en: 'Q7' },
      options: [{ ar: 'أ) القراءة الصامتة.', en: 'A' }, { ar: 'ب) الحفظ الآلي.', en: 'B' }, { ar: 'ج) العمل الجماعي التشاركي.', en: 'C' }, { ar: 'د) الحضور والانصراف', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch4_mcq8',
      type: 'multiple-choice',
      questionText: { ar: '8- نظام (Blackboard) يُصنف تعليمياً على أنه:', en: 'Q8' },
      options: [{ ar: 'أ) محرك بحث.', en: 'A' }, { ar: 'ب) تطبيق محادثة نصية.', en: 'B' }, { ar: 'ج) نظام إدارة تعلم (LMS)', en: 'C' }, { ar: 'د) موقع تواصل اجتماعي', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch4_mcq9',
      type: 'multiple-choice',
      questionText: { ar: '9- التطبيق الذي يمتاز بقبول الملفات المتنوعة ويسمح بـ "التدوين المصغر" هو :', en: 'Q9' },
      options: [{ ar: 'أ) فيسبوك.', en: 'A' }, { ar: 'ب) تويتر.', en: 'B' }, { ar: 'ج) فايبر.', en: 'C' }, { ar: 'د) ياهو', en: 'D' }],
      correctAnswer: '1'
    },
    {
      id: 'ch4_mcq10',
      type: 'multiple-choice',
      questionText: { ar: '10- تُستخدم تطبيقات البريد الإلكتروني مثل (Gmail) في السياق التعليمي لـ:', en: 'Q10' },
      options: [{ ar: 'أ) إجراء الاختبارات الشفوية.', en: 'A' }, { ar: 'ب) مشاهدة الفيديوهات التفاعلية.', en: 'B' }, { ar: 'ج) تزويد المتعلمين بالمقررات.', en: 'C' }, { ar: 'د) رسم البيانات يدوياً', en: 'D' }],
      correctAnswer: '2'
    },
    {
      id: 'ch4_mcq11',
      type: 'multiple-choice',
      questionText: { ar: '11- هو تطبيق يوفر تمارين تساعد في تنمية المهارات ويستخدم الواقع المعزز:', en: 'Q11' },
      options: [{ ar: 'أ) mondly', en: 'A' }, { ar: 'ب) Doulingo.', en: 'B' }, { ar: 'ج) blackboard.', en: 'C' }, { ar: 'د) beelinuapaa', en: 'D' }],
      correctAnswer: '0'
    },
    {
      id: 'ch4_mcq12',
      type: 'multiple-choice',
      questionText: { ar: '12- من فوائد تطبيقات الهواتف الذكية في التعليم:', en: 'Q12' },
      options: [{ ar: 'أ) المرونة والسرعة.', en: 'A' }, { ar: 'ب) الكفاءة وانخفاض التكلفة', en: 'B' }, { ar: 'ج) مراعاة الفروق الفردية.', en: 'C' }, { ar: 'د) جميع ما سبق', en: 'D' }],
      correctAnswer: '3'
    },
    {
      id: 'ch4_mcq13',
      type: 'multiple-choice',
      questionText: { ar: '13- ليس من متطلبات توظيف الهواتف الذكية في العملية التعليمية:', en: 'Q13' },
      options: [{ ar: 'أ) زيادة الوعي التكنولوجي.', en: 'A' }, { ar: 'ب) توفير بنيه تحتية.', en: 'B' }, { ar: 'ج) توفير الدعم المالي.', en: 'C' }, { ar: 'د) بناء مؤسسه جديدة.', en: 'D' }],
      correctAnswer: '3'
    },
    {
      id: 'ch4_mcq14',
      type: 'multiple-choice',
      questionText: { ar: '14- من صعوبات توظيف الهواتف الذكية في التعليم:', en: 'Q14' },
      options: [{ ar: 'أ) ضعف القدرات التكنولوجية.', en: 'A' }, { ar: 'ب) تنوع الأجهزة', en: 'B' }, { ar: 'ج) الوقت.', en: 'C' }, { ar: 'د) جميع ما سبق.', en: 'D' }],
      correctAnswer: '3'
    },
    {
      id: 'ch4_mcq15',
      type: 'multiple-choice',
      questionText: { ar: '15- يتميز تعليم عبر الهواتف الذكية بـ .....:', en: 'Q15' },
      options: [{ ar: 'أ) الصعوبة.', en: 'A' }, { ar: 'ب) زيادة التكلفة', en: 'B' }, { ar: 'ج) المرونة والفاعلية.', en: 'C' }, { ar: 'د) التحكم الشديد', en: 'D' }],
      correctAnswer: '2'
    },

    // --- ثالثاً: أسئلة مقالية وأكمل (الفصل الرابع) ---
    {
      id: 'ch4_e1',
      type: 'fill-in-the-blank',
      questionText: { ar: '1- اشرح دور المعلم كـ "مخطط وموجه" في العملية التعليمية الحديثة ؟', en: 'E1' },
      correctAnswer: 'ليس ناقلاً للمعارف وملقناً كما في السابق، بل هو: مخطط، موجه، محفز على الاجتهاد، متابع لتقييم المتعلم.'
    },
    {
      id: 'ch4_e2',
      type: 'fill-in-the-blank',
      questionText: { ar: '2- اشرح كيف تعزز الهواتف الذكية "العمل الجماعي التشاركي" بين الطلاب ؟', en: 'E2' },
      correctAnswer: 'العمل الجماعي التشاركي: تبادل الملفات وتشاركها بسهولة عبر البلوتوث، الواي فاي، والشبكات اللاسلكية.'
    },
    {
      id: 'ch4_e3',
      type: 'fill-in-the-blank',
      questionText: { ar: '3- اشرح الفرق بين المفهوم القديم والحديث للمنهج الدراسي ؟.', en: 'E3' },
      correctAnswer: 'مفهوم القديم: يركز على المواد الدراسية وحفظها واسترجاعها.\nالمفهوم الحديث: يركز على الخبرات والأنشطة التعليمية التي تنمي قدرات المتعلم وتحقق أهدافاً محددة.'
    },
    {
      id: 'ch4_e4',
      type: 'fill-in-the-blank',
      questionText: { ar: '4- اذكر تصنيف تطبيقات الهواتف الذكية في التعليم مع ذكر أمثلة عليها .', en: 'E4' },
      correctAnswer: 'تصنف التطبيقات الى ٤ انواع :\n١ - إدارة التعلم ( LMS )مثل blackboard\n٢ - الشبكات الاجتماعية مثل Facebook, twitter\n٣ - الفيديو والوسائط مثل YouTube\n٤ - المحادثات والبريد مثل WhatsApp, Gmail'
    },
    {
      id: 'ch4_e5',
      type: 'fill-in-the-blank',
      questionText: { ar: '5- أذكر تحديات وصعوبات توظيف الهواتف الذكية في التعليم .', en: 'E5' },
      correctAnswer: '١ - ضعف القدرات التكنولوجية\n٢ - تنوع الأجهزة\n٣ - الاتجاهات السلبية\n٤ - الوقت'
    },
    {
      id: 'ch4_e6',
      type: 'fill-in-the-blank',
      questionText: { ar: '6- اذكر أركان العملية التعليمية الأساسية التي لا تستقيم بدونها.', en: 'E6' },
      correctAnswer: '- المعلم\n- المتعلم\n- المنهج'
    },
    {
      id: 'ch4_e7',
      type: 'fill-in-the-blank',
      questionText: { ar: '7- اذكر العناصر الأربعة المكونة للمنهج الدراسي الحديث.', en: 'E7' },
      correctAnswer: '- الأهداف\n- المحتويات المعرفية\n- الطرق والأنشطة\n- التقويم'
    },
    {
      id: 'ch4_e8',
      type: 'fill-in-the-blank',
      questionText: { ar: '8- اذكر أهم تطبيقات الشبكات الاجتماعية المستخدمة في التعليم.', en: 'E8' },
      correctAnswer: '- الفيس بوك ( facebook )\n- تويتر ( Twitter )'
    },
    {
      id: 'ch4_e9',
      type: 'fill-in-the-blank',
      questionText: { ar: '9- اذكر ثلاث من متطلبات توظيف الهواتف الذكية في التعليم', en: 'E9' },
      correctAnswer: '- توفير الدعم المالي والميزانيات اللازمة\n- تدريب الكوادر البشرية المشاركة في التوظيف\n- توفير البنية التحتية اللازمة'
    },
    {
      id: 'ch4_fill5',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 5- يُنظر للمنهج بمفهومه ........ على أنه المادة الدراسية المقررة في الكتب والتي يطالب المتعلم بحفظها', en: 'Fill5' },
      correctAnswer: '(القديم)'
    },
    {
      id: 'ch4_fill6',
      type: 'fill-in-the-blank',
      questionText: { ar: 'أكمل العبارة التالية: 6- يُستخدم تطبيق ........ في رفع وعرض المواد التعليمية المتخصصة وتكوين مجتمع تفاعلي.', en: 'Fill6' },
      correctAnswer: '(YouTube)'
    }
];

export const SMARTPHONE_APPS_OBJECTIVE_EXAM: Exam = {
  id: 'smartphone_apps_objective',
  subjectId: 'smartphone_apps',
  title: { ar: 'اختبار الأسئلة الموضوعية (صح وخطأ واختيار من متعدد)', en: 'Objective Questions Exam (MCQ & T/F)' },
  active: true,
  thumbnail: '✅',
  questions: ALL_QUESTIONS.filter(q => q.type === 'true-false' || q.type === 'multiple-choice')
};

export const SMARTPHONE_APPS_ESSAY_EXAM: Exam = {
  id: 'smartphone_apps_essay',
  subjectId: 'smartphone_apps',
  title: { ar: 'اختبار الأسئلة المقالية وأكمل العبارات', en: 'Essay & Fill-in-the-Blank Exam' },
  active: true,
  thumbnail: '✍️',
  questions: ALL_QUESTIONS.filter(q => q.type === 'fill-in-the-blank')
};

export const SMARTPHONE_APPS_EXAM: Exam = {
  id: 'smartphone_apps_exam_full',
  subjectId: 'smartphone_apps',
  title: { ar: 'بنك الأسئلة الشامل (جميع الأسئلة)', en: 'Full Question Bank (All Questions)' },
  active: true,
  thumbnail: '📱',
  questions: ALL_QUESTIONS
};

// Backwards compatibility alias
export const ELECTRONIC_EXAMS_MCQ = SMARTPHONE_APPS_OBJECTIVE_EXAM;
export const ELECTRONIC_EXAMS_ESSAY = SMARTPHONE_APPS_ESSAY_EXAM;

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
