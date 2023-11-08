import React, { useCallback, useEffect, useRef, useState } from "react";

function Password() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
  };

  useEffect(() => {
    generatePassword();
  }, [numberAllowed, length, charAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center  my-3">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0"
          onClick={copyPassword}
        >
          copy
        </button>
      </div>
      <div className=" flex text-sm gap-x-7  ">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={14}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={(e) => {
              setNumberAllowed((prev) => !prev);
            }}
            min={6}
            className="cursor-pointer"
            name=""
            id=""
          />
          <label htmlFor="number"> Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={(e) => {
              charAllowed((prev) => !prev);
            }}
            min={6}
            className="cursor-pointer"
            name=""
            id=""
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <button 
        onClick={generatePassword}
        className="bg-blue-500 rounded-lg p-1 px-10 m-10 text-white " 
        >Generate New Password
        </button>
      </div>
    </div>
  );
}

export default Password;
