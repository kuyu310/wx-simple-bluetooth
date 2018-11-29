import MyBLManager from "./my-bluetooth-manager";
import Toast from "../../view/toast";
import UI from './ui';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        devices: [],
        device: {},
        connectState: MyBLManager.UNAVAILABLE
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.ui = new UI(this);
        this.bLEManager = new MyBLManager();
        this.bLEManager.setBLEListener({
            receiveDataListener: ({result}) => {

            },
            bleStateListener: ({state}) => {
                console.log('状态', state);
                this.ui.setState({state});
            }
        });
    },

    /**
     * 断开连接
     * @param e
     */
    disconnectDevice(e) {
        this.bLEManager.disconnect().then(() => {
            this.setData({
                device: {}
            });
            setTimeout(Toast.success, 0, '已断开连接');
        });
    },
    /**
     * 扫描
     */
    connectHiBreathDevice() {
        this.bLEManager.connect();
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        this.bLEManager.closeAll();
    },
});

