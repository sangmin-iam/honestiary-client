import { useRef, useEffect } from "react";

function useVoiceVisualization() {
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);

  const sourceRef = useRef(null);
  const analyzerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const componentWillUnmount = useRef(false);

  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (!componentWillUnmount.current || !animationFrameRef.current) {
        return;
      }

      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animationFrameRef.current]);

  function startDrawing(stream) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;

    source.connect(analyzer);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const isSmallLaptop = window.innerWidth <= 1024;

    if (isSmallLaptop) {
      canvasRef.current.width = window.innerWidth / 0.7;
      canvasRef.current.height = window.innerHeight / 0.7;
    }

    canvasContextRef.current = canvasRef.current.getContext("2d");

    let barHeight;

    function animate() {
      const ctx = canvasContextRef.current;

      clearCanvas();
      analyzer.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.4;
        ctx.save();

        ctx.translate(
          canvasRef.current.width / 2,
          canvasRef.current.height / 2
        );
        ctx.rotate(i * bufferLength * 4);

        const hue = 250 + i * 2;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

        ctx.beginPath();
        ctx.arc(0, barHeight, barHeight / 15, 0, Math.PI * 2);
        ctx.arc(0, barHeight, barHeight / 17.5, 0, Math.PI * 2);
        ctx.arc(0, barHeight, barHeight / 20, 0, Math.PI * 2);
        ctx.arc(0, barHeight, barHeight / 22.5, 0, Math.PI * 2);
        ctx.arc(0, barHeight, barHeight / 25, 0, Math.PI * 2);
        ctx.arc(0, barHeight, barHeight / 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    sourceRef.current = source;
    analyzerRef.current = analyzer;
  }

  function stopDrawing() {
    clearCanvas();
    cancelAnimationFrame(animationFrameRef.current);

    sourceRef.current.disconnect();
    analyzerRef.current.disconnect();
  }

  function clearCanvas() {
    canvasContextRef.current.clearRect(
      0,
      0,
      canvasRef.current?.width,
      canvasRef.current?.height
    );
  }

  return {
    canvasRef,
    startDrawing,
    stopDrawing,
  };
}

export default useVoiceVisualization;
