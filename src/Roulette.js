import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import "./roulette.css";

const data = [
  { option: "0", style: { backgroundColor: "green", textColor: "black" } },
  { option: "1", style: { backgroundColor: "white", textColor: "navy" } },
  { option: "2", style: { backgroundColor: "yellow", textColor: "blue" } },
  { option: "3", style: { backgroundColor: "orange", textColor: "white" } },
  { option: "4", style: { backgroundColor: "white", textColor: "navy" } },
  { option: "5", style: { backgroundColor: "orange", textColor: "white" } },
  { option: "6", style: { backgroundColor: "green", textColor: "black" } },
  { option: "7", style: { backgroundColor: "yellow", textColor: "blue" } },
];

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("한식");
  const [currentData, setCurrentData] = useState([]);
  const [data, setData] = useState([
    { option: "치킨" },
    { option: "피자" },
    { option: "삼겹살" },
    { option: "커리" },
    { option: "떡볶이" },
    { option: "돈까스" },
    { option: "햄버거" },
    { option: "샤브샤브" },
  ]);

  // 음식 이름 배열
  const allFoodOptions = [
    {
      category: "한식",
      foods: [
        "김치찌개",
        "낙곱새",
        "불고기",
        "갈비탕",
        "떡볶이",
        "족발",
        "샤브샤브",
        "곱창전골"
      ],
    },
    {
      category: "일식",
      foods: [
        "초밥",
        "라멘",
        "돈부리",
        "우동",
        "타코야끼",
        "사케",
        "오꼬노미야끼",
        "돈까스",
      ],
    },
    {
      category: "중식",
      foods: [
        "짜장면",
        "짬뽕",
        "탕수육",
        "양장피",
        "꿔바로우",
        "팔보채",
        "마라탕",
        "마파두부",
      ],
    },
    {
      category: "양식",
      foods: [
        "스테이크",
        "파스타",
        "피자",
        "햄버거",
        "수제버거",
        "리조또",
        "감바스",
        "타코",
      ],
    },
  ];

  useEffect(() => {
    const selectedCategory = allFoodOptions.find(
      (option) => option.category === currentCategory
    );
    if (selectedCategory) {
      const newData = selectedCategory.foods.map((food) => ({ option: food }));
      console.log(newData);
      setCurrentData(newData);
      setData(newData);
    }
  }, [currentCategory]);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const onStopSpinning = () => {
    // 30개의 음식 중에서 5개를 랜덤으로 선택
    // const randomFoodOptions = [];
    // while (randomFoodOptions.length < 8) {
    //   const randomIndex = Math.floor(Math.random() * allFoodOptions.length);
    //   const selectedFood = allFoodOptions[randomIndex];
    //   if (!randomFoodOptions.includes(selectedFood)) {
    //     randomFoodOptions.push(selectedFood);
    //   }
    // }

    setMustSpin(false);

    // setTimeout(() => {
    // setData(newData);
    // setMustSpin(false); // 회전을 멈추고 다음 회전을 위해 다시 false로 설정
    // }, 8000);
  };

  return (
    <>
      <div className="rouletteD">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={[
            "rgb(245, 115, 115)",
            "rgb(255, 255, 255)",
            "rgb(84, 181, 219)",
            "rgb(250, 196, 95)",
            "rgb(86, 209, 49)",
            "rgb(120, 120, 126)",
            "rgb(233, 159, 23)",
            "rgb(198, 120, 214)",
          ]}
          // onStopSpinning={() => {
          //   setMustSpin(false);
          // }}
          onStopSpinning={onStopSpinning}
          innerBorderColor="grey"
          outerBorderColor="#d6d4d2"
          radiusLineColor="lightgrey"
          outerBorderWidth="10"
          radiusLineWidth="2"
          duration={1000}
        />
      </div>
      <button className="RouletteBtn" onClick={handleSpinClick}>
        SPIN!
      </button>

      <div className="categoryButtons">
        <button
          className="RouletteBtn2"
          onClick={() => handleCategoryClick("한식")}
        >
          한식
        </button>
        <button
          className="RouletteBtn2"
          onClick={() => handleCategoryClick("일식")}
        >
          일식
        </button>
        <button
          className="RouletteBtn2"
          onClick={() => handleCategoryClick("중식")}
        >
          중식
        </button>
        <button
          className="RouletteBtn2"
          onClick={() => handleCategoryClick("양식")}
        >
          양식
        </button>
      </div>
    </>
  );
};
