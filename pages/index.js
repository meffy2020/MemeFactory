"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { saveAs } from 'file-saver';
import Layout from '../components/layout';

const sampleImage = '/test.webp'; // public 폴더 내의 샘플 이미지 경로

const Home = () => {
  const [image, setImage] = useState(sampleImage);
  const [date, setDate] = useState('3(Mon)');
  const [time, setTime] = useState('09:46');
  const [name, setName] = useState('박스(24)');
  const [job, setJob] = useState('짤 만드는 공간');
  const [quote1, setQuote1] = useState('이렇게 만들 수 있어요!');
  const [quote2, setQuote2] = useState('여기를 눌러 사진을 선택해주세요 📷');
  const [memeStyle, setMemeStyle] = useState('ingan');
  const canvasRef = useRef(null);

  const drawMeme = useCallback((ctx) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = 'normal 16px Gowun Batang';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;

      // Date and Time
      ctx.textAlign = 'left';
      ctx.fillText(date, 10, 30);
      ctx.strokeText(date, 10, 30);
      ctx.fillText(time, 10, 60);
      ctx.strokeText(time, 10, 60);

      // Name, Age, Job
      ctx.textAlign = 'center';
      ctx.fillText(`${name} / ${job}`, ctx.canvas.width / 2, ctx.canvas.height - 80);
      ctx.strokeText(`${name} / ${job}`, ctx.canvas.width / 2, ctx.canvas.height - 80);

      // Quotes
      ctx.fillStyle = 'yellow';
      ctx.fillText(quote1, ctx.canvas.width / 2, ctx.canvas.height - 50);
      ctx.strokeText(quote1, ctx.canvas.width / 2, ctx.canvas.height - 50);

      ctx.fillStyle = 'white';
      ctx.fillText(quote2, ctx.canvas.width / 2, ctx.canvas.height - 20);
      ctx.strokeText(quote2, ctx.canvas.width / 2, ctx.canvas.height - 20);
    };
  }, [image, date, time, name, job, quote1, quote2]);

  useEffect(() => {
    if (image) {
      const ctx = canvasRef.current.getContext('2d');
      drawMeme(ctx);
    }
  }, [image, date, time, name, job, quote1, quote2, memeStyle, drawMeme]);

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

  const handleDownload = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, 'meme.png');
      }
    });
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0" onClick={() => document.getElementById('imageUpload')?.click()}>
            <canvas
              ref={canvasRef}
              id="memeCanvas"
              width="500"
              height="500"
              className="border cursor-pointer w-full h-auto"
            />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Meme Factory</h1>
            <div className="mb-8 leading-relaxed">Select a meme template and customize it.</div>
            <div className="mb-4">
              <select
                value={memeStyle}
                onChange={(e) => setMemeStyle(e.target.value)}
                className="bg-gray-200 border border-gray-300 p-2 rounded"
              >
                <option value="muhan">무한도전</option>
                <option value="ingan">인간극장</option>
                <option value="investigation">그것이 알고싶다</option>
              </select>
            </div>
            <div className="flex flex-col mb-4 space-y-2">
              <input
                type="text"
                placeholder="날짜 요일"
                value={date}
                className="p-2 border border-gray-300 rounded"
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="시간"
                value={time}
                className="p-2 border border-gray-300 rounded"
                onChange={(e) => setTime(e.target.value)}
              />
              <input
                type="text"
                placeholder="이름(나이)"
                value={name}
                className="p-2 border border-gray-300 rounded"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="직업"
                value={job}
                className="p-2 border border-gray-300 rounded"
                onChange={(e) => setJob(e.target.value)}
              />
              <input
                type="text"
                placeholder="대사 1"
                value={quote1}
                className="p-2 border border-gray-300 rounded"
                onChange={(e) => setQuote1(e.target.value)}
              />
              <input
                type="text"
                placeholder="대사 2"
                value={quote2}
                className="p-2 border border-gray-300 rounded"
                onChange={(e) => setQuote2(e.target.value)}
              />
            </div>
            <button className="bg-indigo-500 text-white p-2 rounded" onClick={handleDownload}>다운로드</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
