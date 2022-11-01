// 加速度センサーが使用可能だったら
if (window.DeviceOrientationEvent) {
    //  ユーザーにアクセスの許可を求める関数があったら（iOS13以降の対応）
    if (DeviceOrientationEvent.requestPermission) {
        $(".btn").on("click", function () {
            // 加速度センサーへのアクセス許可を申請する
            DeviceOrientationEvent.requestPermission().then(function (response) {
                // リクエストが許可されたら
                if (response === "granted") {
                    // 傾きの変化を検知する「devicemotion」を使い、「acceleration()」を実行
                    $(window).on("devicemotion", acceleration);
                }
            });
        });
        // アクセスの許可を求める関数がなかったら
    } else {
        // 回転や傾きの変化を検知する「devicemotion」を使い、「acceleration()」を実行
        $(window).on("devicemotion", acceleration);
    }
}

// 加速度センサーの値を利用
function acceleration() {
    // 加速度センサーの値を各変数に格納（値が小さく比較しずらいので100倍に）
    var x = event.accelerationIncludingGravity.x;
    var z = event.accelerationIncludingGravity.z;
    var y = event.accelerationIncludingGravity.y;

    // 右・左の判定
    if (x < 0) {
        $(".tilt span").removeClass("color");
        $(".tilt span").eq(0).addClass("color");
    } else {
        $(".tilt span").removeClass("color");
        $(".tilt span").eq(1).addClass("color");
    }
    // 手前・奥の判定
    if (z < 0) {
        $(".depth span").removeClass("color");
        $(".depth span").eq(1).addClass("color");
    } else {
        $(".depth span").removeClass("color");
        $(".depth span").eq(0).addClass("color");
    }
    $(".result_acc span").html("加速度<br />" + "X：" + x.toFixed(2) + "<br />" + "Y：" + y.toFixed(2) + "<br />" + "Z：" + z.toFixed(2) + "<br />");
    if (z > -1) {
        $(".sudden_acc span").html("加速度<br />" + "Z：" + z.toFixed(2) + "<br />" + "急発進です");
    } else {
        $(".sudden_acc span").html("加速度<br />" + "Z：" + z.toFixed(2) + "<br />");
    }
}
