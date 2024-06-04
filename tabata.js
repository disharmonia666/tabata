(async () => {
  const inquirer = await import('inquirer');

  function playSound() {
    process.stdout.write('\u0007');
  }

  function tabata(exercise, workTime, restTime) {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (workTime < 1) {
          process.stdout.write(`\rRest (${restTime} seconds remaining)  `);
          if (restTime <= 3) {
            playSound();
          }
          restTime--;
        } else {
          process.stdout.write(`\r${exercise} (${workTime} seconds remaining)  `);
          if (workTime <= 3) {
            playSound();
          }
          workTime--;
        }

        if (workTime === 0 && restTime === 0) {
          clearInterval(intervalId);
          console.log("Complete!");
          resolve();
        }
      }, 1000); // Interval set to 1 second
    });
  }

  async function runJointWarmUp() {
    await tabata("Prepare", 5, 0);
    await tabata("Swing your arms forward", 10, 0);
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
    await tabata("Prepare", 5, 0);
    await tabata("Jumping Jack", 45, 20);
    await tabata("Climbing", 30, 20);
    await tabata("Dynamic shoulder bridge", 30, 15);
    await tabata("Lunges", 30, 20);
    await tabata("Bug", 30, 20);
    await tabata("Squats", 30, 20);
    await tabata("Supermans", 30, 20);
    await tabata("Shrugs", 30, 20);
    await tabata("Flags", 30, 20);
    await tabata("Situps", 30, 20);
    await tabata("Push-ups", 30, 20);
  }

  async function runBackYoga() {
    await tabata("Prepare", 5, 0);
    await tabata("Child pose", 30, 5);
    await tabata("Cat cow", 30, 5);
    await tabata("Standing forward fold", 30, 5);
    await tabata("Yogi squat", 30, 5);
    await tabata("Seated twist right", 30, 5);
    await tabata("Seated twist left", 30, 5);
    await tabata("Knee hug", 30, 5);
    await tabata("Fullbody stretch", 30, 5);
    await tabata("Lying twist right", 45, 5);
    await tabata("Lying twist left", 45, 5);
    await tabata("Deep relaxation", 45, 0);
  }

  async function selectWorkout() {
    const answers = await inquirer.default.prompt([
      {
        type: 'list',
        name: 'workout',
        message: 'Which training do you want to do?',
        choices: ['Joint Warm Up', 'Main Warm Up', 'Back Yoga']
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
      default:
        console.log("Invalid selection");
    }
  }

  selectWorkout();
})();
