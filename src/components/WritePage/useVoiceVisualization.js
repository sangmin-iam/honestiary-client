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

    canvasRef.current.width = 800;
    canvasRef.current.height = 400;

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
