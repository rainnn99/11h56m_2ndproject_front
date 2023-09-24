import { Calendar, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MyModal from './MyModal';
import MyNav2 from "./../MyNav2";
import axios from 'axios';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";


function MyCalendar() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({});
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  let navigate = useNavigate();

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
    setVisible(true);
  };

  const dateCellRender = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    const dayData = data[dateString];
    console.log(dayData)
  
    const handleEdit = () => {
      setSelectedDate(value);
      setVisible(true);
    };
    
    return (
      <div>
        {dayData && dayData.length > 0 ? (
          <div>
            <p style={{ marginBottom: "0px", textAlign: "left" }}>
              아침: {dayData[0].아침 || ''}
            </p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}>
              점심: {dayData[0].점심 || ''}
            </p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}>
              저녁: {dayData[0].저녁 || ''}
            </p>
            {dayData && (
              <p style={{ marginBottom: "0px", textAlign: "left" }}>
                Kcal: {dayData.breakfast + dayData.lunch + dayData.dinner}
              </p>
            )}
           
            <Button type="default" onClick={handleEdit} style={{ marginTop: 10, textAlign: "right" }}>수정</Button>
          </div>
        ) : (
          <Button type="default" onClick={() => handleSelect(value)} style={{ marginTop: 10, textAlign: "right" }}>추가</Button>
        )}
      </div>
    );
  };
  
  const saveData = (date, newData) => {
    const dateString = date.format('YYYY-MM-DD');
  
    const requestBody = {
      날짜: dateString,
      음식이름1: newData.breakfast,
      음식이름2: newData.lunch,
      음식이름3: newData.dinner,
    };
  
    axios.post('/calendar/update', requestBody)
      .then(response => {
        const return_code = response.data;
        if (return_code=="success") {
          fetchData(year, month);
        } else {
          alert("사용자의 데이터를 입력하는데 실패했습니다");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        console.log(return_code);
        alert("사용자의 데이터를 입력하는데에 실패했습니다. 나중에 다시 시도해주세요.");
      });

  };

  const fetchData = (year, month) => {
    const monthString = month.replace('월', '').padStart(2, '0');
    const yearMonthString = `${year}${monthString}`;

    axios
      .get(`/calendar/${yearMonthString}`)
      .then((response) => {
        const receivedData = response.data;
        const transformedData = {};

        receivedData.forEach((item) => {
        const dateString = item.date; // 날짜 문자열
        const dayData = {
          아침: item.breakfast,
          점심: item.lunch,
          저녁: item.dinner,
        };

        // 날짜를 키로 하여 데이터를 저장
        transformedData[dateString] = [dayData];
      });

      // 기존 데이터에 새로운 데이터를 병합하여 업데이트
        setData((prevData) => ({
          ...prevData,
          ...transformedData,
        }));
      })
      .catch(error => {
        // 오류 처리
      });
  };

  useEffect(() => {
    // 초기 렌더링 이후에만 실행되도록 조건문 추가
    if (year !== '' && month !== '') {
      fetchData(year, month);
    }
  }, [year, month]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 날짜로 year와 month 설정
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    setYear(currentYear);
    setMonth(currentMonth);
  }, []);

  return (
    <div style={{  }}>
  <div>
    <MyNav2 />
    <div className="CalName">
      <h1>{` ${month}`}</h1>
    </div>
    <div style={{ display: 'flex' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  <div style={{ flex: 1 }}>
    <Calendar
      style={{ maxWidth: '1300px', margin: '0 auto', border: 'none',marginLeft:'445px' }}
      dateCellRender={dateCellRender}
      headerRender={({ value, type, onChange }) => {
        const currentYear = value.format('YYYY');
        const currentMonth = value.format('M월');
        setYear(currentYear);
        setMonth(currentMonth);

        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="year" style={{ marginRight: 'auto' }}>{`${year}년`}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="ghost" style={{ border: 'none', margin: '0 20px', fontSize: '30px', color: 'dodgerblue' }} onClick={() => onChange(value.clone().subtract(1, type))}><FiChevronLeft /></Button>
              <Button type="ghost" style={{ border: 'none', fontSize: '30px', color: 'dodgerblue' }} onClick={() => onChange(value.clone().add(1, type))}><FiChevronRight /></Button>
            </div>
          </div>
        )
      }}
      onSelect={() => { }}
    />
  </div>
  <div style={{ position: 'relative', marginLeft: '400px' }}>
    <img
      src="/eat2.png"
      style={{
        width: '350px',
        height: '370px',
        position: 'absolute',
        right: 0,
        bottom: 0,
      }}
    />
  </div>
</div>

    </div>
    {selectedDate && (
      <MyModal
        visible={visible}
        onCancel={handleCancel}
        onSave={(newData) => saveData(selectedDate, newData)}
        date={selectedDate}
        data={data[selectedDate.format('YYYY-MM-DD')]}
      />
    )}
  </div>
</div>

  );
}
 
export default MyCalendar;