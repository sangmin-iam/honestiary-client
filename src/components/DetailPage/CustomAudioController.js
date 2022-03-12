import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import PropTypes from "prop-types";
import styled from "styled-components";

import { convertSecondsToMinutesSeconds } from "../../utils";

function CustomAudioController({ audioElementRef, src, onStart, onStop }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressBarRef = useRef();
  const animationRef = useRef();

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

      cancelAnimationFrame(animationRef.current);
    };
  }, [animationRef.current]);

  function togglePlayPause() {
    setIsPlaying((prev) => !prev);

    if (!isPlaying) {
      audioElementRef.current.play();
      animationRef.current = requestAnimationFrame(
        progressBarAnimationWhilePlaying
      );
      onStart();

      return;
    }

    audioElementRef.current.pause();
    cancelAnimationFrame(animationRef.current);
    onStop();
  }

  function handleFixDurationOnLoadedMetadata() {
    if (audioElementRef.current.duration === Infinity) {
      audioElementRef.current.currentTime = 1e101;
      audioElementRef.current.addEventListener("timeupdate", getDuration);
    }
  }

  function getDuration() {
    const durationInSeconds = audioElementRef.current.duration;

    progressBarRef.current.max = durationInSeconds;
    setDuration(durationInSeconds);

    audioElementRef.current.currentTime = 0;
    audioElementRef.current.removeEventListener("timeupdate", getDuration);
  }

  function progressBarAnimationWhilePlaying() {
    progressBarRef.current.value = audioElementRef.current.currentTime;
    progressBarRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    setCurrentTime(progressBarRef.current.value);
    animationRef.current = requestAnimationFrame(
      progressBarAnimationWhilePlaying
    );
  }

  function handleChangeRange() {
    audioElementRef.current.currentTime = progressBarRef.current.value;
    progressBarRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    setCurrentTime(progressBarRef.current.value);
  }

  return (
    <Container>
      <audio
        src={src}
        crossOrigin="anonymous"
        ref={audioElementRef}
        onLoadedMetadata={handleFixDurationOnLoadedMetadata}
        onEnded={togglePlayPause}
      />
      <PlayPauseWrapper onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </PlayPauseWrapper>
      <CurrentTimeWrapper>
        {convertSecondsToMinutesSeconds(currentTime)}
      </CurrentTimeWrapper>
      <ProgressBarWrapper>
        <input
          type="range"
          id="progress-bar"
          defaultValue="0"
          step="0.03"
          ref={progressBarRef}
          onChange={handleChangeRange}
        ></input>
      </ProgressBarWrapper>
      <DurationWrapper>
        {convertSecondsToMinutesSeconds(duration)}
      </DurationWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const PlayPauseWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 4.5rem;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
`;

const ProgressBarWrapper = styled.div`
  width: 30%;

  #progress-bar {
    --bar-bg: #ffe3d4;
    --seek-before-width: 0px;
    --seek-before-color: #ff9a62;
    --knobby: #fff;
    --selectedKnobby: #26c9c3;

    position: relative;
    width: 100%;
    height: 11px;
    outline: none;
    appearance: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.orangeLight};
  }

  #progress-bar::-webkit-slider-runnable-track {
    position: relative;
    width: 100%;
    height: 11px;
    outline: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.orangeLight};
  }

  #progress-bar::-moz-range-track {
    position: relative;
    width: 100%;
    height: 11px;
    outline: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.orangeLight};
  }

  #progress-bar::-moz-focus-outer {
    border: 0;
  }

  #progress-bar::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: var(--seek-before-width);
    height: 1.1rem;
    border-radius: 1rem;
    background-color: var(--seek-before-color);
    cursor: pointer;
  }

  #progress-bar::-moz-range-progress {
    height: 1.1rem;
    border-radius: 1rem;
    background-color: var(--seek-before-color);
  }

  #progress-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    z-index: 3;
    width: 1.5rem;
    height: 1.5rem;
    margin: -2px 0 0 0;
    border: 1px solid ${({ theme }) => theme.colors.orange};
    border-radius: 50%;
    background-color: var(--knobby);
    cursor: pointer;
  }

  #progress-bar:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background-color: ${({ theme }) => theme.colors.blueGreen};
    border: 1px solid ${({ theme }) => theme.colors.blueGreen};
  }

  #progress-bar::-moz-range-thumb {
    -webkit-appearance: none;
    position: relative;
    z-index: 3;
    width: 1.5rem;
    height: 1.5rem;
    margin: -2px 0 0 0;
    border: 1px solid ${({ theme }) => theme.colors.orange};
    border-radius: 50%;
    background-color: var(--knobby);
    cursor: pointer;
  }

  #progress-bar:active::-moz-range-thumb {
    transform: scale(1.2);
    background-color: var(--selectedKnobby);
  }
`;

const CurrentTimeWrapper = styled.div`
  font-size: 1.6rem;
  margin: 0 1rem;
`;

const DurationWrapper = styled.div`
  font-size: 1.6rem;
  margin: 0 1rem;
`;

CustomAudioController.propTypes = {
  src: PropTypes.string,
  audioElementRef: PropTypes.object,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};

export default CustomAudioController;
