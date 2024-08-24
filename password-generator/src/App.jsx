import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const passwordRef = useRef(null)


  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)

    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])


  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg font-serif text-red-500 justify-center rounded-lg px-4 py-4 m-5 bg-slate-700'>
        <h1 className='text-center my-2 text-2xl '>Password Generator</h1>
        <div className='flex shadow-lg rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 read-only:'
          ref={passwordRef} placeholder='password' />
          <button onClick={copyPasswordToClipboard} type="button" className='bg-blue-500 py-0.5 px-3 outline-none shrink-0 text-white'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div >
            <input type="range" min={6} max={100} className='cursor-pointer' value={length} onChange={(e) => setLength(e.target.value)} name="" id="" />
            <label className='px-2' htmlFor='Length'>Length :{length}</label>
          </div>
          <div >


            <input defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((prev => !prev)) }} type="checkbox" name="" id="" />
            <label className='px-1' htmlFor='numbers'>Numbers</label>
            <input defaultChecked={charAllowed} onChange={() => { setCharAllowed((prev) => !prev) }} type="checkbox" name="" id="" />
            <label className='px-1' htmlFor='charInputs'>Characters</label>
          </div>

        </div>


      </div>
    </>
  )
}

export default App
