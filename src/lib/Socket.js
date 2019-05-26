export default class Socket {
    constructor(config) {
        // 配置
        this.config = config || {};
        // 事件对象
        this.event = {};
        // 服务对象
        this.server = {};
        // 连接状态
        this.status = false;
        // 禁止自动连接
        this.nologin = false;
        // 错误标记
        this.error = false;
        // 心跳定时器
        this.t = null;
        // 连接间隔器
        this.ct = null;
        // callback
        this.callback = null;
        // global
        this.global = {};
        // startTimes
        this.startTimes = 0;
    }

    close() {
        this.nologin = true;
        this.server.close();
        this.server = null;
        this.callback = null;
        this.event = null;
        this.global = null;
        this.config = null;
        this.status = false;
    }

    start(callback) {
        this.connect();
        // 连接成功回调函数
        this.callback = callback || function() {};
    }

    connect() {
        let index = this.config.host.indexOf("://");
        let prefix = this.config.host.slice(0, index);
        let host = this.config.host.slice(index + 3);
        let port = this.config.port;
        let path = this.config.path;

        let proto = "ws://";

        switch (prefix) {
            case "https":
                proto = "wss://";
                port = port || 443;
                break;

            case "http":
                proto = "ws://";
                port = port || 80;
                break;

            case "wss":
                proto = "wss://";
                port = port || 443;
                break;

            case "ws":
                proto = "ws://";
                port = port || 80;
                break;

            default:
                proto = "ws://";
                port = port || 80;
                break;
        }

        console.log("开始连接服务器", `${proto}${host}:${port}${path || "/"}`);

        // 清除两个定时器
        clearInterval(this.t);
        clearTimeout(this.ct);
        // 连接WS服务器
        this.server = new WebSocket(`${proto}${host}:${port}${path || "/"}`);
        // 连接成功事件
        this.server.onopen = this.onopen.bind(this);
        // 收到消息事件
        this.server.onmessage = this.onmessage.bind(this);
        // 关闭事件
        this.server.onclose = this.onclose.bind(this);
        // 错误事件
        this.server.onerror = this.onerror.bind(this);
        // 心跳函数
        this.heartBeat();
    }

    onopen() {
        this.status = true;
        this.error = false;
        this.startTimes++;
        // 开启成功回调 每次断线重连 都要重新执行的函数
        this.callback.call(this, this);
        console.log("连接成功");
    }

    onmessage(e) {
        // 事件触发器
        try {
            let message = JSON.parse(e.data);

            if (message.event && message.event in this.event) {
                this.event[message.event].call(this, this, message.data, message.event);
            }
        } catch (error) {
            console.log("socket错误:", error);
        }
    }

    onclose(e) {
        // 关闭回调:清空定时器 判断是否禁止登录 判断错误回调是否在处理 重连
        clearInterval(this.t);
        if (this.nologin) return false;
        this.status = false;
        this.ct = setTimeout(() => {
            if (this.error) return false;
            console.log("close");
            this.connect();
        }, 1000 * this.config.autoConnectInterval || 1000);
    }

    onerror(e) {
        // 错误回调:清空定时器 判断是否禁止登录 设置错误处理标识 重连
        clearInterval(this.t);
        if (this.nologin) return false;
        this.error = true;
        this.status = false;
        this.ct = setTimeout(() => {
            console.log("error");
            this.connect();
        }, 1000 * this.config.autoConnectInterval || 1000);
    }

    heartBeat() {
        // 心跳检测 发送空字符 目前WEBSOCKET不支持PING 仅支持自动返回PONG帧
        this.t = setInterval(() => {
            try {
                if (this.nologin || this.error || !this.status) return false;
                this.server.send("");
            } catch (error) {
                console.log("心跳错误:", error);
            }
        }, 1000 * this.config.heartInterval || 5000);
    }

    emit(event, message) {
        // 发送消息事件
        if (this.nologin || this.error || !this.status) return false;

        try {
            message = message || {};
            this.server.send(
                JSON.stringify({
                    event: event,
                    data: { ...message, ...this.global }
                })
            );
            return true;
        } catch (error) {
            console.log("发送事件错误:", error);
            return false;
        }
    }
    addListener(event, callback) {
        // 监听事件
        if (!this.event[event]) this.event[event] = callback;
    }
}
