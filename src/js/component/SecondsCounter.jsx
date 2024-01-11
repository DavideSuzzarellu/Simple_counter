import React, { useState, useEffect } from "react";
import { RenderCards } from "./Cards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const SecondCounter = ({ second, minute, hour, isRun }) => {
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);
  const [isRunning, setIsRunning] = useState(isRun);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds === 0 && minutes === 0 && hours === 0) {
          setIsRunning(false);
          clearInterval(intervalId);
          if (isRunning) {
            newAlert();
          }
        } else {
          setSeconds((prevSeconds) => (prevSeconds === 0 ? 59 : prevSeconds - 1))

          if (seconds === 0) {
            setMinutes((prevMinutes) => (prevMinutes === 0 ? 59 : prevMinutes - 1));

            if (minutes === 0) {
              setHours((prevHours) => (prevHours === 0 ? 0 : prevHours - 1));
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, seconds, minutes, hours]);

  const stopCount = () => {
    setIsRunning(false);
  };

  const restartCount = () => {
    setIsRunning(true);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const resumeCount = () => {
    setIsRunning(true);
  };

  const handleCountdownSubmit = (e) => {
    e.preventDefault();
    setIsRunning(true);

    const parsedHours = parseInt(countdown.hours, 10);
    const parsedMinutes = parseInt(countdown.minutes, 10);
    const parsedSeconds = parseInt(countdown.seconds, 10);

    setHours(isNaN(parsedHours) ? 0 : parsedHours);
    setMinutes(isNaN(parsedMinutes) ? 0 : parsedMinutes);
    setSeconds(isNaN(parsedSeconds) ? 0 : parsedSeconds);
  };

  const newAlert = () => {
    toast.success('Countdown Completado!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }


  return (
    <main className="container-fluid">

      <section className="p-3 card-container bg-black d-flex flex-column justify-content-center align-items-center;">
          <div className="row justify-content-center gap-1">
            <RenderCards value={<i className="fa-regular fa-clock display-4"></i>} />            
            <RenderCards value={hours} />       
            <RenderCards value="." />
            <RenderCards value={minutes} />
            <RenderCards value="." />
            <RenderCards value={seconds} />
          </div>

        <aside className="row d-flex flex-column justify-content-center col-lg-3 col-md-5 col-6  mx-auto mt-2">
          <button className="bg-success mb-2" onClick={restartCount}>Reiniciar Contador</button>
          <button className="bg-danger mb-2" onClick={stopCount}>Detener Contador</button>
          <button onClick={resumeCount}>Reanudar Contador</button>
        </aside>
      </section>

      <aside className="row d-flex justify-content-center align-items-center pt-3">
        <form className="col-auto d-flex flex-column justify-content-center align-items-center border border-black p-2 rounded" onSubmit={handleCountdownSubmit}>
          
          <h3 className="mb-3">Configuración de Countdown</h3>

          <div className="mb-3 d-flex justify-content-between align-items-center w-75">
            <label className="form-label w-25 me-2">Horas:</label>
            <input
              type="number"
              className="form-control w-75"
              value={countdown.hours}
              onChange={(e) => setCountdown({ ...countdown, hours: e.target.value })}
            />
          </div>

          <div className="mb-3 d-flex justify-content-between align-items-center w-75">
            <label className="form-label w-25 me-2">Minutos:</label>
            <input
              type="number"
              className="form-control w-75"
              value={countdown.minutes}
              onChange={(e) => setCountdown({ ...countdown, minutes: e.target.value })}
            />
          </div>

          <div className="mb-3 d-flex justify-content-between align-items-center w-75">
            <label className="form-label w-25 me-2">Segundos:</label>
            <input
              type="number"
              className="form-control w-75"
              value={countdown.seconds}
              onChange={(e) => setCountdown({ ...countdown, seconds: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-75">Iniciar Countdown</button>
        </form>
      </aside>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
};
