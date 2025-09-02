 let startTime = 0, elapsedTime = 0, timerInterval, running = false;

    const display = document.getElementById("display");
    const laps = document.getElementById("laps");

    function formatTime(ms) {
      let cs = Math.floor((ms % 1000) / 10);
      let s = Math.floor((ms / 1000) % 60);
      let m = Math.floor((ms / (1000 * 60)) % 60);
      let h = Math.floor(ms / (1000 * 60 * 60));

      return (
        (h ? String(h).padStart(2,"0") : "00") + ":" +
        String(m).padStart(2,"0") + ":" +
        String(s).padStart(2,"0") + "." +
        String(cs).padStart(2,"0")
      );
    }

    function updateDisplay() {
      let current = Date.now() - startTime + elapsedTime;
      display.textContent = formatTime(current);
    }

    document.getElementById("startBtn").addEventListener("click", () => {
      if (!running) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
      }
    });

    document.getElementById("pauseBtn").addEventListener("click", () => {
      if (running) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        running = false;
      }
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      clearInterval(timerInterval);
      display.textContent = "00:00:00.00";
      startTime = 0; elapsedTime = 0; running = false;
      laps.innerHTML = "";
    });

    document.getElementById("lapBtn").addEventListener("click", () => {
      if (running) {
        let current = Date.now() - startTime + elapsedTime;
        let lapTime = formatTime(current);
        let lapItem = document.createElement("div");
        lapItem.className = "lap-item";
        lapItem.textContent = "Lap " + (laps.children.length + 1) + ": " + lapTime;
        laps.prepend(lapItem);
      }
    });