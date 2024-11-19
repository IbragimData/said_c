"use client";
import { useEffect, useState } from "react";
import s from "./id.module.scss";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
type Card = {
  banner: string | null;
  media: string | null;
  id: number;
  title: string;
  description: string | null;
  createdAt: Date;
};
type Lesson = {
    id: number;
    title: string;
    media: string | null;
    content: string;
    courseId: number;
}
export default function Page() {
    const params = useParams();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [banner, setBanner] = useState<File | null>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [lesson, setLesson] = useState<Lesson[]>([]);
  const [card, setCard] = useState<Card | null>(null);
  const getCard = async () => {
    try {
      const { data } = await axios.get("http://localhost:5002/api/course/" + params.id);
      setTitle(data.title)
      setDescription(data.description)

      setCard(data.reverse());
    } catch (e) {
      console.log(e);
      setCard(null);
    }
  };
  const getLesson = async () => {
    try {
      const { data } = await axios.get("http://localhost:5002/api/course/lesson/" + params.id);
      setLesson(data.reverse());
    } catch (e) {
      setCard(null);
    }
  };

  const deleteCard = async ()=>{
    try {
        const response = await axios.delete(
          "http://localhost:5002/api/course/" + params.id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Замените на ваш токен
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Course created:", response.data);
        location.replace("/cours")
      } catch (error) {
        console.error("Error creating course:", error);
      }
  }

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    if (banner) {
      formData.append("banner", banner);
    }
    if (media) {
      formData.append("media", media);
    }

    try {
      const response = await axios.patch(
        "http://localhost:5002/api/course/" + params.id, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Замените на ваш токен
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Course created:", response.data);
      location.replace("/cours")
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  useEffect(() => {
    getCard();
    getLesson()
  }, []);
  console.log(params.id);
  return (
    <div className={s.main}>
      <div className={s.main__block1}>
        <h1 className={s.block1__title}>Курсы</h1>
      </div>
      <div className={s.main__block2}>
      <label htmlFor="banner" className={s.block2__content}>
          <input
            style={{ display: "none" }}
            type="file"
            id="banner"
            accept="image/*"
            onChange={(e) => setBanner(e.target.files?.[0] || null)}
          />
          <img className={s.block2__image} src="/image/box.svg" alt="" />
        </label>
        <div className={s.main__form}>
          <div className={s.form__block1}>
            <div className={s.form__box}>
              <h2 className={s.form__text}>Название</h2>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={s.form__input}
                type="text"
              />
            </div>
            <div>
              <h2 className={s.form__text}>Описание</h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={s.form__textarea}
                name=""
                id=""
              ></textarea>
            </div>
          </div>
          <label htmlFor="media" className={s.block2__content}>
            <input
              style={{ display: "none" }}
              type="file"
              id="media"
              accept="image/*"
              onChange={(e) => setMedia(e.target.files?.[0] || null)}
            />
            <img className={s.block2__image} src="/image/box.svg" alt="" />
          </label>
        </div>
        <div className={s.lessons}>
            {
                lesson.map((i)=>(
                    <Link key={i.id} href={"/lessons/" + i.id} className={s.lessons__item}>{i.title}</Link>
                ))
            }
        </div>
        <div style={{display: "flex", width: "100%"}}>
          <Link href={"/lessons/create/" + params.id} className={s.end__but}>Создать урок</Link>
        </div>
        <div className={s.end}>
          <button onClick={()=>deleteCard()} className={s.end__del}>Удалить</button>
          <button onClick={()=>handleSubmit()} className={s.end__but}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}
