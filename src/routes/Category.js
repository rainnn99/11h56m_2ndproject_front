import React from "react";
import MyNav from "./../MyNav";
import { useNavigate } from "react-router-dom";

function Category() {
  let navigate = useNavigate();

  return (
    <div className="categoryPage">
      <MyNav />
      <p className="categoryTitle">오늘 뭐 먹을까?</p>
      <div className="categoryWrap">
        <div className="kacWrap">
          <div className="categoryItems">
            <img
              src="/img1.png"
              style={{ width: "7vw", height: "14vh" }}
              onClick={() => {
                navigate("/koreanfood");
              }}
            />
            <p className="categoryText">한식</p>
          </div>
          <div className="categoryItems">
            <img
              src="/img6.png"
              style={{ width: "7vw", height: "14vh" }}
              onClick={() => {
                navigate("/japanesefood");
              }}
            />
            <p className="categoryText">일식</p>
          </div>
          <div className="categoryItems">
            <img
              src="/img4.png"
              style={{ width: "7vw", height: "14vh" }}
              onClick={() => {
                navigate("/chinesefood");
              }}
            />
            <p className="categoryText">중식</p>
          </div>
        </div>

        <div className="jnsWrap">
          <div className="categoryItems">
            <img
              src="/img7.png"
              style={{ width: "7vw", height: "14vh" }}
              onClick={() => {
                navigate("/westernfood");
              }}
            />
            <p className="categoryText">양식</p>
          </div>
          <div className="categoryItems">
            <img
              src="/img8.png"
              style={{ width: "7vw", height: "14vh" }}
              onClick={() => {
                navigate("/snack");
              }}
            />
            <p className="categoryText">분식</p>
          </div>
          <div className="categoryItems">
            <img
              src="/img3.png"
              style={{ width: "7vw", height: "14vh" }}
              onClick={() => {
                navigate("/asianfood");
              }}
            />
            <p className="categoryText">아시안</p>
          </div>
        </div>

        <div className="thinkImage" style={{ position: "absolute", top: "0", left: "0",marginTop: '290px',marginLeft: '7.8vw' }}>
          <img
            src="./think1.png"
            style={{ width: "14.2vw", height: "47vh " }}
          />
        </div>
        <div className="thinkImage" style={{ position: "absolute", bottom: "0",right: "0",marginRight: '100px'}}>
          <img
            src="./think2.png"
            style={{ width: "22vw", height: "50vh" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Category;