(async () => {
  const inquirer = await import('inquirer');

  function playSound() {
    process.stdout.write('\u0007');
  }

  function tabata(exercise, workTime, readyTime) {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (readyTime < 0) {
          process.stdout.write(`\r${exercise} (${workTime} seconds remaining)`);
          if (workTime <= 3) {
            playSound();
          }
          workTime--;         
        } else {
          process.stdout.write(`\rReady to ${exercise} (${readyTime} seconds remaining)`);
          if (readyTime <= 3) {
            playSound();
          }
          readyTime--;
        }

        if (workTime === -1 && readyTime === -1) {
          clearInterval(intervalId);
          console.log("Complete!");
          resolve();
        }
      }, 1000); // Interval set to 1 second
    });
  }

  async function runJointWarmUp() {
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
    await tabata("Jumping Jack", 45, 20);
    await tabata("Climbing", 35, 20);
    await tabata("Dynamic shoulder bridge", 35, 15);
    await tabata("Plank", 35, 15);
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

  async function runTest() {
    await tabata("Child pose", 10, 5);
    await tabata("Cat cow", 10, 5);
  }

  async function selectWorkout() {
    const answers = await inquirer.default.prompt([
      {
        type: 'list',
        name: 'workout',
        message: 'Which training do you want to do?',
        choices: ['Joint Warm Up', 'Main Warm Up', 'Back Yoga', 'Test']
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
      case 'Test':
          await runTest();
          break;
      default:
        console.log("Invalid selection");
    }
  }

  selectWorkout();
})();
