"use client";
import Link from "next/link";
import s from "./page.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

    type Card ={
        banner: string | null;
        media: string | null;
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
    }
export default function Page() { 
    
  const [card, setCard] = useState<Card[]>([]);

  const getCard = async () => {
    try {
      const { data } = await axios.get("http://localhost:5002/api/course");
      setCard(data.reverse());
    } catch (e) {
        console.log(e)
        setCard([])
    }
  };

  useEffect(()=>{
    getCard()
  },[])


  return (
    <div className={s.main}>
      <div className={s.main__block1}>
        <h1 className={s.block1__title}>Курсы</h1>
      </div>
      <div className={s.main__block2}>
        <div className={s.block2__content}>
          <Link href="/cours/create" className={s.block2__but}>
            Создать курс
          </Link>
        </div>
        <div className={s.list}>
          {card.map((i, index) => (
            <Link key={index} href={"/cours/" + i.id} className={s.list__item}>
              <div className={s.item__block}>
                <h3 className={s.item__title}>{i.title}</h3>
                <p className={s.item__text}>
                 {i.description}
                </p>
              </div>
              {
                i.banner ? <img className={s.item__img} src={"http://localhost:5002/static/" + i.banner + ".jpg"} alt="" />
                : <div className={s.item__img}></div>
              }
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

