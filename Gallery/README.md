## 🎨 React ポートフォリオサイト README

### 📝 概要

このプロジェクトは、React.js と module.scss を使用して構築したポートフォリオサイトです。
デザインデータをもとに、静的LPやWordPress連携サイトなど複数の制作実績を一元的に閲覧できる構成としています。

### 🧩 使用技術

* **React.js** — コンポーネント構成によるモジュール化と再利用性の確保。
* **module.scss** — コンポーネント単位でのスコープ付きスタイル管理。

### 📂 ディレクトリ構成（主要部分）

```
src/
├── index.css  
├── index.js  
├── Main.js  
├── siteData.json  
├── ThemeContext.js  

├── assets/  
│   ├── bottom-arrow.png  
│   ├── pc-back.png  
│   ├── sp-back.png  
│   ├── top.jpg  
│   ├── button/  
│   │   ├── button-dark.png  
│   │   └── button-light.png  
│   └── gallery-img/  
│       ├── inner-img00-pc.png ～ inner-img08-sp.png  

├── Footer/  
│   └── Footer.js  

├── Gallery/  
│   ├── Gallery.js  
│   ├── GalleryList.js  
│   ├── GalleryListItem.js  
│   ├── GalleryListItemImg.js  
│   └── GalleryListText.js  

├── Hero/  
│   ├── Header.js  
│   ├── Hero.js  
│   ├── Nav.js  
│   ├── Visual.js  
│   └── Visual/  
│       └── VisualHeading.js  

├── hooks/  
│   └── useScrollTrigger.js  

└── scss/  
    ├── Footer/Footer.module.scss  
    ├── Gallery/Gallery.module.scss  
    └── hero/Hero.module.scss  
```

### 💡 構成意図

* **Gallery/** ：ポートフォリオ作品群の一覧表示とアニメーション制御を担当。
* **Hero/** ：サイト上部のメインビジュアル・ナビゲーション領域。
* **scss/** ：各セクションごとのモジュール化スタイル管理。
* **assets/** ：LP画像、ボタン、背景素材を格納。
* **hooks/** ：React のカスタムフックとしてスクロール連動アニメーションを制御。

### 🚀 実行方法

```bash
npm install
npm start
```

ブラウザで `http://localhost:3000` を開くとローカル環境で動作確認できます。

### 🌐 デプロイ

Vercel や GitHub Pages など静的ホスティングに対応しています。
