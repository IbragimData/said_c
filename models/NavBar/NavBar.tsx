import Link from "next/link"
import s from "./NavBar.module.scss"
export function NavBar() {
    return (
        <div className={s.main}> 
            <div className={s.main__navbar}>
                <Link href="/" className={s.navbar}>
                    <img src="/image/home.svg" alt="" />
                    <p className={s.navbar__text}>Главная</p>
                </Link>
                <Link href="/cours" className={s.navbar}>
                    <img src="/image/cours.svg" alt="" />
                    <p className={s.navbar__text}>Курсы</p>
                </Link>
            </div>
            <div onClick={()=>{
                localStorage.setItem("token", "")
                location.reload()
            }} className={s.main__out}>
                <img src="/image/out.svg" alt="" />
                <p className={s.out__text}>выйти</p>
            </div>
        </div>
    );
}