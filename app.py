# import pandas as pd
# from flask_cors import CORS
# from flask import Flask, request, jsonify
# from torchvision import transforms
# from PIL import Image
# import io
# import cv2
# import numpy as np
# import sys

# sys.path.append('C:/Users/ghass/Desktop/FieldCraft/Model/yolov5')
# from models.common import DetectMultiBackend

# # Load your YOLOv5 model
# model = DetectMultiBackend('best.pt', device='cpu')

# app = Flask(__name__)
# CORS(app)

# # Define a transform to prepare the image for inference
# transform = transforms.Compose([
#     transforms.Resize((640, 640)),
#     transforms.ToTensor()
# ])

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         if 'file' not in request.files:
#             app.logger.error('No file part in the request')
#             return jsonify({'error': 'No file uploaded'}), 400

#         file = request.files['file']
#         img_bytes = file.read()
#         app.logger.info(f'Received file of size: {len(img_bytes)} bytes')

#         img = Image.open(io.BytesIO(img_bytes))

#         # Convert PIL image to OpenCV format
#         img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

#         # Prepare the image for inference
#         img = transform(Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))).unsqueeze(0)

#         # Perform inference
#         results = model(img)
#         print(results)

#         # Process the results
#         results = results.pandas().xyxy[0].to_dict(orient='records')

#         app.logger.info(f'Inference results: {results}')
#         return jsonify(results)

#     except Exception as e:
#         app.logger.error(f'Error processing images: {str(e)}')
#         return jsonify({'error': 'Failed to process image', 'message': str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

# import pandas as pd
# from flask_cors import CORS
# from flask import Flask, request, jsonify, send_file
# from torchvision import transforms
# from PIL import Image, ImageDraw
# import io
# import cv2
# import numpy as np
# import sys

# sys.path.append('C:/Users/ghass/Desktop/FieldCraft/Model/yolov5')
# from models.common import DetectMultiBackend

# # Load your YOLOv5 model
# model = DetectMultiBackend('best.pt', device='cpu')

# app = Flask(__name__)
# CORS(app)

# # Define a transform to prepare the image for inference
# transform = transforms.Compose([
#     transforms.Resize((640, 640)),
#     transforms.ToTensor()
# ])

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         if 'file' not in request.files:
#             app.logger.error('No file part in the request')
#             return jsonify({'error': 'No file uploaded'}), 400

#         file = request.files['file']
#         img_bytes = file.read()
#         app.logger.info(f'Received file of size: {len(img_bytes)} bytes')

#         img = Image.open(io.BytesIO(img_bytes))

#         # Convert PIL image to OpenCV format
#         img_cv2 = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

#         # Prepare the image for inference
#         img_tensor = transform(Image.fromarray(cv2.cvtColor(img_cv2, cv2.COLOR_BGR2RGB))).unsqueeze(0)

#         # Perform inference
#         results = model(img_tensor)
        
#         # Process the results
#         results = results.pandas().xyxy[0].to_dict(orient='records')

#         # Draw bounding boxes on the image
#         for result in results:
#             x_min, y_min, x_max, y_max, confidence, class_id, name = result.values()
#             cv2.rectangle(img_cv2, (int(x_min), int(y_min)), (int(x_max), int(y_max)), (255, 0, 0), 2)
#             cv2.putText(img_cv2, f'{name} {confidence:.2f}', (int(x_min), int(y_min) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

#         # Convert back to PIL image
#         img_annotated = Image.fromarray(cv2.cvtColor(img_cv2, cv2.COLOR_BGR2RGB))

#         # Save to a bytes buffer
#         buf = io.BytesIO()
#         img_annotated.save(buf, format='JPEG')
#         buf.seek(0)

#         return send_file(buf, mimetype='image/jpeg')

#     except Exception as e:
#         app.logger.error(f'Error processing images: {str(e)}')
#         return jsonify({'error': 'Failed to process image', 'message': str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)
import pandas as pd
from flask_cors import CORS
from flask import Flask, request, jsonify, send_file
from torchvision import transforms
from PIL import Image
import io
import cv2
import numpy as np
import sys
import torch 

sys.path.append('C:/Users/ghass/Desktop/FieldCraft/Model/yolov5')
from models.common import DetectMultiBackend
from utils.general import non_max_suppression, scale_coords

# Load your YOLOv5 model
model = DetectMultiBackend('best.pt', device='cpu')

app = Flask(__name__)
CORS(app)

# Define a transform to prepare the image for inference
transform = transforms.Compose([
    transforms.Resize((640, 640)),
    transforms.ToTensor()
])

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            app.logger.error('No file part in the request')
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        img_bytes = file.read()
        app.logger.info(f'Received file of size: {len(img_bytes)} bytes')

        img = Image.open(io.BytesIO(img_bytes))

        # Convert PIL image to OpenCV format
        img_cv2 = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

        # Prepare the image for inference
        img_tensor = transform(Image.fromarray(cv2.cvtColor(img_cv2, cv2.COLOR_BGR2RGB))).unsqueeze(0)

        # Perform inference
        with torch.no_grad():
            pred = model(img_tensor)
            pred = non_max_suppression(pred)

        # Process the results
        results = []
        for det in pred:
            if len(det):
                det[:, :4] = scale_coords(img_tensor.shape[2:], det[:, :4], img_cv2.shape).round()
                for *xyxy, conf, cls in det:
                    results.append({
                        'x_min': int(xyxy[0]),
                        'y_min': int(xyxy[1]),
                        'x_max': int(xyxy[2]),
                        'y_max': int(xyxy[3]),
                        'confidence': float(conf),
                        'class_id': int(cls),
                        'name': model.names[int(cls)]
                    })

        # Draw bounding boxes on the image
        for result in results:
            x_min, y_min, x_max, y_max, confidence, class_id, name = result.values()
            cv2.rectangle(img_cv2, (x_min, y_min), (x_max, y_max), (255, 0, 0), 2)
            cv2.putText(img_cv2, f'{name} {confidence:.2f}', (x_min, y_min - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

        # Convert back to PIL image
        img_annotated = Image.fromarray(cv2.cvtColor(img_cv2, cv2.COLOR_BGR2RGB))

        # Save to a bytes buffer
        buf = io.BytesIO()
        img_annotated.save(buf, format='JPEG')
        buf.seek(0)

        return send_file(buf, mimetype='image/jpeg')

    except Exception as e:
        app.logger.error(f'Error processing images: {str(e)}')
        return jsonify({'error': 'Failed to process image', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
