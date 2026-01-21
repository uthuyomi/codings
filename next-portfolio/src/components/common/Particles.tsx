"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles"; // 全オプションを読み込み

export default function Particle() {
  // パーティクル初期化（内部エンジン読み込み）
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine); // ここを削除すると、一部オプションが反映されなくなる
  }, []);

  // パーティクル全体設定
  const meshOptions = {
    // 背景設定
    background: {
      color: "#0f172a", // 背景色。#000で完全な黒、#fffで白。グラデも可
    },
    fpsLimit: 60, // FPS制限。高くすると滑らかだがCPU負荷増大

    // マウスなどとのインタラクション設定
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        // ← マウスホバー時の反応。modeを"grab"や"bubble"に変更可
      },
      modes: {
        repulse: { distance: 100 },
        // ← "repulse"モードの反発距離。値を大きくするとより遠くまで反応
      },
    },

    // パーティクルの基本挙動
    particles: {
      // パーティクル（粒）の色
      color: { value: "#ffffff" }, // 色指定。"#38bdf8"などに変更で雰囲気変化

      // 粒同士のリンク線設定
      links: {
        enable: true, // falseで線を非表示
        color: "#38bdf8", // 線の色
        distance: 140, // 線がつながる最大距離。大きくすると網目が密に
        opacity: 0.4, // 線の透明度。0〜1
        width: 1, // 線の太さ。太くするとメッシュ感が増す
      },

      // パーティクルの動き設定
      move: {
        enable: true, // falseで静止
        speed: 1, // 移動速度。数値を上げると流れるように動く
      },

      // 粒の数と密度
      number: {
        value: 10, // 粒の総数。上げると密度が増す（負荷も増える）
        density: {
          enable: true,
          area: 400, // 単位面積あたりの密度。数値を下げるとより集中配置
        },
      },

      // 粒のサイズ
      size: {
        value: 2, // 粒の大きさ。大きくすると視認性アップ
      },
    },

    detectRetina: true, // 高DPIディスプレイで解像度補正を有効化
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={meshOptions}
      className="fixed z-10" // Tailwindクラス。z-indexや位置を調整可能
    />
  );
}
