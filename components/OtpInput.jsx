
import React, { useEffect, useRef } from 'react'
export default function OtpInput({ value, onChange }){
  const refs = Array.from({length:6}, ()=> useRef(null))
  useEffect(()=>{ refs[0].current?.focus() }, [])
  const handle = (i, e)=>{
    const v = e.target.value.replace(/\D/g,'').slice(0,1)
    const next = value.split('')
    next[i] = v
    onChange(next.join(''))
    if(v && i<5) refs[i+1].current?.focus()
    if(e.key==='ArrowLeft' && i>0) refs[i-1].current?.focus()
    if(e.key==='ArrowRight' && i<5) refs[i+1].current?.focus()
    if(e.key==='Backspace' && !v && i>0) refs[i-1].current?.focus()
  }
  const onPaste = (e)=>{ const text = e.clipboardData.getData('text').replace(/\D/g,'').slice(0,6); onChange(text) }
  return (
    <div className="flex items-center gap-2">
      {Array.from({length:6}).map((_,i)=> (
        <input key={i} ref={refs[i]} inputMode="numeric" className="w-10 h-12 text-center border border-gray-300 rounded" value={value[i]||''} onKeyDown={(e)=>handle(i,e)} onChange={(e)=>handle(i,e)} onPaste={onPaste} />
      ))}
    </div>
  )
}
