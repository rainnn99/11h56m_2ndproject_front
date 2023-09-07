// LandingPage.js

import React, { useState, useEffect } from 'react';
import MyNav from '../MyNav';
import Map from '../Map';

function LandingPage() {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [marker, setMarker] = useState(null); // 추가: 마커 상태

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 검색 버튼을 클릭할 때만 place 상태 변경
    setPlace(inputText);
    setInputText('');
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error('현재 위치 가져오기 오류:', error);
          // 여기서 오류 처리, 사용자에게 오류 메시지 표시 등을 처리하세요.
        }
      );
    } else {
      console.error('이 브라우저에서는 Geolocation을 지원하지 않습니다.');
      // Geolocation을 지원하지 않는 경우 처리하세요.
    }
  };

  // ...

  useEffect(() => {
    // currentLocation이 변경될 때마다 실행되는 코드
    // currentLocation이 변경되면 Map 컴포넌트로 전달하여 위치를 표시
    if (currentLocation) {
      // 현재 위치를 가져온 후에 검색어를 변경하지 않습니다.
      // setPlace('현재 위치'); // 이 부분 주석 처리
    }
  }, [currentLocation]);

  useEffect(() => {
    if (currentLocation) {
      const container = document.getElementById('myMap');
      const options = {
        center: new kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
        level: 4,
      };
      const map = new kakao.maps.Map(container, options);
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">현재 위치</div>');
        infowindow.open(map, marker);
      });
      setMarker(marker);
    }
  }, [currentLocation]);
  
// ...


  return (
    <div className="landingPage">
      

      <div>
        <Map searchPlace={place} currentLocation={currentLocation} />
      </div>
 
      <div className="foodSearchBtn">
  <form className="inputForm" onSubmit={handleSubmit}>
    <input
      placeholder="예: 홍대 파스타"
      onChange={onChange}
      value={inputText}
      style={{ height: '35px', width: '150px' }}
    />
    <button type="submit" style={{ height: '35px', width: '50px' }}>
      검색
    </button>
    <button style={{ height: '35px', width: '120px' }}onClick={handleGetCurrentLocation} disabled={false}>
      현재 위치
    </button>
  </form>
</div>

    </div>
  );
}

export default LandingPage;
