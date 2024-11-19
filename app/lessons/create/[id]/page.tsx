"use client";
import { useParams } from "next/navigation";
import s from "./page.module.scss";
import { useState } from "react";
import axios from "axios";

export default function Page() {
  const params = useParams();


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    
    if (media) {
      formData.append("media", media);
    }

    try {
      const response = await axios.post(
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
      location.replace("/cours/" + params.id)
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

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
              <input value={title} onChange={(e)=>setTitle(e.target.value)} className={s.form__input} type="text" />
            </div>
            <div>
              <h2 className={s.form__text}>Описание</h2>
              <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} className={s.form__textarea} name="" id=""></textarea>
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
          <button onClick={()=>handleSubmit()} className={s.end__but}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}
