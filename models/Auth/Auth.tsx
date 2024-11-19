'use client'
import { useState } from 'react'
import s from './Auth.module.scss'
import axios from 'axios'


export function Auth (){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = async ()=>{
        try{
            const res = await axios.post("http://localhost:5002/api/auth/login", {password, email})
            localStorage.setItem("token", res.data.token)
            location.reload()
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div className={s.page}>
            <h2 className={s.page__title}>Войти</h2>
            <input value={email} onChange={e=>setEmail(e.target.value)} className={s.page__input} type="text" />
            <input value={password} onChange={e=>setPassword(e.target.value)} className={s.page__input} type="password" />
            <button onClick={()=>onSubmit()} className={s.page__but}>Войти</button>
        </div>  
    )
}