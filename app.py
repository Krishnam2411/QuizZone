from flask import Flask, render_template
from data import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play/<category>')
def play(category):
    questions = get_questions(category)
    return render_template('play.html', category = category, questions = questions)

if __name__ == '__main__':
    app.run()