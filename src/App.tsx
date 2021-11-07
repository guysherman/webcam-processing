import { Publisher } from '@opentok/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { initRenderer, loadImage, RendererState, renderFunc, updateTexture, uploadTexture } from 'renderer';
import { MainCanvas, VideoContainer } from './App.styled';
import GlobalStyle from './styles/GlobalStyles';
const { setInterval } = window;

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererState = useRef<RendererState | undefined>(undefined);
  const publisherRef = useRef<HTMLVideoElement | undefined>(undefined);
  const [publisherInitialised, setPublisherInitialised] = useState(false);
  const [rendererInitialised, setRendererInitialised] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      rendererState.current = initRenderer(canvasRef.current);
      if (rendererState.current) {
        loadImage('/assets/profilePic.jpg').then((image) => {
          const texture = uploadTexture(rendererState.current?.gl, image);
          if (rendererState.current) {
            rendererState.current.image = texture;
          }
        });
        setRendererInitialised(true);
      }
    }

    return () => {
      rendererState.current = undefined;
    };
  }, []);

  useEffect(() => {
    OT.getUserMedia()
      .then((stream) => {
        const publisher = OT.initPublisher(
          undefined,
          {
            audioSource: stream.getAudioTracks()[0],
            videoSource: stream.getVideoTracks()[0],
            insertDefaultUI: false,
            resolution: '640x480',
          },
          (error) => {
            if (error) {
              // eslint-disable-next-line no-console
              console.log('initPublisher', { error });
            }
          },
        );
        publisher.on('videoElementCreated', ({ element }) => {
          publisherRef.current = element as HTMLVideoElement;
          setPublisherInitialised(true);
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('getUserMedia', { error });
      });

    return () => {
      publisherRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (rendererInitialised && publisherInitialised) {
      OT.getUserMedia()
        .then((stream) => {
          OT.initPublisher(
            'video-container',
            {
              audioSource: stream.getAudioTracks()[0],
              videoSource: rendererState.current?.gl.canvas.captureStream().getVideoTracks()[0],
              insertDefaultUI: true,
              resolution: '640x480',
              mirror: true,
            },
            (error) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.log('initPublisher', { error });
              }
            },
          );
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('getUserMedia', { error });
        });
    }
  });

  const animationLoop = useCallback(() => {
    if (rendererState.current && rendererInitialised) {
      if (publisherRef.current && rendererState.current.image && publisherInitialised) {
        const video = publisherRef.current;
        updateTexture(rendererState.current.gl, video, rendererState.current.image);
      }

      renderFunc(rendererState.current);
      requestAnimationFrame(animationLoop);
    }
  }, [rendererInitialised, publisherInitialised]);

  useEffect(() => {
    if (rendererInitialised) {
      animationLoop();
    }
  }, [rendererInitialised, animationLoop]);

  return (
    <>
      <GlobalStyle />
      <h1>Hello Webcam!</h1>
      <MainCanvas ref={canvasRef}></MainCanvas>
      <VideoContainer id="video-container" />
    </>
  );
};
