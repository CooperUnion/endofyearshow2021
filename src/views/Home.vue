<template>
<div id="particle-frame" style="
  ">
  <img class ="desktoplogo" src="https://cdn.glitch.com/d71c7c2a-c6c4-4028-9136-d224524d7374%2Fdesktop.svg?v=1622648434792">
  <img class ="mobilelogo" src="https://cdn.glitch.com/d71c7c2a-c6c4-4028-9136-d224524d7374%2Fmobile.svg?v=1622665230806">
  </div>
<newcursors/>
</template>

<script>
    import newcursors from '@/components/Cursors-attempt-rightvue.vue'

  export default {
  name: 'Landing',
  components: {
    newcursors
  },
      setup (props){
    console.log("setup!")
    return{}
  },
      data() {
    return {

    }
  },

  mounted(){
  document.getElementById("particle-frame").style.width = window.innerWidth+ "px"
  document.getElementById("particle-frame").style.height = window.innerHeight + "px"
    
    document.body.onresize = function(){
  frame = document.getElementById('particle-frame');
  canvas_width = parseInt(frame.style.width);
  canvas_height = parseInt(frame.style.height);
  document.getElementById("particle-frame").style.width = window.innerWidth+ "px"
  document.getElementById("particle-frame").style.height = window.innerHeight + "px"
    }
    
   // document.getElementById("particle-frame").style.marginTop = "-40px"
   // document.getElementById("particle-frame").style.marginLeft = "-40px"
  // init vars
  var particles = new Array();
  var frame = document.getElementById('particle-frame');
  var canvas_width = parseInt(frame.style.width);
  var canvas_height = parseInt(frame.style.height);
  var frame_rate = 4; // per second
  var max_particle_size = 120; // pixels
  var max_velocity = 30; // pixels per frame
  createParticles(20);
  var runtime = 0; // seconds, 0 for infinite
  var time_elapsed = 0;
  window.running = true
  var timer = setInterval(function() {
    if (window.running){
    animateParticles();
    }

    if (runtime != 0) { 
      time_elapsed += 1 / frame_rate;
      if (time_elapsed >= runtime) clearInterval(timer);
    }

  }, 1000 / frame_rate);

  // functions
  
    function transition(){
              window.running = false
                  document.getElementsByClassName("desktoplogo")[0].style.transition='filter 0.2s linear, transform '+1+'s linear, opacity 0.6s linear';
  document.getElementsByClassName("desktoplogo")[0].style.opacity = 0;
  document.getElementsByClassName("mobilelogo")[0].style.transition='filter 0.2s linear, transform '+1+'s linear, opacity 0.6s linear';
  document.getElementsByClassName("mobilelogo")[0].style.opacity = 0; 
              setTimeout(function(){ 
       removeAndReplaceParticles(document.querySelector("particle-1").style.height); 
                             }, 1500, );
        
      for (var i = 1; i <= particles.length; i++) {
        particles[i]['dom'].style.transition = "left 1.1s cubic-bezier(1,-0.01, 0.55, 0.99), top 1.1s cubic-bezier(1,-0.01, 0.55, 0.99)"
        particles[i]['dom'].style.setProperty("left", ((window.innerWidth/2)-(particles[i]['size']/2))+"px");
        particles[i]['dom'].style.setProperty("top", ((window.innerHeight/2)-(particles[i]['size']/1.35))+"px");
        particles[i]['dom'].setAttribute("x-velocity", 0)
        particles[i]['dom'].setAttribute("y-velocity", 0)
      }
      

        
      
    }
    
  function removeAndReplaceParticles(size){
    const transitionLens = document.createElement("div")
    transitionLens.id = "transitionLens"
    
    while (document.getElementById("particle-frame").firstChild) {
        document.getElementById("particle-frame").removeChild(document.getElementById("particle-frame").firstChild);
    }

        document.getElementById("particle-frame").prepend(transitionLens)
        document.getElementById("transitionLens").style.position = "absolute"
        document.getElementById("transitionLens").style.height = size
        document.getElementById("transitionLens").style.width = size
        document.getElementById("transitionLens").style.backgroundColor = "white"
        document.getElementById("transitionLens").style.left = ((window.innerWidth/2)-((size.replace("px", ""))/2))+"px"
        document.getElementById("transitionLens").style.top = ((window.innerHeight/2)-((size.replace("px", ""))/1.35))+"px"
        document.getElementById("transitionLens").style.borderRadius = (size.replace("px", ""))/2 + "px"
                      setTimeout(function(){ 
        document.getElementById("transitionLens").style.transition = "height 0.5s cubic-bezier(1,-0.01, 0.55, 0.99), width 0.5s cubic-bezier(1,-0.01, 0.55, 0.99), border-radius 0.5s cubic-bezier(1,-0.01,1,-0.13), left 0.5s cubic-bezier(1,-0.01, 0.55, 0.99), top 0.5s cubic-bezier(1,-0.01, 0.55, 0.99)"
        document.getElementById("transitionLens").style.height = window.innerHeight +"px"
        document.getElementById("transitionLens").style.width = window.innerWidth + "px"
        document.getElementById("transitionLens").style.borderRadius = 0 + "px"
        document.getElementById("transitionLens").style.left = 0+"px"
        document.getElementById("transitionLens").style.top = 0+"px"
                             }, 150,);
    setTimeout(function(){ 
    window.location.href = "/areas"
      }, 900,);
    
    // update url?
    
  }
  
  function createParticles(amount) {
    for (var i = 1; i <= amount; i++) {
      var particleNum = i
      if (particleNum>10){
        particleNum = particleNum-10
      }
      particles[i] = {'dom': document.createElement("particle-" + particleNum),
                      'opacity' : getRandomInt(100,100)/100,
                      'size' : getRandomInt(max_particle_size, max_particle_size),
                      'left' : canvas_width * Math.floor(Math.random() * 101) / 100,
                       'top' : canvas_height * Math.floor(Math.random() * 101) / 100, 
                      'x-velocity' : getRandomInt(-max_velocity*100, max_velocity*100) / 100, 
                      'y-velocity' : getRandomInt(-max_velocity*100, max_velocity*100) / 100
                     }

      particles[i]['dom'].style.cssText = "opacity: " + particles[i]['opacity'] + "; border-radius: " + particles[i]['size']/2 + "px; height:" + particles[i]['size'] + "px; width: " +particles[i]['size'] + "px; left:" + particles[i]['left'] + "px; top:" + particles[i]['top'] + "px"
      particles[i]['dom'].style.transition = "left 1.1s linear, top 1.1s linear"
      particles[i]['dom'].setAttribute("x-velocity",particles[i]['x-velocity']);
      particles[i]['dom'].setAttribute("y-velocity",particles[i]['y-velocity']);
      
      particles[i]['dom'].addEventListener('click', (e) => {
transition();
      });
      
      frame.prepend(particles[i]['dom']);
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function animateParticles() {
    function styleSlow(element){
      element.style.transition = ""
      element.style.setProperty("transition", "all 0 ease 0");
    }
    
    function styleFast(element){
      setTimeout(function(){ 
      element.style.setProperty("transition", "left 1.1s linear, top 1.1s linear");
                             }, 200);
    }
    
    for (var i = 1; i < particles.length; i++) {
      // particle hits left side
      if ((particles[i]['left'] + (particles[i]['size'])*1.85) < 0 && particles[i]['x-velocity'] < 0) {
        styleSlow(particles[i]['dom'])
        particles[i]['dom'].style.left = (canvas_width + particles[i]['x-velocity'] + (particles[i]['size'])*1.5) + 'px';
        particles[i]['dom'].style.top = particles[i]['top'] + particles[i]['y-velocity'] + 'px';
        styleFast(particles[i]['dom'])
      // particle hits top side
      } else if ((particles[i]['top'] + (particles[i]['size']*2)) < 0 && particles[i]['y-velocity'] < 0) {
        styleSlow(particles[i]['dom'])
        particles[i]['dom'].style.top = (canvas_height + particles[i]['size']) + particles[i]['y-velocity'] + 'px';
        particles[i]['dom'].style.left = particles[i]['left'] + particles[i]['x-velocity'] + 'px';
        styleFast(particles[i]['dom'])
      // particle hits right side
      } else if (particles[i]['left'] > (canvas_width + particles[i]['size']*1.5) && particles[i]['x-velocity'] > 0) {
        styleSlow(particles[i]['dom'])
        particles[i]['dom'].style.left = (particles[i]['x-velocity'] - (particles[i]['size'])*1.5) + 'px';
        particles[i]['dom'].style.top = particles[i]['top'] + particles[i]['y-velocity'] + 'px';
        styleFast(particles[i]['dom'])
      // particle hits bottom side
      } else if ((particles[i]['top']-(particles[i]['size']*1.5)) > canvas_height && particles[i]['y-velocity'] > 0) {
        styleSlow(particles[i]['dom'])
        particles[i]['dom'].style.top = (particles[i]['y-velocity'] - (particles[i]['size']*1.5)) + 'px';
        particles[i]['dom'].style.left = (particles[i]['left'] + particles[i]['x-velocity'] - particles[i]['size']) + 'px';
        styleFast(particles[i]['dom'])
       // particle floating in middle
       } else {
        particles[i]['dom'].style.left = (particles[i]['left']+(particles[i]['x-velocity'])) + 'px';
        particles[i]['dom'].style.top = (particles[i]['top']+(particles[i]['y-velocity'])) + 'px';
      }

      // update particle array values
      particles[i]['left'] = parseFloat(particles[i]['dom'].style.left);
      particles[i]['top'] = parseFloat(particles[i]['dom'].style.top);

    }
  }

    document.body.style.overflow = 'hidden'
    
  }
}
</script>
<style>
  #app{
/*     margin: 0!important; */
/*     max-width: 100vw; */
  }
  
</style>

<style scoped>
body{
  overflow: hidden;
}
  


#particle-frame {
  position: absolute;
  display: block;
  background: black;
  overflow: hidden;
  border-radius: 0px;
  width: 100vw; 
  height: 100vh;
      left: 0px;
    top: 0px;
/*   margin-left: -8px; */
/*   margin-top: -8px; */
}

  #particle-frame >>> .desktoplogo{
        width: 70vw;
    height: auto;
    margin-top: 34vh;
/*     margin-left: 15vw; */
/*     margin-right: auto; */
    position: absolute;
    left: 15vw;
  }
  #particle-frame >>> .mobilelogo{
    display:none;
  }

  #particle-frame >>> particle-1, #particle-frame >>> particle-2, #particle-frame >>> particle-3, #particle-frame >>> particle-4, #particle-frame >>> particle-5, #particle-frame >>> particle-6, #particle-frame >>> particle-7, #particle-frame >>> particle-8, #particle-frame >>> particle-9, #particle-frame >>> particle-10 {
  display: block; 
  position: absolute;
  mix-blend-mode: screen;
  height: 120px;
  width: 120px;
/*   transition: left 1.1s linear, top 1.1s linear; */
}

/*  Color  Variations */
#particle-frame >>> particle-1 { background-color: #FF0000; }
#particle-frame >>> particle-2 { background-color: #6C00FF; }
#particle-frame >>> particle-3 { background-color: #FFA500; }
#particle-frame >>> particle-4 { background-color: #00FF00; }
#particle-frame >>> particle-5 { background-color: #DEFF10; }
#particle-frame >>> particle-6 { background-color: #FFFF00; }
#particle-frame >>> particle-7 { background-color: #0000FF; }
#particle-frame >>> particle-8 { background-color: #00FFFF; }
#particle-frame >>> particle-9 { background-color: #BD00FF; }
#particle-frame >>> particle-10 { background-color: #06A9FF; }
  
  
  @media only screen and (max-width: 600px) {
  #particle-frame >>> .desktoplogo{
        width: 70vw;
    height: auto;
    margin-top: 34vh;
/*     margin-left: 15vw; */
/*     margin-right: auto; */
    position: absolute;
    left: 15vw;
    display: none;
  }
  #particle-frame >>> .mobilelogo{
    display:block;
        width: auto;
    height: 60vh;
/*     margin-left: 15vw; */
/*     margin-right: auto; */
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15vh;
  }
}
  
  
</style>
