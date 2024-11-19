"use client";
import Link from "next/link";
import s from "./page.module.scss";
import { useState } from "react";
import axios from "axios";
export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [media, setMedia] = useState<File | null>(null);

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
      const response = await axios.post(
        "http://localhost:5002/api/course", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        <div className={s.end}>
          <button onClick={()=>handleSubmit()} className={s.end__but}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}
