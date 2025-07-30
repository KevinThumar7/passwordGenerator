import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let str = ""
    let words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (num) words += "0123456789"
    if (char) words += "!@#$%&*"
    
    for (let i = 1; i <= length; i++){
      let ranNum = Math.floor(Math.random() * words.length + 1)
      str += words.charAt(ranNum)
    }

    setPassword(str)

  }, [length, num, char, setPassword])

  const passwordRef = useRef(null)
  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{passwordGenerator()},[length,num,char,passwordGenerator])

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center" style={{backgroundColor: "gray"}}>
        <div className="p-10 items-center flex flex-col rounded-xl" style={{backgroundColor: "white"}}>
          <h2 className="mb-5">Password Generator</h2>
          <div className="p-5 w-full rounded-lg flex" style={{backgroundColor: "gray"}}>
            <input className="p-2 rounded-l-3xl w-full" value={password} ref={passwordRef} readOnly type="text" />
            <button onClick={copyPassword} className="p-2 rounded-r-3xl text-white" style={{backgroundColor: "blue"}}>Copy</button>
          </div>
          <div className="flex mt-6 gap-4">
            <input type="range" onChange={(e)=>{setLength(e.target.value)}} min={1} value={length} max={30} />
            <p>Length: {length}</p>
            <input defaultChecked={num} onClick={()=>{setNum(prev => !prev)}} id="number" type="checkbox" />
            <label htmlFor="number">Number</label>
            <input defaultChecked={char} onClick={()=>{setChar(prev => !prev)}} type="checkbox" id="character" />
            <label htmlFor="charater">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
