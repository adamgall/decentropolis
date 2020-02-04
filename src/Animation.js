import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import LottieWithAnimationControl from './LottieWithAnimationControl'
import animationData from './decentropolis-step1.json'
import './App.css';

function Animation() {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const scaleProgress = (progress, rmin, rmax, tmin, tmax) => {
    // https://stats.stackexchange.com/questions/281162/scale-a-number-between-a-range

    // rmin denote the minimum of the range of your measurement
    // rmax denote the maximum of the range of your measurement
    // tmin denote the minimum of the range of your desired target scaling
    // tmax denote the maximum of the range of your desired target scaling

    return ((progress - rmin) / (rmax - rmin)) * (tmax - tmin) + tmin;
  }

  const intro = (progress, rmax) => {
    return (
      <Tween
        from={{ x: '-100%' }}
        to={{ x: '0%' }}
        progress={scaleProgress(progress, 0, rmax, 0, 1)}
        playState="pause"
        ease="Power2.easeOut"
      >
        <div>
          <LottieWithAnimationControl
            percentage={0}
            options={defaultOptions}
          />
        </div>
      </Tween>
    )
  }

  const animation = (progress, direction, rmin, rmax) => {
    return (
      <LottieWithAnimationControl
        percentage={scaleProgress(progress, rmin, rmax, 0, 1)}
        options={defaultOptions}
        end={direction === "REVERSE"}
      />
    )
  }

  const outro = (progress, rmin) => {
    return (
      <Tween
        from={{ x: '0%' }}
        to={{ x: '100%' }}
        progress={scaleProgress(progress, rmin, 1, 0, 1)}
        playState="pause"
        ease="Power2.easeIn"
      >
        <div>
          <LottieWithAnimationControl
            percentage={0.99}
            options={defaultOptions}
            end
          />
        </div>
      </Tween>
    )
  }

  const segment = (progress, direction) => {
    if (progress <= 0.2)
      return intro(progress, 0.2)

    if (progress > 0.2 && progress <= 0.8)
      return animation(progress, direction, 0.2, 0.8)

    if (progress > 0.8)
      return outro(progress, 0.8)
  }

  return (
    <Controller>
      <Scene
        indicators={true}
        duration="500%"
        offset={300}
        pin
      >
        {(progress, event) => {
          return (
            <div>
              {segment(progress, event.scrollDirection)}
            </div>
          )
        }}
      </Scene>
    </Controller>
  );
}

export default Animation;
