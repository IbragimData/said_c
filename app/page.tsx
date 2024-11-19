import Link from 'next/link'
import s from './page.module.scss'

export default function Home() {
  return (
    <div className={s.main}>
        <div className={s.main__block1}>
          <h1 className={s.block1__title}>Главная</h1>
        </div>
        <div className={s.main__block2}>
          <div className={s.block}>
            <Link href="/cours" className={s.block__title}> 
              <h2 className={s.block__text}>Курсы</h2>
              <img src="./image/arrow.svg" alt="" />
            </Link>
            <div className={s.list}>
              <Link href="cours" className={s.item}>
                <h3 className={s.item__title}>Название курса</h3>
                <p className={s.item__text}>Название курса Название курса Название курса Название курса Название курсаНазвание курса Название курса Название курса Название курса Название курса Название курса Название курса Название</p>
              </Link>
              <Link href="cours" className={s.item}>
                <h3 className={s.item__title}>Название курса</h3>
                <p className={s.item__text}>Название курса Название курса Название курса Название курса Название курсаНазвание курса Название курса Название курса Название курса Название курса Название курса Название курса Название</p>
              </Link>
              <Link href="cours" className={s.item}>
                <h3 className={s.item__title}>Название курса</h3>
                <p className={s.item__text}>Название курса Название курса Название курса Название курса Название курсаНазвание курса Название курса Название курса Название курса Название курса Название курса Название курса Название</p>
              </Link>
              <Link href="cours" className={s.item}>
                <h3 className={s.item__title}>Название курса</h3>
                <p className={s.item__text}>Название курса Название курса Название курса Название курса Название курсаНазвание курса Название курса Название курса Название курса Название курса Название курса Название курса Название</p>
              </Link>
              <Link href="cours" className={s.item}>
                <h3 className={s.item__title}>Название курса</h3>
                <p className={s.item__text}>Название курса Название курса Название курса Название курса Название курсаНазвание курса Название курса Название курса Название курса Название курса Название курса Название курса Название</p>
              </Link>
              <Link href="cours" className={s.item}>
                <h3 className={s.item__title}>Название курса</h3>
                <p className={s.item__text}>Название курса Название курса Название курса Название курса Название курсаНазвание курса Название курса Название курса Название курса Название курса Название курса Название курса Название</p>
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}
