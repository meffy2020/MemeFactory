"use client"; // 클라이언트 측에서 실행된다는 것을 나타냄
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { saveAs } from 'file-saver';
import Layout from '../components/layout';

// 샘플 이미지 경로 설정
const sampleImage = '/test.webp'; 

const Home = () => {
  // 상태 변수 설정
  const [image, setImage] = useState(sampleImage); // 이미지 상태
  const [date, setDate] = useState('5(Wen)'); // 날짜 상태
  const [time, setTime] = useState('13:00'); // 시간 상태
  const [name, setName] = useState('푸바오(2)'); // 이름 상태
  const [job, setJob] = useState('짤 만드는 공간'); // 직업 상태
  const [quote1, setQuote1] = useState('이렇게 만들 수 있어요!'); // 첫 번째 대사 상태
  const [quote2, setQuote2] = useState('여기를 눌러 사진 선택 📷'); // 두 번째 대사 상태
  const [memeStyle, setMemeStyle] = useState('ingan'); // 밈 스타일 상태
  const canvasRef = useRef(null); // 캔버스 참조
  const [isClient, setIsClient] = useState(false); // 클라이언트 측 렌더링 여부

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 클라이언트 측에서 마운트된 후에만 렌더링되도록 설정
  }, []);

  // 밈을 그리는 함수
  const drawMeme = useCallback((ctx) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height); // 이미지를 캔버스에 그리기
      ctx.font = 'normal 16px Gowun Batang'; // 글꼴 설정
      ctx.fillStyle = 'white'; // 글자 색상 설정
      ctx.strokeStyle = 'White'; // 글자 외곽선 색상 설정
      ctx.lineWidth = 1; // 외곽선 두께 설정

      // 날짜와 시간을 캔버스에 그리기
      ctx.textAlign = 'left';
      ctx.fillText(date, 10, 30);
      ctx.strokeText(date, 10, 30);
      ctx.fillText(time, 10, 60);
      ctx.strokeText(time, 10, 60);

      // 이름과 직업을 캔버스에 그리기
      ctx.textAlign = 'center';
      ctx.fillText(`${name} / ${job}`, ctx.canvas.width / 2, ctx.canvas.height - 80);
      ctx.strokeText(`${name} / ${job}`, ctx.canvas.width / 2, ctx.canvas.height - 80);

      // 첫 번째 대사와 두 번째 대사를 캔버스에 그리기
      ctx.fillStyle = 'yellow';
      ctx.fillText(quote1, ctx.canvas.width / 2, ctx.canvas.height - 50);
      ctx.strokeText(quote1, ctx.canvas.width / 2, ctx.canvas.height - 50);

      ctx.fillStyle = 'white';
      ctx.fillText(quote2, ctx.canvas.width / 2, ctx.canvas.height - 20);
      ctx.strokeText(quote2, ctx.canvas.width / 2, ctx.canvas.height - 20);
    };
  }, [image, date, time, name, job, quote1, quote2]);

  // 컴포넌트가 렌더링될 때마다 이미지와 상태를 다시 그리기
  useEffect(() => {
    if (image && isClient) {
      const ctx = canvasRef.current.getContext('2d');
      drawMeme(ctx);
    }
  }, [image, date, time, name, job, quote1, quote2, memeStyle, drawMeme, isClient]);

  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 밈 다운로드 핸들러
  const handleDownload = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, 'meme.png');
      }
    });
  };

  // 클라이언트 측에서만 렌더링
  if (!isClient) return null; 

  return (
    <Layout>
      <section className="text-gray-600 body-font flex-grow pt-1 md:pt-8">
        <div className="container mx-auto flex flex-col items-center justify-center px-5 py-1 md:py-8 md:flex-row md:space-x-16 md:justify-center">
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-4 md:space-y-0">
            <div className="lg:max-w-lg lg:w-1/2 md:w-1/2 w-full mb-4 md:mb-0" onClick={() => document.getElementById('imageUpload')?.click()}>
              <canvas
                ref={canvasRef}
                id="memeCanvas"
                width="500"
                height="500"
                className="border cursor-pointer w-full h-auto mt-1 md:mt-0"
              />
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 flex flex-col items-center md:items-start md:text-left text-center w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 hidden md:block">밈팩토리</h1>
              <div className="mb-8 leading-relaxed hidden md:block">밈 선택 및 커스텀 서비스</div>
              <div className="mb-4 w-full max-w-lg">
                <select
                  value={memeStyle}
                  onChange={(e) => setMemeStyle(e.target.value)}
                  className="bg-gray-200 border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  
                  <option value="ingan">인간극장</option>
                  
                </select>
              </div>
              <div className="flex mb-4 w-full max-w-lg space-x-2">
                <input
                  type="text"
                  placeholder="날짜 요일"
                  value={date}
                  className="p-2 border border-gray-300 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="시간"
                  value={time}
                  className="p-2 border border-gray-300 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="flex mb-4 w-full max-w-lg space-x-2">
                <input
                  type="text"
                  placeholder="이름(나이)"
                  value={name}
                  className="p-2 border border-gray-300 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="직업"
                  value={job}
                  className="p-2 border border-gray-300 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-4 space-y-2 w-full max-w-lg">
                <input
                  type="text"
                  placeholder="대사 1"
                  value={quote1}
                  className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setQuote1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="대사 2"
                  value={quote2}
                  className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setQuote2(e.target.value)}
                />
              </div>
              <button className="bg-primary text-white p-2 rounded w-full md:w-auto mb-3 max-w-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" onClick={handleDownload}>짤 만들기</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
