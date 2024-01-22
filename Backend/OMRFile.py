import cv2
import numpy as np

def process_image(image_path):
    # Read the image
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to convert to binary image
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)

    # Find contours in the binary image
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Initialize a list to store detected circles (bubbles)
    detected_circles = []

    for contour in contours:
        # Approximate the contour to a polygon
        epsilon = 0.04 * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)

        # If the contour has 4 vertices, it is likely a square (bubble)
        if len(approx) == 4:
            detected_circles.append(approx)

    return detected_circles

def check_answers(detected_circles, answer_key):
    correct_answers = 0

    for i, circle in enumerate(detected_circles):
        # Calculate the centroid of the circle
        M = cv2.moments(circle)
        cx = int(M['m10'] / M['m00'])
        cy = int(M['m01'] / M['m00'])

        # Determine the answer based on the centroid position
        if cx < answer_key[i][0]:
            selected_answer = 'A'
        elif cx < answer_key[i][1]:
            selected_answer = 'B'
        elif cx < answer_key[i][2]:
            selected_answer = 'C'
        else:
            selected_answer = 'D'

        # Check if the selected answer is correct
        if selected_answer == answer_key[i][3]:
            correct_answers += 1

    return correct_answers

# Example usage
image_path = 'path/to/your/answer_sheet_image.jpg'
answer_key = [
    (50, 150, 250, 'A'),
    (300, 500, 700, 'B'),
    # Add more tuples for each question
]

detected_circles = process_image(image_path)
correct_answers = check_answers(detected_circles, answer_key)

print(f"Number of correct answers: {correct_answers}")
