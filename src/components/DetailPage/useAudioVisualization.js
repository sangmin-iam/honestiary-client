import { useEffect, useRef } from "react";

function useAudioVisualization({ audioURL }) {
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const animationFrameRef = useRef(null);

  const audioElementRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);
  const audioAnalyzerRef = useRef(null);

  const componentWillUnmount = useRef(false);

  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (!componentWillUnmount.current) {
        return;
      }

      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animationFrameRef.current]);

  useEffect(() => {
    if (!audioElementRef.current) {
      return;
    }

    audioElementRef.current.src = audioURL;
  }, [audioElementRef.current, audioURL]);

  function startDrawingAudio() {
    const audio = audioElementRef.current;

    const audioContext =
      audioContextRef.current ||
      new (window.AudioContext || window.webkitAudioContext)();

    audioContextRef.current && audioContext.resume();

    const source =
      audioSourceRef.current || audioContext.createMediaElementSource(audio);

    const analyzer = audioAnalyzerRef.current || audioContext.createAnalyser();

    analyzer.fftSize = 256;

    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

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

    let distance;

    function animate() {
      clearCanvas();
      analyzer.getByteFrequencyData(dataArray);
      const ctx = canvasContextRef.current;

      for (let i = 0; i < bufferLength; i++) {
        distance = dataArray[i] * 1.4;
        ctx.save();

        ctx.translate(
          canvasRef.current.width / 2,
          canvasRef.current.height / 2
        );
        ctx.rotate(i * bufferLength * 4);

        const hue = 250 + i * 2;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

        ctx.beginPath();
        ctx.arc(0, distance, distance / 15, 0, Math.PI * 2);
        ctx.arc(0, distance, distance / 17.5, 0, Math.PI * 2);
        ctx.arc(0, distance, distance / 20, 0, Math.PI * 2);
        ctx.arc(0, distance, distance / 22.5, 0, Math.PI * 2);
        ctx.arc(0, distance, distance / 25, 0, Math.PI * 2);
        ctx.arc(0, distance, distance / 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    audioContextRef.current = audioContext;
    audioAnalyzerRef.current = analyzer;
    audioSourceRef.current = source;
  }

  function stopDrawingAudio() {
    clearCanvas();
    cancelAnimationFrame(animationFrameRef.current);
    audioContextRef.current.suspend();
    audioSourceRef.current.disconnect();
    audioAnalyzerRef.current.disconnect();
  }

  function clearCanvas() {
    canvasContextRef?.current.clearRect(
      0,
      0,
      canvasRef?.current.width,
      canvasRef?.current.height
    );
  }

  return {
    canvasRef,
    audioElementRef,
    startDrawingAudio,
    stopDrawingAudio,
  };
}

export default useAudioVisualization;
