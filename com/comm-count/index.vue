<template>
  <view class="counter">
    <view class="button-min" @click="decrement"></view>
    <view class="value">{{ count }}</view>
    <view class="button-max" @click="increment"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
      this.$emit('input', this.count);
    },
    decrement() {
      if (this.count > 0) {
        this.count--;
        this.$emit('input', this.count);
      }
    }
  }
};
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  
}

.button-min {
  width: 48rpx;
  height: 48rpx;
 
  background-image: url('images/min.png');
  background-position: center;
  background-size: 48rpx 48rpx;
  background-repeat: no-repeat;
}
.button-max {
 width: 48rpx;
  height: 48rpx;
 
  background-image: url('images/max.png');
  background-position: center;
  background-size: 48rpx 48rpx;
  background-repeat: no-repeat;
}

.value {
  font-size: 16px;
  font-weight: bold;
  width: 150rpx;
  height: 48rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
