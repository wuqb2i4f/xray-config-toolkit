## فهرست مطالب

- [اجزای پروژه](#%D8%A7%D8%AC%D8%B2%D8%A7%DB%8C-%D9%BE%D8%B1%D9%88%DA%98%D9%87)
- [تمایز با پروژه‌های مشابه](#%D8%AA%D9%85%D8%A7%DB%8C%D8%B2-%D8%A8%D8%A7-%D9%BE%D8%B1%D9%88%DA%98%D9%87%E2%80%8C%D9%87%D8%A7%DB%8C-%D9%85%D8%B4%D8%A7%D8%A8%D9%87)
- [استفاده](#%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87)
- [مجوز](#%D9%85%D8%AC%D9%88%D8%B2)

## اجزای پروژه

- اسکریپت `fetch` برای تبدیل لینک‌های اینکد شده بیس۶۴ و تولید کافیگ‌های `vmess-vless-ss-trojan` همراه پشتیبانی از `tls-reality` و پشتیبانی از `tcp-grpc-h2-ws`
- اسکریپت `check` برای بررسی هر کانفیگ و حذف موارد مشکل‌دار و اضافه کردن کد کشور به نام هر کانفیگ
- اسکریپت `base64` برای تبدیل دوباره‌ی هر کانفیگ به فرم پروکسی و بیس۶۴
- اکشن گیت‌هاب بری اجرای به ترتیب اسکریپت‌ها در هر روز

## تمایز با پروژه‌های مشابه

- خروجی هر پروکسی به صورت فایل `json` برای استفاده‌ی مستقیم در هسته‌ی `xray`
- تست هر فایل به صورت مجزا با هسته‌ی `xray`
- بای‌پس کردن سایت‌های ایرانی در هر کافیگ با استفاده از پروژه‌ی [iran-hosted-domains](https://github.com/bootmortis/iran-hosted-domains)

## استفاده

<table>
  <thead>
    <tr>
      <th>نوع پیکربندی</th>
      <th>اشتراک عادی</th>
      <th>اشتراک به صورت BASE64</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ترکیبی از همه</td>
      <td>
        <a href="https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/mix">اشتراک عادی</a>
      </td>
      <td>
        <a href="https://raw.githubusercontent.com/wuqb2i4f/xray-config-toolkit/main/output/mix_base64">اشتراک به صورت BASE64</a>
      </td>
    </tr>
  </tbody>
</table>

## مجوز

این پروژه تحت مجوز عمومی GNU (GPL) منتشر شده است.
