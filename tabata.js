(async () => {
  const inquirer = await import('inquirer');
  const say = require('say');
  const readline = require('readline');

  function playSound() {
    process.stdout.write('\u0007');
  }

  // Function to speak text
  function speakText(text) {
    // Speak the text
    say.speak(text, 'Karen', 1.0, (err) => {
      if (err) {
        console.error(`Error: ${err.message}`);
        return;
      }
    });
  }

  function tabata(exercise, workTime, readyTime) {
    return new Promise((resolve) => {
      speakText(exercise);
      const intervalId = setInterval(() => {
        let message = '';
        if (readyTime < 0) {
          //process.stdout.write(`\r${exercise} (${workTime} seconds remaining)`);
          message = `${exercise} `;
          if (workTime === 0) {
            playSound()
          } else {
            message = message + `(${workTime} seconds remaining)`
            if (workTime <= 3) {
              speakText(workTime);
            }
          }
          workTime--;         
        } else {
          //process.stdout.write(`\rGet ready for the ${exercise} (${readyTime} seconds remaining)`);
          message = `${exercise}. Get ready `;
          if (readyTime === 0) {
            message = message + `start!`
            playSound()
          } else {
            message = message + `(${readyTime} seconds remaining)`
            if (readyTime <= 3) {
              speakText(readyTime);
            }
          }
          readyTime--;
        }

        // Clear the line and write the new message
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(message);

        if (workTime === -1 && readyTime === -1) {
          clearInterval(intervalId);
          console.log("Complete!");
          resolve();
        }
      }, 1000); // Interval set to 1 second
    });
  }

  async function runJointWarmUp() {
    await tabata("Swing your arms forward", 10, 5);
    await tabata("Swing your arms back", 10, 0);
    await tabata("Head tilts", 10, 0);
    await tabata("Head nods", 10, 0);
    await tabata("Wrists of hands forward rotation", 10, 0);
    await tabata("Wrists of hands back rotation", 10, 0);
    await tabata("Elbow forward rotation", 10, 0);
    await tabata("Elbow back rotation", 10, 0);
    await tabata("Tilts left", 10, 0);
    await tabata("Tilts right", 10, 0);
    await tabata("Tilts forward", 10, 0);
    await tabata("Tilts back", 10, 0);
  }

  async function runMainWarmUp() {
    await tabata("Jumping Jack", 45, 5);
    await tabata("Cat cow", 30, 20);
    await tabata("Climbing", 35, 20);
    await tabata("Dynamic shoulder bridge", 35, 20);
    await tabata("Plank", 35, 20);
    await tabata("Lunges", 35, 20);
    await tabata("Bug", 35, 20);
    await tabata("Squats", 35, 20);
    await tabata("Supermans", 35, 20);
    await tabata("Shrugs", 35, 20);
    await tabata("Flags", 35, 20);
    await tabata("Situps", 35, 20);
    await tabata("Push-ups", 35, 20);
  }

  async function runBackYoga() {
    await tabata("Child pose", 30, 10);
    await tabata("Standing forward fold", 30, 5);
    await tabata("Yogi squat", 30, 5);
    await tabata("Seated twist right", 30, 5);
    await tabata("Seated twist left", 30, 5);
    await tabata("Knee hug", 30, 5);
    await tabata("Easy twist", 30, 5);
    await tabata("Fullbody stretch", 30, 5);
    await tabata("Lying twist right", 45, 5);
    await tabata("Lying twist left", 45, 5);
    await tabata("Deep relaxation", 45, 0);
  }

  async function runOnlyBack() {
    await tabata("Plank", 35, 10);
    await tabata("Shrugs", 35, 20);
    await tabata("Bug", 35, 20);
    await tabata("Supermans", 35, 20);
    await tabata("Dynamic shoulder bridge", 35, 15);
    await tabata("Flags", 35, 20);
    await tabata("Child pose", 30, 5);
    await tabata("Cat cow", 30, 5);
    await tabata("Standing forward fold", 30, 5);
    await tabata("Yogi squat", 30, 5);
    await tabata("Seated twist right", 30, 5);
    await tabata("Seated twist left", 30, 5);
    await tabata("Knee hug", 30, 5);
    await tabata("Easy twist", 30, 5);
    await tabata("Fullbody stretch", 30, 5);
    await tabata("Lying twist right", 45, 5);
    await tabata("Lying twist left", 45, 5);
    await tabata("Deep relaxation", 45, 0);
  }  

  async function runTest() {
    await tabata("Child pose", 5, 5);
    await tabata("Cat cow", 5, 0);
  }

  async function selectWorkout() {
    const answers = await inquirer.default.prompt([
      {
        type: 'list',
        name: 'workout',
        message: 'Which training do you want to do?',
        choices: ['Joint Warm Up', 'Main Warm Up', 'Back Yoga', 'Only Back', 'Test']
      }
    ]);

    switch (answers.workout) {
      case 'Joint Warm Up':
        await runJointWarmUp();
        break;
      case 'Main Warm Up':
        await runMainWarmUp();
        break;
      case 'Back Yoga':
        await runBackYoga();
        break;
      case 'Only Back':
          await runOnlyBack();
          break;        
      case 'Test':
          await runTest();
          break;
      default:
        console.log("Invalid selection");
    }
  }

  
  selectWorkout();
})();
