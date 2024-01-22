const Jimp = require("jimp");

async function processImage(imagePath) {
  // Read the image using Jimp
  const image = await Jimp.read(imagePath);

  // Convert the image to grayscale
  image.greyscale();

  // Apply thresholding to create a binary image
  image.threshold(150);

  // Find contours (bubbles)
  const detectedCircles = [];
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    if (image.bitmap.data[idx] === 0) {
      // Assuming black pixels represent contours
      detectedCircles.push({ x, y });
    }
  });

  return detectedCircles;
}

function checkAnswers(detectedCircles, answerKey) {
  let correctAnswers = 0;

  detectedCircles.forEach((circle, i) => {
    // Determine the answer based on the circle position
    const selectedAnswer =
      circle.x < answerKey[i][0]
        ? "A"
        : circle.x < answerKey[i][1]
        ? "B"
        : circle.x < answerKey[i][2]
        ? "C"
        : "D";

    // Check if the selected answer is correct
    if (selectedAnswer === answerKey[i][3]) {
      correctAnswers += 1;
    }
  });

  return correctAnswers;
}

// Example usage
const imagePath = "path/to/your/answer_sheet_image.jpg";
const answerKey = [
  [50, 150, 250, "A"],
  [300, 500, 700, "B"],
  // Add more arrays for each question
];

processImage(imagePath)
  .then((detectedCircles) => {
    const correctAnswers = checkAnswers(detectedCircles, answerKey);
    console.log(`Number of correct answers: ${correctAnswers}`);
  })
  .catch((error) => {
    console.error(error);
  });
