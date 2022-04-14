import os
import subprocess
from sys import platform

import pdfkit
from flask import Flask, render_template, request

app = Flask(__name__, template_folder='templates', static_folder='static')


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


@app.post('/export')
def exports():
    print(request.data.decode())
    pdfkit.from_string(request.data.decode(), 'static/img/output.pdf')
    return request.data


@app.route('/export')
def get_export():
    return render_template('export-page.html')

if __name__ == '__main__':
    app.run()
