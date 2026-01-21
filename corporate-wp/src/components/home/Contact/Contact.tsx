import React from 'react'
import style from '@/components/home/Contact/Contact.module.scss'
import { ContactProps } from '@/types/homeAcf'

const Contact = ({ acf }: ContactProps) => {
  return (
      <div className={style.Contact}>
          <h2>{acf.contact_heading}</h2>
          <form>
              <label>お名前</label>
              <input type="text" />
              <label>おなまえ</label>
              <input type="text" />
              <label>メールアドレス</label>
              <input type="text" />
              <label>お問い合わせ内容</label>
              <textarea name="" id=""></textarea>
              <button>送信</button>
          </form>
      </div>
  )
}

export default Contact