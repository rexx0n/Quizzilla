<template>
    <div class="btns">
        <button :class="{opacity: !props.answers[0].correct && props.isFinished, impulse:props.answers[0].correct && props.isFinished}" >A. {{ props.answers[0].title }}
            <svg v-if="props.isFinished && props.answers[0].correct" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" aria-labelledby="label-0bd50dab-0d58-493a-bbe6-6c81701e7586" aria-hidden="true" class="sc-jSUZER eTaWgc" style="paint-order: stroke;"><title id="label-0bd50dab-0d58-493a-bbe6-6c81701e7586">Icon</title><path d="M21.9659268,7.29355403 L13.4414162,16.6716376 L9.95856573,13.6333101 L6.28048804,17.3134693 L13.6554761,24.1926221 L25.8261396,10.805116 L21.9659268,7.29355403 Z" style="fill: rgb(255, 255, 255);"></path></svg>
            <svg v-if="props.isFinished && !props.answers[0].correct" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" aria-labelledby="label-4b078b67-77b6-475b-8537-d3b3c39c9a33" aria-hidden="true" class="sc-jSUZER eTaWgc" style="paint-order: stroke;"><title id="label-4b078b67-77b6-475b-8537-d3b3c39c9a33">Icon</title><path d="M21.4352896,7.29315397 L16.4852814,12.2358635 L11.5352732,7.29315397 L7.29390115,11.534526 L12.216469,16.4852814 L7.29390115,21.4360368 L11.5339288,25.6760644 L16.4852814,20.7695678 L21.4366339,25.6760644 L25.6750612,21.4376372 L20.7955092,16.4852814 L25.6750612,11.5329256 L21.4352896,7.29315397 Z" style="fill: rgb(255, 255, 255);"></path></svg>
        </button>
        <button class="btn--pink" :class="{opacity: props.isFinished && !props.answers[1].correct, impulse:props.answers[1].correct && props.isFinished}">B. {{ props.answers[1].title }}
            <svg v-if="props.isFinished && props.answers[1].correct" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" aria-labelledby="label-0bd50dab-0d58-493a-bbe6-6c81701e7586" aria-hidden="true" class="sc-jSUZER eTaWgc" style="paint-order: stroke;"><title id="label-0bd50dab-0d58-493a-bbe6-6c81701e7586">Icon</title><path d="M21.9659268,7.29355403 L13.4414162,16.6716376 L9.95856573,13.6333101 L6.28048804,17.3134693 L13.6554761,24.1926221 L25.8261396,10.805116 L21.9659268,7.29355403 Z" style="fill: rgb(255, 255, 255);"></path></svg>
            <svg v-if="props.isFinished && !props.answers[1].correct" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" aria-labelledby="label-4b078b67-77b6-475b-8537-d3b3c39c9a33" aria-hidden="true" class="sc-jSUZER eTaWgc" style="paint-order: stroke;"><title id="label-4b078b67-77b6-475b-8537-d3b3c39c9a33">Icon</title><path d="M21.4352896,7.29315397 L16.4852814,12.2358635 L11.5352732,7.29315397 L7.29390115,11.534526 L12.216469,16.4852814 L7.29390115,21.4360368 L11.5339288,25.6760644 L16.4852814,20.7695678 L21.4366339,25.6760644 L25.6750612,21.4376372 L20.7955092,16.4852814 L25.6750612,11.5329256 L21.4352896,7.29315397 Z" style="fill: rgb(255, 255, 255);"></path></svg>
        </button>
        <button class="btn--blue" :class="{opacity: props.isFinished && !props.answers[2].correct, impulse:props.answers[2].correct && props.isFinished}" >C. {{ props.answers[2].title }}
            <svg v-if="props.isFinished && props.answers[2].correct" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" aria-labelledby="label-0bd50dab-0d58-493a-bbe6-6c81701e7586" aria-hidden="true" class="sc-jSUZER eTaWgc" style="paint-order: stroke;"><title id="label-0bd50dab-0d58-493a-bbe6-6c81701e7586">Icon</title><path d="M21.9659268,7.29355403 L13.4414162,16.6716376 L9.95856573,13.6333101 L6.28048804,17.3134693 L13.6554761,24.1926221 L25.8261396,10.805116 L21.9659268,7.29355403 Z" style="fill: rgb(255, 255, 255);"></path></svg>
            <svg v-if="props.isFinished && !props.answers[2].correct" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" aria-labelledby="label-4b078b67-77b6-475b-8537-d3b3c39c9a33" aria-hidden="true" class="sc-jSUZER eTaWgc" style="paint-order: stroke;"><title id="label-4b078b67-77b6-475b-8537-d3b3c39c9a33">Icon</title><path d="M21.4352896,7.29315397 L16.4852814,12.2358635 L11.5352732,7.29315397 L7.29390115,11.534526 L12.216469,16.4852814 L7.29390115,21.4360368 L11.5339288,25.6760644 L16.4852814,20.7695678 L21.4366339,25.6760644 L25.6750612,21.4376372 L20.7955092,16.4852814 L25.6750612,11.5329256 L21.4352896,7.29315397 Z" style="fill: rgb(255, 255, 255);"></path></svg>
        </button>
        <button class="btn--green" :class="{opacity: props.isFinished && !props.answers[3].correct, impulse:props.answers[3].correct && props.isFinished}">D. {{ props.answers[3].title }}
            <svg v-if="props.isFinished && props.answers[3].correct" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" aria-labelledby="label-0bd50dab-0d58-493a-bbe6-6c81701e7586" aria-hidden="true" class="sc-jSUZER eTaWgc" style="paint-order: stroke;"><title id="label-0bd50dab-0d58-493a-bbe6-6c81701e7586">Icon</title><path d="M21.9659268,7.29355403 L13.4414162,16.6716376 L9.95856573,13.6333101 L6.28048804,17.3134693 L13.6554761,24.1926221 L25.8261396,10.805116 L21.9659268,7.29355403 Z" style="fill: rgb(255, 255, 255);"></path></svg>
            <svg v-if="props.isFinished && !props.answers[3].correct" viewBox="0 0 32 32" focusable="false" stroke="rgba(0, 0, 0, 0.15)" stroke-width="1.3px" aria-labelledby="label-4b078b67-77b6-475b-8537-d3b3c39c9a33" aria-hidden="true" class="sc-jSUZER eTaWgc" style="paint-order: stroke;"><title id="label-4b078b67-77b6-475b-8537-d3b3c39c9a33">Icon</title><path d="M21.4352896,7.29315397 L16.4852814,12.2358635 L11.5352732,7.29315397 L7.29390115,11.534526 L12.216469,16.4852814 L7.29390115,21.4360368 L11.5339288,25.6760644 L16.4852814,20.7695678 L21.4366339,25.6760644 L25.6750612,21.4376372 L20.7955092,16.4852814 L25.6750612,11.5329256 L21.4352896,7.29315397 Z" style="fill: rgb(255, 255, 255);"></path></svg>
        </button>
    </div>
</template>

<script setup>


const props = defineProps(['answers', 'isFinished'])
</script>

<style scoped>
img {
    max-width: 20px;
}
.opacity {
    opacity: 0.45;
}
.btn--blue {
    background:rgb(184, 228, 223);
    color: rgb(3, 66, 58);
    border: 1px solid rgb(127, 171, 166);
    border-bottom: 4px solid rgb(127, 171, 166);
    border-right: 4px solid rgb(127, 171, 166);
}
.btn--pink {
    background:rgb(254, 190, 191);
    color: rgb(116, 43, 44);
    border:1px solid rgb(197, 133, 134);
    border-right: 4px solid rgb(197, 133, 134);
    border-bottom: 4px solid rgb(197, 133, 134);
}
.btn--green {
    background:rgb(182, 221, 134);
    color: rgb(57, 87, 20);
    border:1px solid rgb(125, 164, 77);
    border-right: 4px solid rgb(125, 164, 77);
    border-bottom: 4px solid rgb(125, 164, 77);
}
button {
    border: 1px solid rgb(183, 147, 19);
    border-radius: 0.375rem;
    display: flex;
    font-weight: 700;
    transition: 0.3s;
    align-items: center;
    justify-content: space-between;
    max-width: 689px;
    width: 100%;
    padding: 35px 33px;
    color: rgb(82, 66, 12);
    font-size: 25px;
    background:rgb(240, 204, 76) ;
    border-right: 4px solid rgb(183, 147, 19);
    border-bottom: 4px solid rgb(183, 147, 19);
}
.impulse {
    animation-duration: 3s;
    animation-name: impulse;
    animation-iteration-count: infinite;
}

@keyframes impulse {
    0% {
        transform: scale(1);
    }
    50% {
        box-shadow: 0px 0px 15px 9px;
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
svg {
    max-width: 28px;
}
.btns {
    justify-content: center;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
}
@media screen and (max-width: 900px) {
    button {
        font-size: 16px;
        padding: 19px 33px;
        max-width: 384px;
    }
    .btns {
        gap: 10px;
    }
}
</style>