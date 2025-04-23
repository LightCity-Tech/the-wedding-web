import { useState, useEffect } from "react";
import { CountdownTimer, CountupTimer } from "../../../components";
import { RightBottom } from "../../../assets";
import { motion, useScroll, useTransform } from "framer-motion";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const HeroSection = () => {
  const [weddingDone, setWeddingDone] = useState<boolean>(false);
  const [weddingToday, setWeddingToday] = useState<boolean>(false);

  const targetDate = "2024-10-26T00:00:00"; //Date of the wedding

  const handleCountdownEnd = () => {
    setWeddingDone(true);
    setWeddingToday(true); // This triggers confetti and "It's Today" message
  };

  const checkTodayDate = (date: string) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const targetDate = date.split("T")[0];
    if (todayDate < targetDate) {
      setWeddingDone(false);
      setWeddingToday(false);
    } else if (todayDate > targetDate) {
      setWeddingDone(true);
      setWeddingToday(false);
    } else if (todayDate === targetDate) {
      setWeddingDone(true);
      setWeddingToday(true);
    }
  };

  useEffect(() => {
    checkTodayDate(targetDate);
  }, [targetDate]);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollY } = useScroll();

  const x1 = useTransform(scrollY, [0, 1], [0, 0.4 * viewportWidth]);
  const y1 = useTransform(scrollY, [0, 1], [0, -0.3 * viewportHeight]);

  const x2 = useTransform(scrollY, [0, 1], [0, 0.4 * viewportWidth]);
  const y2 = useTransform(scrollY, [0, 1], [0, 0.2 * viewportHeight]);

  const x3 = useTransform(scrollY, [0, 1], [0, -0.4 * viewportWidth]);
  const y3 = useTransform(scrollY, [0, 1], [0, -0.3 * viewportHeight]);

  const x4 = useTransform(scrollY, [0, 1], [0, -0.4 * viewportWidth]);
  const y4 = useTransform(scrollY, [0, 1], [0, 0.2 * viewportHeight]);

  return (
    <section className="w-screen h-[90vh] flex flex-col relative overflow-visible bg-[#FFF2DE] mmlg:overflow-x-hidden">
      <div className="flex-grow px-24 flex flex-col items-center mlg:px-14 mxs:px-10">
        <div className="mb-6 mlg:mt-6 mmd:mt-8 msm:mt-10 mxs:mt-12">
          <p className="text-tochi-brown text-4xl mxxss:text-2xl">
            Ifeoma & Tochi
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-6">
            <p className="text-tochi-brown text-xl mxs:text-center mxs:text-sm mxxxs:text-xs">
              OCTOBER 26, 2024
            </p>
            <div className="w-1 h-1 bg-tochi-brown rounded-full"></div>
            <p className="text-tochi-brown text-xl mxs:text-center mxs:text-sm mxxxs:text-xs">
              ENUGU, NIGERIA
            </p>
          </div>

          {weddingToday ? (
            <div className="relative z-[1] my-6 flex justify-center items-center gap-1 mxs:flex-col">
              <p className="text-lg text-tochi-brown mmd:text-sm">
                IT'S TODAY!
              </p>
              <Fireworks autorun={{ speed: 3, duration: 999999 }} />
            </div>
          ) : !weddingDone ? (
            <div className="relative z-[1] my-6 flex justify-center items-center gap-1 mxs:flex-col">
              <CountdownTimer targetDate={targetDate} onCountdownEnd={handleCountdownEnd} />
              <p className="text-lg text-tochi-brown mmd:text-sm">TO GO!</p>
            </div>
          ) : (
            <div className="relative z-[1] my-6 flex justify-center items-center gap-1 mxs:flex-col">
              <CountupTimer targetDate={targetDate} />
              <p className="text-lg text-tochi-brown mmd:text-sm">AFTER!</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-[40%] w-full flex items-center justify-center">
          <motion.div
            className="h-auto w-[18rem] absolute bg-white z-40 mmd:w-[16rem] msm:w-[14rem] mxs:w-[13rem] mxxss:w-[11.5rem]"
            style={{ x: x1, y: y1, rotate: -10 }}
            transition={{ duration: 50, ease: "easeIn", delay: 10 }}
          >
            <img
              src={`https://res.cloudinary.com/tochukwu/image/upload/v1727827837/wedding/main-image.webp`}
              alt="Image of the couple"
              className="w-full h-full bg-cover p-2"
            />
          </motion.div>

          <motion.div
            className="h-auto w-[18rem] bg-white absolute z-30 mmd:w-[16rem] msm:w-[14rem] mxs:w-[13rem] mxxss:w-[11.5rem]"
            style={{ x: x2, y: y2, rotate: 5 }}
            transition={{ duration: 50, ease: "easeIn", delay: 10 }}
          >
            <img
              src={`https://res.cloudinary.com/tochukwu/image/upload/v1727831185/wedding/vintage-normal.webp`}
              alt="Image of the couple"
              className="w-full h-full bg-cover p-2"
            />
          </motion.div>

          <motion.div
            className="h-auto w-[18rem] bg-white absolute z-20 mmd:w-[16rem] msm:w-[14rem] mxs:w-[13rem] mxxss:w-[11.5rem]"
            style={{ x: x3, y: y3, rotate: 21 }}
            transition={{ duration: 50, ease: "easeIn", delay: 10 }}
          >
            <img
              src={`https://res.cloudinary.com/tochukwu/image/upload/v1727831185/wedding/main-close.webp`}
              alt="Image of the couple"
              className="w-full h-full bg-cover p-2"
            />
          </motion.div>

          <motion.div
            className="h-auto w-[18rem] bg-white absolute z-10 mmd:w-[16rem] msm:w-[14rem] mxs:w-[13rem] mxxss:w-[11.5rem]"
            style={{ x: x4, y: y4, rotate: -15 }}
            transition={{ duration: 50, ease: "easeIn", delay: 10 }}
          >
            <img
              src={`https://res.cloudinary.com/tochukwu/image/upload/v1727831558/wedding/vintage-goofy.webp`}
              alt="Image of the couple"
              className="w-full h-full bg-cover p-2"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-50">
        <img
          src={RightBottom}
          alt="Flower Design at the Right Bottom"
          width={250}
          height={250}
        />
      </div>
    </section>
  );
};

export { HeroSection };
