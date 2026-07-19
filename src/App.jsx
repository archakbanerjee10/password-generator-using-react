import { useState, useEffect, useCallback , useRef} from 'react'
import './App.css'

function App() {
    const [length, setLength] = useState(8)
    const [numbersAllowed, setNumbersAllowed] = useState(false)
    const [password, setPassword] = useState('')
    const [charactersAllowed, setCharactersAllowed] = useState(false)
    // 1. Add state to track if password is copied
    const [isCopied, setIsCopied] = useState(false)

    // Password generation logic wrapped in useCallback for performance optimization
    const generatePassword = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numbersAllowed) str += "0123456789"
        if (charactersAllowed) str += "!@##$%^&*"

        for (let i = 1; i <= length; i++) {
            let charIndex = Math.floor(Math.random() * str.length)
            pass += str.charAt(charIndex)
        }

        setPassword(pass)
        // 2. Reset the green tick if a new password is auto-generated
        setIsCopied(false)
    }, [length, numbersAllowed, charactersAllowed])

    // 3. Updated copy function to handle the visual transition
    const copyPasswordToClipboard = () => {
        window.navigator.clipboard.writeText(password)
        setIsCopied(true)
        // Reset back to "copy" after 2 seconds
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    // Run the generator automatically whenever dependencies change
    useEffect(() => {
        generatePassword()
    }, [length, numbersAllowed, generatePassword, charactersAllowed])

    return (
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-amber-100'>
            <h1 className='text-3xl font-bold text-center mb-4 text-white'>
                Password Generator
            </h1>

            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                <input
                    type='text'
                    value={password}
                    className='outline-none w-full py-2 px-4 text-white font-medium'
                    placeholder='Password'
                    readOnly

                />
                {/* 4. Conditional Tailwind background, hover states, and label text */}
                <button
                    onClick={copyPasswordToClipboard}
                    className={`${
                        isCopied
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                    } text-white font-bold py-2 px-4 shrink-0 transition-all duration-200 min-w-[75px]`}
                >
                    {isCopied ? '✓' : 'copy'}
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
                {/* characters Checkbox */}
                <div className='flex items-center gap-x-1'>
                    <input
                        type='checkbox'
                        checked={charactersAllowed}
                        id='characterInput'
                        onChange={() => setCharactersAllowed((prev) => !prev)}
                    />
                    <label htmlFor='characterInput'>Special chars</label>
                </div>
            </div>
        </div>
    )
}

export default App
