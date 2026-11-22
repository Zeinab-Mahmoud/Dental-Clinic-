# موقع عيادة رانيا لطب الأسنان (HTML / CSS / JS فقط)

صفحتان: `index.html` (الرئيسية) و `appointments.html` (المواعيد المتاحة). من غير أي مكتبات أو npm.

## التشغيل
افتحي `index.html` بالمتصفح مباشرة. (محتاج إنترنت بس لتحميل خط Cairo.)
للنشر: ارفعي كل الملفات كما هي على أي استضافة (GitHub Pages / Netlify ...).

## الملفات
- `js/clinicConfig.js` ← **كل بيانات العيادة هنا**
- `js/main.js` ← بيبني الصفحات من البيانات
- `styles.css` ← التصميم والألوان (المتغيرات في أول الملف)
- `assets/logo.png` ← الشعار

## التعديل (في `js/clinicConfig.js`)
| عايزة تغيّري إيه؟ | المكان |
|---|---|
| اسم الطبيبة والنبذة وصورتها | `dentist` (الصورة: `photo: 'assets/doctor.jpg'`) |
| اسم العيادة | `clinicName` و `tagline` |
| الخدمات | `services` — `icon` و `title` و `description` |
| الهاتف والعنوان | `contact.phone` و `contact.address` |
| **رقم الواتساب** | `contact.whatsappNumber` (دولي بدون +، مثل `201012345678`) |
| أيام العمل وساعاتها | `appointments.days` ← `day` و `open` و `close` |
| المواعيد المتاحة | `slots: ['10:00 ص', '12:00 م']` داخل اليوم |
| يوم إجازة | `{ day: 'الجمعة', closed: true }` |

أي نص بين `[ ]` مكان مؤقت لازم يتبدل.
