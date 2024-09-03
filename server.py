"""Server for Sharkwords."""

from flask import Flask, render_template
app = Flask(__name__)

#---------------------------------------------------------------------#

@app.route("/sharkwords")
def sharkwords():
    return render_template("main.html")

#---------------------------------------------------------------------#

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=6222)
