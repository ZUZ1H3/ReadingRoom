from flask import Flask, render_template, request

app = Flask(__name__)
Utime = 0
nowHour = 0
nowMinute = 0
nowSecond = 0
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0


@app.route("/")
def index():
    return render_template("main.html")  # 메인 화면


@app.route("/manager/", methods=["GET"])
def manager():
    return render_template("manager.html")


@app.route("/user/", methods=["GET"])
def user():  # 초기화면에서 사용자 모드
    return render_template("user.html")  # 사용 설정 웹


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
