import React, { useEffect, useId, useRef } from "react";

import { loadImageAsync, sleepAsync } from "../../utils";
import { Winwheel } from "./Winwheel";

import pointerAsset from "../../assets/pointer.png";
import wheelAsset from "../../assets/wheel.png";

export interface AsusWinwheelProps {
  width: number;
  height: number;
  style?: React.CSSProperties;
  onFinished?: (segmentNumber: number) => void;
}

export interface AsusWinwheelInstance {
  spin(segment: number): void;
  isSpinning: boolean;
}

const AsusWinwheel = React.forwardRef<AsusWinwheelInstance, AsusWinwheelProps>(
  (props, ref) => {
    const { style, width, height, onFinished } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const canvasId = useId();

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      let theWheel: Winwheel = null!;

      const { offsetWidth, offsetHeight, parentElement } = canvas;

      if (parentElement) {
        let percent = 1;

        try {
          const computedStyle = window.getComputedStyle(parentElement);
          const width =
            parseFloat(computedStyle.width) -
            parseFloat(computedStyle.paddingLeft) -
            parseFloat(computedStyle.paddingRight);
          percent = width / offsetWidth;
        } catch (_) {
          percent = parentElement.offsetWidth / offsetWidth;
        }

        if (percent < 1) {
          canvas.width = percent * offsetWidth;
          canvas.height = percent * offsetHeight;
        }
      }

      const ctx = canvas.getContext("2d");
      const centerX = offsetWidth / 2;
      const centerY = offsetHeight / 2;
      if (ctx) {
        const text = "Đang tải...";
        ctx.save();
        ctx.font = "20px Helvetica Neue";
        ctx.clearRect(0, 0, offsetWidth, offsetHeight);
        ctx.fillText(text, centerX - ctx.measureText(text).width / 2, centerY);
        ctx.restore();
      }

      let rW = offsetWidth / width;
      if (rW > 1) {
        rW = 1;
      }
      let rH = offsetHeight / height;
      if (rH > 1) {
        rH = 1;
      }

      Promise.all([
        loadImageAsync(pointerAsset, 80 * rW, 80 * rH),
        loadImageAsync(wheelAsset, 400 * rW, 400 * rH),
        sleepAsync(0),
      ]).then((results) => {
        theWheel = new Winwheel({
          canvasId,
          drawMode: "image",
          rotationAngle: 36,
          numSegments: 5,
          // scaleFactor: ratio,
          // centerY: 240,
          // pointerGuide: {
          //   display: true,
          // },
          // imageOverlay: true,
          // fillStyle: "#e7706f",
          // lineWidth: 3,
          // outerRadius: 120,
          // innerRadius: 50,
          segments: [
            { fillStyle: "#eae56f", text: "Segment 1" },
            { fillStyle: "#89f26e", text: "Segment 2" },
            { fillStyle: "#7de6ef", text: "Segment 3" },
            { fillStyle: "#e7706f", text: "Segment 4" },
            { fillStyle: "#7e706f", text: "Segment 5" },
          ],
          pointerImage: results[0],
          wheelImage: results[1],
          animation: {
            type: "spinToStop",
            duration: 10,
            spins: 8,
            callbackFinished: () => {
              if (instance) {
                instance.isSpinning = false;
              }
              if (onFinished) {
                const segmentNumber = theWheel.getIndicatedSegmentNumber();
                onFinished(segmentNumber);
              }
            },
            callbackAfter: () => {
              if (instance) {
                instance.isSpinning = true;
              }
            },
          },
          responsive: true,
        });

        // winwheelResize();

        theWheel.draw();

        const instance: AsusWinwheelInstance = {
          spin: (segment: number) => {
            const stopAt = theWheel.getRandomForSegment(segment);
            if (stopAt === 0) {
              return;
            }
            theWheel.stopAnimation(false); // @ts-ignore
            theWheel.rotationAngle = 0; // @ts-ignore
            theWheel.animation.stopAngle = stopAt;
            theWheel.startAnimation();
          },
          isSpinning: false,
        };

        if (ref) {
          if (typeof ref === "function") {
            ref(instance);
          } else if (typeof ref === "object") {
            ref.current = instance;
          }
        }
      });

      return () => {
        if (theWheel) {
          theWheel.clearCanvas();
          theWheel.draw();
        }
      };
    }, [canvasId, canvasRef, onFinished, ref, width, height]);

    return (
      <canvas
        id={canvasId}
        ref={canvasRef}
        style={style}
        width={width}
        height={height}
        data-responsivescaleheight={true}
        data-margin={0}
      >
        Canvas not supported, use another browser.
      </canvas>
    );
  }
);

export default AsusWinwheel;
