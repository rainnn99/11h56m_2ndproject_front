import { Container, Row, Col, Figure } from "react-bootstrap";
import React, { useState } from 'react';
import MyNav from "../MyNav";
import Map from '../Map'
import { Height } from "@mui/icons-material";

function LandingPage() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  return (
    <div>
      <MyNav/>
      
      <div>
      <Map  searchPlace={Place} />
</div>


<div>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="예: 홍대 파스타" onChange={onChange} value={InputText}  style={{height: '35px', weight: '150px'}} />
        <button type="submit" style={{height: '35px', weight: '50px'}}>검색</button>
      </form></div>



    </div>
  )
}

export default LandingPage;