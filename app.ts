import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import { exit } from "process";

const response = await inquirer.prompt({
  name: "userInput",
  type: "number",
  message: "Please enter the time in Seconds",
  validate: (input) => {
    if (isNaN(input)) {
      return "Please enter valid number";
    } else if (input > 60) {
      return "Seconds must be in 60";
    } else {
      return true;
    }
  },
});

let input = response.userInput;

function startTime(val: number) {
  const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
  const intervalTime = new Date(initialTime);
  setInterval(() => {
    const currentTime = new Date();
    const timeDifference = differenceInSeconds(intervalTime, currentTime);

    if (timeDifference <= 0) {
      console.log("Timer has expired");
      process.exit();
    }
    const minutes = Math.floor((timeDifference % (3600 * 24)) / 3600);
    const secondS = Math.floor(timeDifference % 60);
    console.log(
      `${minutes.toString().padStart(2, "0")}:${secondS
        .toString()
        .padStart(2, "0")}`
    );
  }, 1000);
}
startTime(input);
