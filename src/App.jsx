import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(4)
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(false);
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback (() => {
    let pass = ""
    let num = "1234567890"

    if (upperCaseAllowed) num += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (lowerCaseAllowed) num += "abcdefghijklmnopqrstuvwxyz"
    if (charAllowed) num += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * num.length)
      pass += num.charAt(char)
      
    }

    setPassword(pass)
    
  }, [length, upperCaseAllowed, lowerCaseAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 24);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, upperCaseAllowed, lowerCaseAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="w-full shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white">
      <h1 className='text-white text-center my-3 mx-3 text-3xl'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-500 ">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2 my-3.5'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={4}
        max={24}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(Number(e.target.value))}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={upperCaseAllowed}
          id="numberInput"
          onChange={() => {
              setUpperCaseAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">UpperCase Alphabets</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={lowerCaseAllowed}
          id="lowerCaseInput"
          onChange={() => {
              setLowerCaseAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="lowerCaseInput">LowerCase Alphabets</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
  )
}

export default App