# Odak — Görev Takip

Tarayıcıda çalışan, Türkçe bir görev takip uygulaması. Görev ekleme, listeleme, düzenleme, durum değiştirme ve silme işlemlerini destekler. Veriler aynı tarayıcının LocalStorage alanında saklanır; hesap veya sunucu gerekmez.

**Canlı uygulama:** https://kucukenes17.github.io/gorev-takip-uygulamasi/

Netlify kopyası: https://odak-gorev-takip-kucukenes17.netlify.app/

## Teknolojiler

- React ve Vite
- JavaScript
- Düz CSS
- LocalStorage

## Yerel çalıştırma

Node.js ve npm kurulu olmalıdır.

```bash
npm install
npm run dev
```

Terminalde gösterilen yerel adresi tarayıcıda açın. Üretim derlemesini kontrol etmek için:

```bash
npm run build
npm run preview
```

## Kullanım

1. Başlık ve isteğe bağlı açıklama yazarak **Görev ekle** düğmesine basın.
2. Görevlerinizi listede ve durum sekmelerinde görüntüleyin.
3. Onay kutusuyla görev durumunu değiştirin; kalem simgesiyle başlık veya açıklamayı düzenleyin.
4. Çarpı simgesiyle görevi, onay verdikten sonra silin.

Veriler yalnızca kullanılan tarayıcıda tutulur. Tarayıcı verileri temizlenirse görevler de silinir; farklı cihazlar arasında eşitlenmez.

## Yayınlama

Ana yayın GitHub Pages üzerindedir. `main` dalına gönderilen değişiklikler GitHub Actions ile otomatik derlenip yayımlanır. Uygulama Netlify'da `odak-gorev-takip-kucukenes17` projesi olarak da yayımlanmıştır. `netlify.toml` derleme komutunu (`npm run build`) ve yayın dizinini (`dist`) tanımlar. Netlify kopyası otomatik dağıtıma bağlı değildir; yeni sürüm için Netlify CLI ile `netlify deploy --prod --dir dist` komutunu çalıştırın.

## Ekran görüntüsü

![Odak görev takip uygulaması](screenshots/odak-gorev-takip.png)
