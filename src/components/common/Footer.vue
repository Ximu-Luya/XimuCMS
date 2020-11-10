<template>
    <div id="footer">
        <div class="cuit">
            <img
                width="100px"
                src="http://lab.imslab.design/CUIT_logo.png"
                alt=""
            />
            <p>
                Business Cooperation: wangtiejun@cuit.edu.cn<br />Address: No.24
                Block 1, Xuefu Road, Chengdu, China<br />Office: No.305 Room,
                Electronic computing center building<br />
            </p>
        </div>
        <div class="copyRight">
            <p>All Copyright Reserved © Ximu Studio</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style lang="scss" scoped>
#footer {
    text-align: center;
    background: #434343;

    p {
        color: #fff;
        font-size: 14px;
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        letter-spacing: 1px;
    }

    .cuit {
        padding: 55px 0 35px 0;
        p {
            line-height: 40px;
        }
    }

    .copyRight {
        background: #2f2f2f;
        padding: 20px;
    }
}
</style>