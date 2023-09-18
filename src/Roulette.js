import React, { useState } from "react";
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

// export default () => {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);

//   const handleSpinClick = () => {
//     if (!mustSpin) {
//       const newPrizeNumber = Math.floor(Math.random() * data.length);
//       setPrizeNumber(newPrizeNumber);
//       setMustSpin(true);
//     }
//   };

export default () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [data, setData] = useState([
      { option: '치킨' },
      { option: '피자' },
      { option: '삼겹살' },
      { option: '커리' },
      { option: '떡볶이' },
      { option: '돈까스' },
      { option: '햄버거' },
      { option: '샤브샤브' },
    ]);
  
    // 음식 이름 배열
    const allFoodOptions = [
      '스테이크', '초밥', '파스타','감바스', '타코','커리', '갈비', 
      '돈까스', '떡볶이', '냉면', '우동', '돼지국밥', '팟타이',
      '치킨', '피자', '햄버거', '짬뽕', '탕수육', '훠궈', '마라탕',
      '떡국', '족발', '보쌈', '커리', '삼겹살', '간장게장', '제육볶음',
      '곱창','닭발','대창덮밥', '퓨전한식','김치찜','유린기','쌀국수','샤브샤브','편백찜','라멘',
      '수제버거', '닭도리탕','해물파전','갈비탕','꼬막비빔밥','보쌈','딤섬','족발','텐동',
      '오꼬노미야끼', '곱창전골','콩나물 불고기', '냉모밀','낙곱새','월남쌈'
    ];
  
    const handleSpinClick = () => {
      if (!mustSpin) {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      }
    }
  
    const onStopSpinning = () => {
      // 30개의 음식 중에서 5개를 랜덤으로 선택
      const randomFoodOptions = [];
      while (randomFoodOptions.length < 8) {
        const randomIndex = Math.floor(Math.random() * allFoodOptions.length);
        const selectedFood = allFoodOptions[randomIndex];
        if (!randomFoodOptions.includes(selectedFood)) {
          randomFoodOptions.push(selectedFood);
        }
      }
  
      // 랜덤으로 선택된 8개의 음식 옵션을 data 배열에 업데이트
      const newData = data.map((item, index) => {
        return { option: randomFoodOptions[index] };
      });
  
      setMustSpin(false);

      setTimeout(() => {
        setData(newData);
        setMustSpin(false); // 회전을 멈추고 다음 회전을 위해 다시 false로 설정
      }, 8000); 
    }
  

  return (
    <>
    <div className ="rouletteD">
      <Wheel 
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["rgb(245, 115, 115)", "rgb(255, 255, 255)","rgb(84, 181, 219)","rgb(250, 196, 95)","rgb(86, 209, 49)","rgb(120, 120, 126)","rgb(233, 159, 23)","rgb(198, 120, 214)"]}
        // onStopSpinning={() => {
        //   setMustSpin(false);
        // }}
        onStopSpinning={onStopSpinning}

        innerBorderColor = 'grey'
        outerBorderColor = '#d6d4d2'
        radiusLineColor = 'lightgrey'
        outerBorderWidth = "10"
        radiusLineWidth = "2"
        duration={1000}
      />
    </div>
      <button className ="RouletteBtn"onClick={handleSpinClick}>SPIN!</button>
    </>
  );
};
