import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "入力不足です" }, { status: 400 });
  }

  try {
    // 自分宛（通知メール）
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // 無料でもこの形式OK
      to: process.env.MAIL_USER!,
      subject: `【お問い合わせ】${name}さんより`,
      text: `
【お名前】${name}
【メール】${email}
【メッセージ】
${message}
      `,
    });

    // 相手宛（サンクスメール）
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "お問い合わせありがとうございます",
      text: `
${name} 様

このたびはお問い合わせいただきありがとうございます。
以下の内容で受け付けました。

---------------------------------
【お名前】${name}
【メール】${email}
【メッセージ】
${message}
---------------------------------

通常2〜3営業日以内にご連絡させていただきます。
このメールは自動送信です。返信の必要はありません。
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
