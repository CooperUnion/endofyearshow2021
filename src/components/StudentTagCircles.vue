<template>
  <div v-if="tags" class="studentTagCircles">

    <svg v-if="tags.length===1" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle v-bind:class="slug(tags[0])" cx="80" cy="80" r="17.5" />
    </svg>

    <svg v-if="tags.length===2" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle v-bind:class="slug(tags[0])" cx="67.1846" cy="83.1843" r="16.1719"  />
      <circle v-bind:class="slug(tags[1])" cx="93.2314" cy="83.1843" r="16.1719"  />
    </svg>

    <svg v-if="tags.length===3" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle v-bind:class="slug(tags[0])" cx="66.1846" cy="72.1843" r="16.1719"  />
      <circle v-bind:class="slug(tags[1])" cx="92.2314" cy="72.1843" r="16.1719"  />
      <circle v-bind:class="slug(tags[2])" cx="79.0957" cy="93.403" r="16.1719" />
    </svg>

    <svg v-if="tags.length===4" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle v-bind:class="slug(tags[0])" cx="67.1846" cy="67.1843" r="16.1719"  />
      <circle v-bind:class="slug(tags[1])" cx="67.1846" cy="93.4553" r="16.1719"  />
      <circle v-bind:class="slug(tags[2])" cx="93.2314" cy="67.1843" r="16.1719"  />
      <circle v-bind:class="slug(tags[3])" cx="93.2314" cy="93.4553" r="16.1719"  />
    </svg>

    <svg v-if="tags.length===5" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path v-bind:class="slug(tags[0])" d="M111.5 94.5C111.5 103.323 104.127 110.5 95 110.5C85.8731 110.5 78.5 103.323 78.5 94.5C78.5 85.6774 85.8731 78.5 95 78.5C104.127 78.5 111.5 85.6774 111.5 94.5Z" />
      <circle v-bind:class="slug(tags[1])" cx="61.5" cy="62.5" r="16" />
      <path v-bind:class="slug(tags[2])" d="M94.5 79C94.5 88.1269 87.3226 95.5 78.5 95.5C69.6774 95.5 62.5 88.1269 62.5 79C62.5 69.8731 69.6774 62.5 78.5 62.5C87.3226 62.5 94.5 69.8731 94.5 79Z" />
      <path v-bind:class="slug(tags[3])" d="M111.5 62.5C111.5 71.3226 104.127 78.5 95 78.5C85.8731 78.5 78.5 71.3226 78.5 62.5C78.5 53.6774 85.8731 46.5 95 46.5C104.127 46.5 111.5 53.6774 111.5 62.5Z" />
      <circle v-bind:class="slug(tags[4])" cx="61.5" cy="94.5" r="16" />
    </svg>

    <svg v-if="tags.length===6" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle v-bind:class="slug(tags[0])" cx="67.1846" cy="52.1843" r="16.1719"  />
      <circle v-bind:class="slug(tags[1])" cx="67.1846" cy="79.4655" r="16.1719"  />
      <circle v-bind:class="slug(tags[2])" cx="67.1846" cy="106.242" r="16.1719"  />
      <circle v-bind:class="slug(tags[3])" cx="93.2314" cy="52.1843" r="16.1719"  />
      <circle v-bind:class="slug(tags[4])" cx="93.2314" cy="79.4655" r="16.1719"  />
      <circle v-bind:class="slug(tags[5])" cx="93.2314" cy="106.242" r="16.1719"  />
    </svg>

    <svg v-if="tags.length===7" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle v-bind:class="slug(tags[0])" cx="79.2451" cy="52.1843" r="16.1719" />
      <circle v-bind:class="slug(tags[1])" cx="79.2451" cy="117.862" r="16.1719" />
      <circle v-bind:class="slug(tags[2])" cx="96.5" cy="100.631" r="16" />
      <path v-bind:class="slug(tags[3])" d="M79.5 68.6309C79.5 77.4534 72.1269 84.6309 63 84.6309C53.8731 84.6309 46.5 77.4534 46.5 68.6309C46.5 59.8083 53.8731 52.6309 63 52.6309C72.1269 52.6309 79.5 59.8083 79.5 68.6309Z" />
      <path v-bind:class="slug(tags[4])" d="M95.5 85.1309C95.5 94.2577 88.3226 101.631 79.5 101.631C70.6774 101.631 63.5 94.2577 63.5 85.1309C63.5 76.004 70.6774 68.6309 79.5 68.6309C88.3226 68.6309 95.5 76.004 95.5 85.1309Z" />
      <circle v-bind:class="slug(tags[5])" cx="96.5" cy="68.6309" r="16" />
      <path v-bind:class="slug(tags[6])" d="M79.5 100.631C79.5 109.453 72.1269 116.631 63 116.631C53.8731 116.631 46.5 109.453 46.5 100.631C46.5 91.8083 53.8731 84.6309 63 84.6309C72.1269 84.6309 79.5 91.8083 79.5 100.631Z" />
    </svg>

    <svg v-if="tags.length===8" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle v-bind:class="slug(tags[0])" cx="67" cy="69" r="16.5" />
      <circle v-bind:class="slug(tags[1])" cx="81" cy="47" r="16.5" />
      <path v-bind:class="slug(tags[2])" d="M131.5 82C131.5 91.1269 124.323 98.5 115.5 98.5C106.677 98.5 99.5 91.1269 99.5 82C99.5 72.8731 106.677 65.5 115.5 65.5C124.323 65.5 131.5 72.8731 131.5 82Z" />
      <path v-bind:class="slug(tags[3])" d="M97.5 116.5C97.5 125.323 90.1269 132.5 81 132.5C71.8731 132.5 64.5 125.323 64.5 116.5C64.5 107.677 71.8731 100.5 81 100.5C90.1269 100.5 97.5 107.677 97.5 116.5Z" />
      <path v-bind:class="slug(tags[4])" d="M61.5 82C61.5 91.1269 54.3226 98.5 45.5 98.5C36.6774 98.5 29.5 91.1269 29.5 82C29.5 72.8731 36.6774 65.5 45.5 65.5C54.3226 65.5 61.5 72.8731 61.5 82Z" />
      <path v-bind:class="slug(tags[5])" d="M83.5 95.5C83.5 104.323 76.1269 111.5 67 111.5C57.8731 111.5 50.5 104.323 50.5 95.5C50.5 86.6774 57.8731 79.5 67 79.5C76.1269 79.5 83.5 86.6774 83.5 95.5Z" />
      <path v-bind:class="slug(tags[6])" d="M109.5 69C109.5 78.1269 102.323 85.5 93.5 85.5C84.6774 85.5 77.5 78.1269 77.5 69C77.5 59.8731 84.6774 52.5 93.5 52.5C102.323 52.5 109.5 59.8731 109.5 69Z" />
      <circle v-bind:class="slug(tags[7])" cx="93.5" cy="95.5" r="16" />
    </svg>

    <svg v-if="tags.length===9" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle v-bind:class="slug(tags[0])" cx="80" cy="115" r="17.5" />
      <circle v-bind:class="slug(tags[1])" cx="80" cy="80" r="17.5" />
      <circle v-bind:class="slug(tags[2])" cx="98" cy="62" r="17.5" />
      <circle v-bind:class="slug(tags[3])" cx="98" cy="97" r="17.5" />
      <circle v-bind:class="slug(tags[4])" cx="63" cy="62" r="17.5" />
      <circle v-bind:class="slug(tags[5])" cx="63" cy="97" r="17.5" />
      <circle v-bind:class="slug(tags[6])" cx="115" cy="80" r="17.5" />
      <circle v-bind:class="slug(tags[7])" cx="45" cy="80" r="17.5" />
      <circle v-bind:class="slug(tags[8])" cx="80" cy="45" r="17.5" />
    </svg>

    <svg v-if="tags.length===10" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path v-bind:class="slug(tags[0])" d="M128.5 88.5C128.5 97.3226 121.127 104.5 112 104.5C102.873 104.5 95.5 97.3226 95.5 88.5C95.5 79.6774 102.873 72.5 112 72.5C121.127 72.5 128.5 79.6774 128.5 88.5Z" />
      <circle v-bind:class="slug(tags[1])" cx="96.5" cy="104.5" r="16" />
      <path v-bind:class="slug(tags[2])" d="M94.5 121C94.5 130.127 87.3226 137.5 78.5 137.5C69.6774 137.5 62.5 130.127 62.5 121C62.5 111.873 69.6774 104.5 78.5 104.5C87.3226 104.5 94.5 111.873 94.5 121Z" />
      <circle v-bind:class="slug(tags[3])" cx="63" cy="71" r="16.5" />
      <path v-bind:class="slug(tags[4])" d="M106.5 45C106.5 54.1269 99.3226 61.5 90.5 61.5C81.6774 61.5 74.5 54.1269 74.5 45C74.5 35.8731 81.6774 28.5 90.5 28.5C99.3226 28.5 106.5 35.8731 106.5 45Z" />
      <circle v-bind:class="slug(tags[5])" cx="78.5" cy="88.5" r="16" />
      <circle v-bind:class="slug(tags[6])" cx="70" cy="45" r="16.5" />
      <path v-bind:class="slug(tags[7])" d="M112.5 71C112.5 80.1269 105.323 87.5 96.5 87.5C87.6774 87.5 80.5 80.1269 80.5 71C80.5 61.8731 87.6774 54.5 96.5 54.5C105.323 54.5 112.5 61.8731 112.5 71Z" />
      <path v-bind:class="slug(tags[8])" d="M61.5 88.5C61.5 97.3226 54.1269 104.5 45 104.5C35.8731 104.5 28.5 97.3226 28.5 88.5C28.5 79.6774 35.8731 72.5 45 72.5C54.1269 72.5 61.5 79.6774 61.5 88.5Z" />
      <path v-bind:class="slug(tags[9])" d="M79.5 104.5C79.5 113.323 72.1269 120.5 63 120.5C53.8731 120.5 46.5 113.323 46.5 104.5C46.5 95.6774 53.8731 88.5 63 88.5C72.1269 88.5 79.5 95.6774 79.5 104.5Z" />
    </svg>

  </div>
</template>



<script>
import { slug } from '@/lib/utils.js'
export default {
  name: 'StudentTagCircles',
  props: {
   tags: Array
  },
  setup(props){

    const colors = {
      'design': '#ff0000',
      'drawing': '#bd00ff',
      'film-video': '#6C00FF',  
      'installation': '#0000ff',
      'painting': '#06a9ff',
      'performance': '#00ffff',
      'photography': '#00ff00',
      'printmaking': '#deff10',
      'sculpture': '#ffff00',
      'sound-art': '#ffa500'
    }
    return { colors, slug }
  }
}
</script>
<style scoped>

  svg {
    isolation: isolate;
  }
  circle, path { 
    mix-blend-mode: screen;
    /* stroke: black; */
  }

  .design{ fill: #ff0000; }
  .drawing{ fill: #bd00ff; }
  .film-video { fill: #6C00FF; }
  .installation{ fill: #0000ff; }
  .painting{ fill: #06a9ff; }
  .performance{ fill: #00ffff; }
  .photography{ fill: #00ff00; }
  .printmaking{ fill: #deff10; }
  .sculpture{ fill: #ffff00; }
  .sound-art{ fill: #ffa500; }

</style>