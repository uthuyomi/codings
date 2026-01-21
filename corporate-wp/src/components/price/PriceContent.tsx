"use client";

import { TableRow, TableGroup, WPPricePage } from "@/types/priceAcf";
import { PriceProps } from "@/types/priceAcf";
import { useEffect, useState } from "react";
import style from "../price/Price.module.scss";
import { fetchCustomType } from "@/lib/api";


export default function PriceContent({ acf }:PriceProps) {
  const [posts, setPosts] = useState<WPPricePage[]>([]);
  

  // 価格表（CPT）を取得
  useEffect(() => {
    fetchCustomType("price_page")
      .then(setPosts)
      .then((err) => console.error("スキルセット取得エラー", err));
  }, []);

  return (
    <>
      <div className={style.price}>
        <h3>{acf.heading}</h3>
        <p>{ acf.text}</p>
        <div>
          {posts.map((post) => {
            let tables: TableGroup[] = [];
            try {
              const raw = post.acf.price_acf_table_json || "[]";
              const cleaned = raw.replace(/[“”]/g, '"');
              tables = JSON.parse(cleaned);
            } catch (e) {
              console.warn(`JSON parse error on post ${post.id}`);
              return null;
            }
            return (
              <div key={post.id} className={style.priceItem}>
                {tables.map((table, tableIndex) => (
                  <div key={tableIndex} className={style.priceTable}>
                    <table>
                      <caption className={style.priceTableTitle}>
                        {table.heading}
                      </caption>
                      <thead>
                        <tr>
                          {table.rows[0].title && <th>内容</th>}
                          {table.rows[0].range && <th>サイズ</th>}
                          <th>日数</th>
                          <th>価格</th>
                          {table.rows[0].note && <th>備考</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, i) => (
                          <tr key={i}>
                            {row.title && <td>{row.title}</td>}
                            {row.range && <td>{row.range}</td>}
                            <td>{row.duration}</td>
                            <td>{row.price}</td>
                            {row.note && <td>{row.note}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
