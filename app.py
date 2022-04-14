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
    pdfkit.from_string(request.data.decode(), False, configuration=_get_pdfkit_config())
    return request.data


@app.route('/export')
def get_export():
    return render_template('export-page.html')


def _get_pdfkit_config():
        WKHTMLTOPDF_CMD = subprocess.Popen(['which', os.environ.get('WKHTMLTOPDF_BINARY', 'wkhtmltopdf')],
                                           stdout=subprocess.PIPE).communicate()[0].strip()
        return pdfkit.configuration(wkhtmltopdf=WKHTMLTOPDF_CMD)


if __name__ == '__main__':
    if 'DYNO' in os.environ:
        print('loading wkhtmltopdf path on heroku')
        WKHTMLTOPDF_CMD = subprocess.Popen(
            ['which', os.environ.get('WKHTMLTOPDF_BINARY', 'wkhtmltopdf-pack')],
            # Note we default to 'wkhtmltopdf' as the binary name
            stdout=subprocess.PIPE).communicate()[0].strip()
    else:
        print('loading wkhtmltopdf path on localhost')
        MYDIR = os.path.dirname(__file__)
        WKHTMLTOPDF_CMD = os.path.join(MYDIR + "/static/executables/bin/", "wkhtmltopdf.exe")
    app.run()
