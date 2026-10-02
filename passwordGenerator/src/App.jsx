import { useState , useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length , setLength]= useState(8)
  const [characterallowed, setcharacter]= useState(false)
  const [numberallowed , setnumber]=useState(false)
  const [password , setpassword]= useState("")
  const passwordRef= useRef(null)


  const passwordgenerator= useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallowed){
        str+= '123456789'
      }
    if(characterallowed){
        str+='!@#$%^&*()'

      }
    
    for (let i=1 ; i<= length ; i++){
      let ch= Math.floor(Math.random()* str.length+1)
      pass+= str.charAt(ch)

    }
    
    setpassword(pass)
  
    
  }, [length, numberallowed, characterallowed, setpassword])

  const copypassword= useCallback(()=> {

    passwordRef.current?.select();
    window. navigator. clipboard. writeText(password)

  } , [password])

  useEffect(()=>{
    passwordgenerator()
  }, [length, characterallowed, numberallowed, setpassword, passwordgenerator])
  

 return (
  <div className="w-full min-h-screen bg-gray-900 px-4">
    <h1 className="text-3xl font-bold text-center text-blue-400 py-5 font-mono">
      Password Generator
    </h1>

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 bg-gray-800 text-white">
      <div className="flex rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 bg-white text-gray-900"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copypassword}
          className="outline-none bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 shrink-0"
        >
          copy
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center text-sm gap-x-4 gap-y-2">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label className="text-white">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={characterallowed}
            id="cinput"
            onChange={() => setcharacter((prev) => !prev)}
          />
          <label htmlFor="cinput" className="text-white">Characters</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberallowed}
            id="nint"
            onChange={() => setnumber((prev) => !prev)}
          />
          <label htmlFor="nint" className="text-white">Numbers</label>
        </div>
      </div>
    </div>
  </div>
)}

export default App
