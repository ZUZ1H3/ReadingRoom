# 장치와 센서를 제어하고 모니터링 하는 파이썬 코드
import time
import RPi.GPIO as GPIO
from adafruit_htu21d import HTU21D
import busio

# 초음파 센서를 다루기 위한 전역 변수 선언 및 초기화
trig = 20  # GPIO20
echo = 16  # GPIO16
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(trig, GPIO.OUT)  # GPIO20 핀을 출력으로 지정
GPIO.setup(echo, GPIO.IN)  # GPIO16 핀을 입력으로 지정
GPIO.output(trig, False)


# 초음파 센서를 제어하여 물체와의 거리를 측정하여 거리 값 리턴하는 함수
def measure_distance():
    GPIO.output(trig, True)  # trig 핀에 1(High) 출력
    GPIO.output(trig, False)  # trig 핀에 0(Low) 출력. High->Low. 초음파 발사 지시

    while GPIO.input(echo) == 0:  # echo 핀 값이 0->1로 바뀔 때까지 루프
        pass

    # echo 핀 값이 1이면 초음파가 발사되었음
    pulse_start = time.time()  # 초음파 발사 시간 기록
    while GPIO.input(echo) == 1:  # echo 핀 값이 1->0으로 바뀔 때까지 루프
        pass

    # echo 핀 값이 0이 되면 초음파 수신하였음
    pulse_end = time.time()  # 초음파가 되돌아 온 시간 기록
    pulse_duration = pulse_end - pulse_start  # 경과 시간 계산
    return pulse_duration * 340 * 100 / 2  # 거리 계산하여 리턴(단위 cm)


# LED를 다루기 위한 전역 변수 선언 및 초기화
led = 6  # GPIO6
GPIO.setup(led, GPIO.OUT)  # GPIO6 핀을 출력으로 지정


# LED를 켜고 끄는 함수
def controlLED(on_off):  # led 번호의 핀에 on_off(0/1) 값 출력하는 함수
    GPIO.output(led, on_off)


def ledOnOff(led, on_off):
    GPIO.output(led, on_off)


# 경고등 LED
ledRed = 5
onOff = 1
GPIO.setup(ledRed, GPIO.OUT)  # GPIO5 핀을 출력으로 지정


def warningLED():  # 빨간색 LED 깜빡거리기
    global onOff
    for i in range(6):  # 3번 깜빡
        ledOnOff(ledRed, onOff)
        time.sleep(1)
        onOff = 0 if onOff == 1 else 1  # 0과 1의 토글링


# 온습도 전역변수 초기화
sda = 2  # GPIO2 핀. sda
scl = 3  # GPIO3 핀. scl
i2c = busio.I2C(scl, sda)  # I2C 버스 통신을 실행하는 객체 생성
sensor = HTU21D(i2c)  # I2C 버스에서 HTU21D 장치를 제어하는 객체 리턴


# 온습도 함수
def getTemperature():
    return float(sensor.temperature)  # HTU21D 장치로부터 온도 값 읽기


def getHumidity():
    return float(sensor.relative_humidity)  # HTU21D 장치로부터 습도 값 읽기

# 버튼 제어
button = 21  # button GPIO=21
GPIO.setup(button, GPIO.IN, GPIO.PUD_DOWN)
btnStatus = GPIO.input(button)
