// 汎用 fetch 関数（ページID指定）
export async function fetchPage(id: number) {
  const url = `https://webyayasu.sakura.ne.jp/webyayasu-next/wp-json/wp/v2/pages/${id}?acf_format=standard`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("ページデータの取得に失敗しました");

  return res.json();
}

// 汎用 fetch 関数（カスタム投稿タイプ指定）
export async function fetchCustomType(type: string) {
  const url = `https://webyayasu.sakura.ne.jp/webyayasu-next/wp-json/wp/v2/${type}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`"${type}" データの取得に失敗しました`);

  return res.json();
}
