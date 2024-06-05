// components/Preview.js
import { useRef, useEffect } from 'react';

export default function Preview({ template, inputs, image }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (template === 'drama') {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(inputs.date, 10, 30); // top left
        ctx.fillText(inputs.caption, canvas.width / 2, canvas.height - 30); // bottom center
      }

      // Add drawing logic for other templates as needed
    };
  }, [template, inputs, image]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <button
        className="mt-4 bg-indigo-500 text-white p-2 rounded"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}
