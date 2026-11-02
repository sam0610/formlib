# formlib 表格範本庫

公司 PDF 表格範本庫（可填表單）。網址：https://sam0610.github.io/formlib/

## 管理員
- 開啟網址，輸入管理員密碼即可上載、編輯、發佈範本。
- 首次使用：頁面會要求貼上 GitHub fine-grained token（只限此 repo，Contents: Read and write）並設定密碼。token 以密碼加密後存於 `data/auth.json`。
- 每份範本保留最新版加最近 2 個舊版本；大型掃描件發佈時自動壓縮。

## 給其他 APP 讀取範本（唯讀，免登入）
1. 讀 `https://sam0610.github.io/formlib/data/index.json`（陣列）。
2. 篩選 `active === true && draft === false`；`tid` 為範本的穩定 id（改名、轉部門、更新版本都不變），請用 `tid` 引用範本。
3. 最新版 PDF：`https://sam0610.github.io/formlib/` + `file_path`。縮圖：`thumb_path`。
4. 發佈後 GitHub Pages 約 1–10 分鐘才更新。

欄位：`tid, name, category, version, note, by, field_count, file_path, thumb_path, created_at`。
