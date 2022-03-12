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

    canvasRef.current.width = 600;
    canvasRef.current.height = 300;

    const barWidth = canvasRef.current.width / bufferLength;
    let barHeight;
    let x = 0;

    canvasContextRef.current = canvasRef.current.getContext("2d");

    function animate() {
      x = 0;
      clearCanvas();
      analyzer.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        const red = (i * barHeight) / 20;
        const green = i * 2;
        const blue = barHeight / 2;

        canvasContextRef.current.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        canvasContextRef.current.fillRect(
          x,
          canvasRef.current.height - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
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
