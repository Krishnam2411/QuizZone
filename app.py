from flask import Flask, render_template, jsonify
from flask_cors import CORS
from data import *

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play/<category>')
def play(category):
    return render_template('play.html')

@app.route('/api/<category>')
def api(category):
    questions = get_questions(category)
    return jsonify({'response': questions});

if __name__ == '__main__':
    app.run()