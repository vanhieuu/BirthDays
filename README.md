# Birthday Pages

Microsite chuc mung sinh nhat duoc deploy bang GitHub Pages.

## Chinh sua noi dung

Mo file `script.js` va cap nhat cac truong trong `birthdayConfig`:

- `recipientName`: ten nguoi nhan
- `fromName`: ten cua ban
- `birthdayDate`: ngay sinh theo dinh dang `YYYY-MM-DD`
- `heroLead`, `heroNote`, `storyIntro`, `finalTitle`, `finalCopy`
- `wishes`, `moments`, `gifts`, `letterTitle`, `letterBody`

## Chay local

Day la static site, co the preview bang bat ky server don gian nao, vi du:

```bash
python3 -m http.server 4173
```

Sau do mo `http://localhost:4173`.

## Deploy

Repo nay duoc publish truc tiep tu nhanh `main` va thu muc goc `/` bang GitHub Pages.
