<template>
    <a-form class="home" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
        autocomplete="off">
        <a-button class="btn-join" html-type="submit" @click="goToLoginView">Join now!</a-button>
    </a-form>
</template>

<script>
import '../assets/background.jpg';
export default {
    methods: {
        goToLoginView() {
            this.$router.push('/login');
        }
    }
}
</script>

<style>
.home {
    background-image: linear-gradient(#4500CA 4%, rgba(69, 0, 202, 0) 50%), url(../assets/background.jpg), linear-gradient(60deg, #28005f 16%, #8300e5 64%, #0f3bff 100%);
    background-size: cover, cover, cover;
    background-position: 50% 100%, 50% 100%, 50% 100%;
    display: flex;
    flex-direction: column;
    /* font-size: 17px; */
    /* margin: 0px 0px 48px; */
    padding: 100px 0px 700px;
    /* text-align: left; */
}

.btn-join {
    margin: 0px 750px;
    border: 0;
    align-items: center;
    background: linear-gradient(120deg, rgba(143, 66, 236, 0), #812bea);
    border-radius: 100px;
    box-shadow: #000000 0px 0px 0px 0px;
    color: #ffffff;
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 40px;
    font-weight: 900;
    justify-content: center;
    letter-spacing: 1px;
    line-height: 28px;
    padding: 32px 32px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>