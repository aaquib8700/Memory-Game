import React, { useEffect, useState } from "react";

const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
};

const App = () => {
  const [nums, setNums] = useState(getNums());
  const [opened, setOpened] = useState([]);
  const [solveList, setSolveList] = useState([]);
  const [stage, setStage] = useState("init");

  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  };

  const handleStart = () => {
    setStage("start");
    setNums(randomNums());
    setSolveList([]);
  };

  const handleClick = (item, index) => {
    if (opened.length === 2) return;
    setOpened((prev) => [...prev, index]);
  };

  console.log("opened", opened);

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const ind1 = opened[0];
        const ind2 = opened[1];
        if (nums[ind1] === nums[ind2]) {
          setSolveList((prev) => [...prev, nums[ind1]]);
        }
        setOpened([]);
      }, 1000);
    }
  }, [opened]);

  //  console.log('opened',opened);

  useEffect(() => {
    if (solveList.length === 8) {
      setStage("win");
    }
  }, [solveList]);

  return (
    <div className="text-center">
      <h1 className={`${stage==="init" ? 'mb-6':'mb-0'} font-bold text-4xl font-serif text-amber-400`}>Memory Game</h1>
      {stage === "init" && <button className="px-3 py-1 bg-green-700 rounded-md text-md text-white font-semibold" onClick={handleStart}>Play Game</button>}
      {stage === "start" && (
        <div className="flex justify-center items-center h-[400px] ">
          <div className="grid grid-cols-4 gap-4">
            {nums.map((item, index) => (
              <div
                className={`bg-green-300 h-[40px] w-[40px] font-semibold 
                  ${solveList.includes(item) ? "invisible" : ""}  
                  ${opened.includes(index) ? "text-md" : "text-[0px]"} 
                  flex items-center justify-center rounded-md cursor-pointer`}
                key={index}
                onClick={() => handleClick(item, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      {stage === "win" && (
        <div>
          <h1 className="my-6 font-mono text-2xl text-blue-500 ">You won the game !!</h1>
          <button className="px-3 py-1 bg-green-700 rounded-md text-md text-white font-semibold" onClick={handleStart}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
