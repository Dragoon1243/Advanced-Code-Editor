from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import sys

app = Flask(__name__)
CORS(app)

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.json
    code = data['code']
    language = data['language']

    try:
        if language == 'python':
            result = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True, timeout=10)
        elif language == 'java':
            # Add logic for executing Java code
            result = {'stdout': 'Java execution not supported yet.'}
        # Add conditions for other languages as needed
        else:
            raise ValueError(f'Unsupported language: {language}')

        return jsonify({'result': result.stdout, 'error': None})
    except subprocess.CalledProcessError as e:
        return jsonify({'result': None, 'error': f'Error during code execution: {e.stderr.decode("utf-8")}'})

if __name__ == '__main__':
    app.run(port=5000)
