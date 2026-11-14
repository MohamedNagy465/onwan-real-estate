
export const SITE = {
  name: "عنوان العقارية",

  description:
    "نسوّق العقارات في المملكة العربية السعودية، ونساعدك على إيجاد العقار المناسب بثقة ووضوح.",

  // بيانات التواصل
  phone: "+966546844503",
  whatsapp: "966546844503",
  email: "info@example.com",

  address: "الرياض، المملكة العربية السعودية",

  currency: "ر.س",

  falLicense: "",

  // روابط السوشيال ميديا
  social: [
    { name: "فيسبوك", href: "https://facebook.com/your-page" },
    { name: "إنستجرام", href: "https://instagram.com/your-page" },
    { name: "إكس", href: "https://x.com/your-page" },
    { name: "سناب شات", href: "https://snapchat.com/add/your-page" },
    { name: "تيك توك", href: "https://tiktok.com/@your-page" },
    { name: "لينكدإن", href: "https://linkedin.com/company/your-page" },
  ],
};

// Format prices using Saudi Arabic locale.
export function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) return "السعر غير متاح";

  return `${price.toLocaleString("ar-SA")} ${SITE.currency}`;
}

// Generate WhatsApp URL.
export function whatsappLink(message = "") {
  const number = SITE.whatsapp.replace(/\D/g, "");

  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Generate phone URL.
export function phoneLink() {
  const number = SITE.phone.replace(/[^\d+]/g, "");

  if (!number) return null;

  return `tel:${number}`;
}
