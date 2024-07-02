## فهرست مطالب

- [اجزای پروژه](#اجزای-پروژه)
- [تمایز نسبت به ابزارهای مشابه](#تمایز-نسبت-به-ابزارهای-مشابه)
- [استفاده](#استفاده)

## اجزای پروژه

- اسکریپت `fetch` برای تبدیل لینک‌های اینکد شده بیس۶۴ و تولید کافیگ‌های vmess-vless-ss-trojan به همراه پشتیبانی از tls-reality و پشتیبانی از tcp-grpc-h2-ws
- اسکریپت `check` برای بررسی هر کانفیگ و اضافه کردن کد کشور به نام هر کانفیگ سالم
- اسکریپت `base64` برای تبدیل دوباره‌ی هر کانفیگ به فرم پروکسی و بیس۶۴
- اسکریپت `custom` جهت اضافه کردن فرگمنت به فایل کانفیگ و تست اتصال و ساخت یک کانفیگ کاستوم با تمام اوت‌باندهای موجود
- اکشن گیت‌هاب جهت اجرای ساعتی اسکریپت‌ها
- ورکر جهت سازماندهی و دسترسی آسان‌تر پروکسی‌های شخصی و عمومی

## تمایز نسبت به ابزارهای مشابه

- خروجی هر پروکسی به صورت فایل json برای استفاده‌ی مستقیم در هسته‌ی xray
- تست هر فایل به صورت مجزا با هسته‌ی [xray](https://xtls.github.io/en/config)
- بای‌پس کردن سایت‌های ایرانی در هر کافیگ با استفاده از [iran-hosted-domains](https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat)

## استفاده

**همه** `تغییر هر ساعت`<br>
فرم بیس‌۶۴
```
https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/base64/mix
```

**بالانسر**<br>
به فرم کاستوم کانفیگ قابل استفاده در [v2rayNG](https://github.com/2dust/v2rayNG)
```
https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-balancer.json
```

**فرگمنت**<br>
به فرم کاستوم کانفیگ‌های قابل استفاده در [v2rayNG](https://github.com/2dust/v2rayNG)
```
https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/json/custom/mix-fragment.json
```

**ورکر**

- ساخت ورکر جدید در کلادفلر
- افزودن وریبل جدید با نام `UUID` و مقداردهی به آن در بخش اینوایرمنت‌وریبل در ستینگ ورکر [(اختیاری)](https://www.uuidgenerator.net)
- ویرایش کد ورکر با محتویات فایل زیر
- ویرایش بخش مربوط به پروکسی‌ها در انتهای فایل ورکر طبق نیاز شخصی

```
https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/cloudflare/worker.js
```
