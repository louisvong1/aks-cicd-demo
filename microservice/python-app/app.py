from flask import Flask, jsonify
from flask_cors import CORS  # 新增這個
import redis

app = Flask(__name__)
CORS(app)  # 【關鍵】允許前端網頁跨網域呼叫這個 API

# 連線到 K8s 內部的 Redis Service
r = redis.Redis(host='redis-service', port=6379, decode_responses=True)

@app.route('/')
def get_count():
    try:
        count = r.incr('hits')
    except redis.exceptions.ConnectionError:
        count = "Error"

    # 改成回傳 JSON 格式，方便前端 JavaScript 讀取
    return jsonify({"count": count}) 

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)