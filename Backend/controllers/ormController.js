// omrController.js
const cv = require("@u4/opencv4nodejs");
const fs = require("fs");
const Test = require("../models/test");

async function processStudentSheet(studentSheet, correctAnswerSheet) {
  // Convert images to grayscale for better comparison
  const correctGray = correctAnswerSheet.cvtColor(cv.COLOR_BGR2GRAY);
  const studentGray = studentSheet.cvtColor(cv.COLOR_BGR2GRAY);

  // Perform image subtraction to highlight differences
  const diff = correctGray.absdiff(studentGray);

  // Threshold the difference image
  const threshold = 30;
  const thresholdedDiff = diff.threshold(threshold, 255, cv.THRESH_BINARY);

  // Find contours in the thresholded image
  const contours = thresholdedDiff.findContours(
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE
  );

  // Assume each contour represents a filled circle (answer)
  const answerRadius = 10; // Adjust based on your answer sheet design

  let totalCorrectAnswers = 0;

  contours.forEach((contour) => {
    const center = contour.moments().m10 / contour.moments().m00;
    const y = contour.moments().m01 / contour.moments().m00;

    // Check if the contour is within a certain radius of a marked answer
    if (
      center >= answerRadius &&
      center <= correctGray.cols - answerRadius &&
      y >= answerRadius &&
      y <= correctGray.rows - answerRadius
    ) {
      totalCorrectAnswers++;
    }
  });

  // Calculate total possible correct answers based on the correct answer sheet
  const totalPossibleAnswers = contours.length;

  // Calculate the percentage of correct answers
  const percentageCorrect = (totalCorrectAnswers / totalPossibleAnswers) * 100;

  // Extract roll number using Hough Circle Transform
  const rollNumber = extractRollNumber(studentGray);

  return { testMarks: percentageCorrect, rollNumber };
}

function extractRollNumber(image) {
  const rollNumber = [];

  for (let digitIndex = 0; digitIndex < 6; digitIndex++) {
    const digitCircles = image.houghCircles(
      cv.HOUGH_GRADIENT,
      1,
      10,
      100,
      30,
      10,
      20
    );

    if (!digitCircles || digitCircles.length < 10) {
      console.log(`Not enough circles detected for digit ${digitIndex}`);
      return null;
    }

    // Sort circles by x-coordinate to get the correct order
    digitCircles.sort((a, b) => a.x - b.x);

    // Find the circle with the maximum radius (assuming it's filled)
    const filledCircle = digitCircles.reduce(
      (maxRadiusCircle, circle) =>
        circle.radius > maxRadiusCircle.radius ? circle : maxRadiusCircle,
      digitCircles[0]
    );

    // Determine the digit based on the position of the filled circle
    const digit = digitCircles.indexOf(filledCircle);

    rollNumber.push(digit);
  }

  console.log("Detected Roll Number:", rollNumber.join(""));

  return rollNumber.join("");
}

module.exports.checkOMR = async (req, res) => {
  const { answerSheet, studentSheet } = req.body;

  try {
    // Read images from base64 encoded strings
    const answerSheetBuffer = Buffer.from(answerSheet, "base64");
    const studentSheetBuffer = Buffer.from(studentSheet, "base64");

    const answerSheetImage = cv.imdecode(answerSheetBuffer);
    const studentSheetImage = cv.imdecode(studentSheetBuffer);

    // Process the student's sheet
    const { testMarks, rollNumber } = await processStudentSheet(
      studentSheetImage,
      answerSheetImage
    );

    // Update the test marks in the database
    await Test.findOneAndUpdate({ rollNumber }, { $set: { testMarks } });

    res.status(200).send("OMR processing complete");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
