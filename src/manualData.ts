export interface ManualItem {
  id: string;
  title: { tr: string; en: string };
  content: { tr: string; en: string };
  category: { tr: string; en: string };
}

export const USER_MANUAL: ManualItem[] = [
  { 
    id: '1', 
    category: { tr: 'Genel', en: 'General' }, 
    title: { tr: 'Uygulama Nedir?', en: 'What is the App?' }, 
    content: { 
      tr: 'Bu uygulama, seyrettiğiniz veya seyretmeyi planladığınız film ve dizileri takip etmenizi sağlayan kişisel bir arşiv sistemidir. Modern arayüzü ve akıllı özellikleriyle film tutkunları için tasarlanmıştır.',
      en: 'This app is a personal archive system that allows you to track movies and series you have watched or plan to watch. It is designed for movie enthusiasts with its modern interface and smart features.'
    } 
  },
  { 
    id: '2', 
    category: { tr: 'Genel', en: 'General' }, 
    title: { tr: 'Giriş ve Güvenlik', en: 'Login and Security' }, 
    content: { 
      tr: 'Uygulamaya e-posta ve şifrenizle giriş yapabilirsiniz. "Beni Hatırla" seçeneği ile her seferinde şifre girmekten kurtulabilirsiniz. Şifrenizi unutursanız "Şifremi Unuttum" butonuyla yardım alabilirsiniz.',
      en: 'You can log in to the app with your email and password. With the "Remember Me" option, you can avoid entering your password every time. If you forget your password, you can get help with the "Forgot Password" button.'
    } 
  },
  { 
    id: '3', 
    category: { tr: 'Genel', en: 'General' }, 
    title: { tr: 'Dashboard Kullanımı', en: 'Dashboard Usage' }, 
    content: { 
      tr: 'Dashboard, arşivinizin kalbidir. Toplam kayıt sayısı, seyredilenler, yaklaşan vizyonlar ve son aktiviteleriniz burada görselleştirilir. Kutucuklara tıklayarak film detaylarını görebilir ve düzenleyebilirsiniz.',
      en: 'The dashboard is the heart of your archive. Total record count, watched items, upcoming releases, and your recent activities are visualized here. You can see movie details and edit them by clicking on the boxes.'
    } 
  },
  { 
    id: '4', 
    category: { tr: 'Genel', en: 'General' }, 
    title: { tr: 'Çoklu Dil Desteği (Yeni)', en: 'Multi-Language Support (New)' }, 
    content: { 
      tr: 'Uygulamayı hem Türkçe hem de İngilizce olarak kullanabilirsiniz. Yan menüdeki dil butonuyla anında geçiş yapabilirsiniz.',
      en: 'You can use the app in both Turkish and English. You can switch instantly with the language button in the side menu.'
    } 
  },
  { 
    id: '5', 
    category: { tr: 'Genel', en: 'General' }, 
    title: { tr: 'Tarih Formatı (Yeni)', en: 'Date Format (New)' }, 
    content: { 
      tr: 'Tüm sistemde tarihler "Gün.Ay.Yıl" (Örn: 09.04.2026) formatında gösterilir, bu da takibi kolaylaştırır.',
      en: 'Dates are shown in "Day.Month.Year" (e.g., 09.04.2026) format throughout the system, which makes tracking easier.'
    } 
  },
  
  { 
    id: '6', 
    category: { tr: 'Film İşlemleri', en: 'Movie Operations' }, 
    title: { tr: 'Film veya Dizi İşle (Yeni)', en: 'Process Movie or Series (New)' }, 
    content: { 
      tr: 'Sekme ismi "Film veya Dizi İşle" olarak güncellendi. Seçiminize göre kaydet butonu "Film İşle" veya "Dizi İşle" olarak dinamik değişir.',
      en: 'The tab name has been updated to "Process Movie or Series". Depending on your selection, the save button dynamically changes to "Process Movie" or "Process Series".'
    } 
  },
  { 
    id: '7', 
    category: { tr: 'Film İşlemleri', en: 'Movie Operations' }, 
    title: { tr: 'Başlık Kopyalama (Yeni)', en: 'Title Copying (New)' }, 
    content: { 
      tr: 'Türkçe Adı kısmına yazdığınız ismi, Orijinal Adı yanındaki butona basarak anında kopyalayabilirsiniz.',
      en: 'You can instantly copy the name you wrote in the Turkish Title section by clicking the button next to the Original Title.'
    } 
  },
  { 
    id: '8', 
    category: { tr: 'Film İşlemleri', en: 'Movie Operations' }, 
    title: { tr: 'AI ile Otomatik Getir', en: 'Auto-Fetch with AI' }, 
    content: { 
      tr: 'Film adını yazıp Sparkles (yıldız) ikonuna bastığınızda, Gemini AI film özetini, oyuncuları, IMDb puanını ve fragman linkini otomatik olarak doldurur.',
      en: 'When you type the movie name and click the Sparkles (star) icon, Gemini AI automatically fills in the movie summary, actors, IMDb rating, and trailer link.'
    } 
  },
  { 
    id: '9', 
    category: { tr: 'Film İşlemleri', en: 'Movie Operations' }, 
    title: { tr: 'Manuel AI Ayrıştırıcı (Gelişmiş)', en: 'Manual AI Parser (Advanced)' }, 
    content: { 
      tr: 'Dış AI araçlarından (ChatGPT vb.) aldığınız JSON sonucunu en alttaki alana yapıştırıp "Alanlara Ayrıştır" derseniz tüm form saniyeler içinde dolar. İşlem sonrası alan temizlenir.',
      en: 'If you paste the JSON result you received from external AI tools (ChatGPT, etc.) into the bottom field and click "Parse into Fields", the entire form will be filled in seconds. The field is cleared after the operation.'
    } 
  },
  { 
    id: '10', 
    category: { tr: 'Film İşlemleri', en: 'Movie Operations' }, 
    title: { tr: 'Kiminle Seyrettim? Mantığı (Yeni)', en: 'Who I Watched With? Logic (New)' }, 
    content: { 
      tr: '"Yalnız" seçeneği seçildiğinde diğer kişiler temizlenir. Diğer kişilerden biri seçildiğinde ise "Yalnız" seçeneği otomatik olarak kaldırılır.',
      en: 'When the "Alone" option is selected, other people are cleared. When one of the other people is selected, the "Alone" option is automatically removed.'
    } 
  },
  { 
    id: '11', 
    category: { tr: 'Film İşlemleri', en: 'Movie Operations' }, 
    title: { tr: 'Alan Sıralaması (Yeni)', en: 'Field Ordering (New)' }, 
    content: { 
      tr: 'Form alanları kullanım kolaylığı için; Oyuncular, Kategori, Kiminle Seyrettim, İzleme Tarihi, Puan ve Notlar şeklinde yeniden sıralandı.',
      en: 'Form fields have been reordered for ease of use as; Actors, Category, Who I Watched With, Watch Date, Rating, and Notes.'
    } 
  },
  
  { 
    id: '21', 
    category: { tr: 'Raporlar', en: 'Reports' }, 
    title: { tr: 'Toplu Silme Özelliği (Yeni)', en: 'Bulk Delete Feature (New)' }, 
    content: { 
      tr: 'Raporlar listesinde sol taraftaki kutucuklarla birden fazla kayıt seçip "Seçilenleri Sil" butonuyla toplu temizlik yapabilirsiniz.',
      en: 'In the reports list, you can select multiple records with the checkboxes on the left and perform a bulk cleanup with the "Delete Selected" button.'
    } 
  },
  { 
    id: '22', 
    category: { tr: 'Raporlar', en: 'Reports' }, 
    title: { tr: 'Mükerrer Kayıt Kontrolü (Gelişmiş)', en: 'Duplicate Record Check (Advanced)' }, 
    content: { 
      tr: 'Aynı isimle kaydedilmiş filmleri bulur. Mükerrer listesinde her kaydı ayrı ayrı düzenleyebilir veya silebilirsiniz.',
      en: 'Finds movies saved with the same name. You can edit or delete each record separately in the duplicate list.'
    } 
  },
  { 
    id: '23', 
    category: { tr: 'Raporlar', en: 'Reports' }, 
    title: { tr: 'Gelişmiş Arama ve Filtreleme', en: 'Advanced Search and Filtering' }, 
    content: { 
      tr: 'Hem Türkçe hem de Orijinal ad üzerinden arama yapabilir, "Seyredilenler" veya "Gelecek" olarak filtreleyebilirsiniz.',
      en: 'You can search by both Turkish and Original names, and filter as "Watched" or "Upcoming".'
    } 
  },
  { 
    id: '24', 
    category: { tr: 'Raporlar', en: 'Reports' }, 
    title: { tr: 'Excel ve E-posta Yedekleme', en: 'Excel and Email Backup' }, 
    content: { 
      tr: 'Listenizi Excel olarak indirebilir veya SMTP ayarlarınız yapılıysa e-posta ile kendinize yedek olarak gönderebilirsiniz.',
      en: 'You can download your list as Excel or send it to yourself as a backup via email if your SMTP settings are configured.'
    } 
  },
  
  { 
    id: '31', 
    category: { tr: 'Ayarlar', en: 'Settings' }, 
    title: { tr: 'Kategori ve Arkadaş Yönetimi', en: 'Category and Friend Management' }, 
    content: { 
      tr: 'Kendi film türlerinizi ve izleme arkadaşlarınızı buradan ekleyip çıkarabilirsiniz.',
      en: 'You can add and remove your own movie genres and watching friends from here.'
    } 
  },
  { 
    id: '32', 
    category: { tr: 'Ayarlar', en: 'Settings' }, 
    title: { tr: 'SMTP ve API Ayarları', en: 'SMTP and API Settings' }, 
    content: { 
      tr: 'E-posta gönderimi için SMTP, AI özellikleri için Gemini API anahtarlarınızı buradan güvenle yönetebilirsiniz.',
      en: 'You can safely manage your SMTP settings for email sending and your Gemini API keys for AI features from here.'
    } 
  },
  { 
    id: '33', 
    category: { tr: 'Ayarlar', en: 'Settings' }, 
    title: { tr: 'Veri Yönetimi', en: 'Data Management' }, 
    content: { 
      tr: 'Tüm verilerinizi JSON olarak yedekleyebilir veya örnek veri yükleyerek sistemi test edebilirsiniz.',
      en: 'You can back up all your data as JSON or test the system by loading sample data.'
    } 
  },
  
  { 
    id: '41', 
    category: { tr: 'AI & Teknik', en: 'AI & Technical' }, 
    title: { tr: 'Gemini AI Entegrasyonu', en: 'Gemini AI Integration' }, 
    content: { 
      tr: 'Uygulama, Google Gemini Pro modelini kullanarak film bilgilerini saniyeler içinde getirir.',
      en: 'The app uses the Google Gemini Pro model to fetch movie information in seconds.'
    } 
  },
  { 
    id: '42', 
    category: { tr: 'AI & Teknik', en: 'AI & Technical' }, 
    title: { tr: 'Yedekli API Sistemi', en: 'Redundant API System' }, 
    content: { 
      tr: 'İki farklı API anahtarı girerek kotası dolan anahtar yerine diğerinin otomatik kullanılmasını sağlayabilirsiniz.',
      en: 'By entering two different API keys, you can ensure that the other one is automatically used instead of the key whose quota is full.'
    } 
  },
  { 
    id: '43', 
    category: { tr: 'AI & Teknik', en: 'AI & Technical' }, 
    title: { tr: 'Sistem Debug Kayıtları', en: 'System Debug Logs' }, 
    content: { 
      tr: 'Teknik bir sorun oluştuğunda Ayarlar altındaki debug kayıtlarından hatanın kaynağını görebilirsiniz.',
      en: 'When a technical problem occurs, you can see the source of the error from the debug logs under Settings.'
    } 
  }
];
