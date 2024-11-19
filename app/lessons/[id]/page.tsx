"use client";

import { useParams } from "next/navigation";
import s from "./page.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Page() {
  const url = "http://localhost:5002/api/lesson/8";
  const params = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const getLesson = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5002/api/lesson/" + params.id
      );

      console.log("Course created:", data);
      setTitle(data.title);
      setContent(data.content);
      setLesson(data);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
  const deleteCard = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5002/api/lesson/" + params.id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Замените на ваш токен
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Course created:", response.data);
      location.replace("/cours/" + lesson.courseId);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    
    if (media) {
      formData.append("media", media);
    }

    try {
      const response = await axios.patch(
        "http://localhost:5002/api/lesson/" + params.id, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Course created:", response.data);
      location.replace("/cours/" + lesson.courseId);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  useEffect(() => {
    getLesson();
  }, []);

  console.log(params.id);
  return (
    <div className={s.main}>
      <div className={s.main__block1}>
        <h1 className={s.block1__title}>Урок</h1>
      </div>
      <div className={s.main__block2}>
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
        <div className={s.end}>
          <button onClick={(e) => deleteCard()} className={s.end__del}>
            Удалить
          </button>
          <button onClick={()=>handleSubmit()} className={s.end__but}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}
