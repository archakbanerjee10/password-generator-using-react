import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
    const [length, setLength] = useState(8)
    const [numbersAllowed, setNumbersAllowed] = useState(false)
    const [password, setPassword] = useState('')

    // Password generation logic wrapped in useCallback for performance optimization
    const generatePassword = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numbersAllowed) str += "0123456789"

        for (let i = 1; i <= length; i++) {
            let charIndex = Math.floor(Math.random() * str.length)
            pass += str.charAt(charIndex)
        }

        setPassword(pass)
    }, [length, numbersAllowed])

    // Run the generator automatically whenever dependencies change
    useEffect(() => {
        generatePassword()
    }, [length, numbersAllowed, generatePassword])

    return (
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-amber-100'>
            <h1 className='text-3xl font-bold text-center mb-4 text-white'>
                Password Generator
            </h1>

            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                <input
                    type='text'
                    value={password}
                    className='outline-none w-full py-2 px-4 text-white'
                    placeholder='Password'
                    readOnly
                />
                <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 shrink-0 transition-colors'>
                    copy
                </button>
            </div>

            <div className='flex text-sm gap-x-4 justify-between'>
                {/* Length Slider */}
                <div className='flex items-center gap-x-2'>
                    <input
                        type="range"
                        min={6}
                        max={15}
                        value={length}
                        className='cursor-pointer'
                        onChange={(e) => setLength(Number(e.target.value))}
                    />
                    <label>Length: {length}</label>
                </div>

                {/* Numbers Checkbox */}
                <div className='flex items-center gap-x-1'>
                    <input
                        type='checkbox'
                        checked={numbersAllowed}
                        id='numberInput'
                        onChange={() => setNumbersAllowed((prev) => !prev)}
                    />
                    <label htmlFor='numberInput'>Numbers</label>
                </div>
            </div>
        </div>
    )
}

export default App