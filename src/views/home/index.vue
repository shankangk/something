<template>
  <div class="hero">
    <!-- Grain noise overlay -->
    <div class="grain"></div>

    <!-- Aesthetic fluid background -->
    <div id="fluid-bg" class="fluid-bg"></div>

    <!-- Navigation -->
    <header class="nav">
      <div class="nav__brand">
        <span class="nav__logo">D2023</span>
        <span class="nav__tagline">PERSONAL PORTFOLIO</span>
      </div>
      <nav class="nav__links">
        <a href="#" class="nav__link" v-for="item in navItems" :key="item">{{ item }}</a>
        <button class="nav__menu" @click="menuOpen = !menuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>

    <!-- Hero content -->
    <main class="hero__content">
      <h1 class="hero__title" ref="titleRef">移动端设计</h1>
      <p class="hero__subtitle">MOBILE TERMINAL DESIGN</p>
    </main>

    <!-- Bottom indicator -->
    <footer class="hero__footer">
      <div class="hero__indicator">
        <span class="hero__indicator-text">01</span>
      </div>
      <div class="hero__indicator-line"></div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { AestheticFluidBg } from 'color4bg';

const navItems = ['UI/UX', 'INTERACT', 'ANIMATION', 'VISION'];
const menuOpen = ref(false);
const titleRef = ref(null);

let bgInstance = null;

onMounted(() => {
  bgInstance = new AestheticFluidBg({
    dom: 'fluid-bg',
    // Elegant, soft, and slightly lighter "Morandi-style" muted pastel colors
    // (deep slate base, dusty rose, soft teal, periwinkle blue)
    colors: ['#3A404F', '#9E6E85', '#5C8A8A', '#6B769E', '#826F85', '#5B8A9E'],
    seed: 1200,
    loop: true
  });

  // Override the default animation loop to make it extremely smooth and slow
  // The default uses "this.frame / 50", we'll change it to "this.frame / 200"
  if (bgInstance) {
    const originalAnimate = bgInstance._animate.bind(bgInstance);
    bgInstance._animate = function() {
      if (this.planeShader && this.planeShader.uniforms.uTime) {
        this.planeShader.uniforms.uTime.value = this.frame / 200;
      } else {
        originalAnimate();
      }
    };
  }
});

onUnmounted(() => {
  if (bgInstance && bgInstance.destroy) {
    bgInstance.destroy();
  }
});
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
}

/* ===== Grain noise overlay ===== */
.grain {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}

/* ===== Fluid background ===== */
.fluid-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

/* ===== Navigation ===== */
.nav {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;

  &__brand {
    display: flex;
    align-items: baseline;
    gap: 14px;
  }

  &__logo {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 2px;
  }

  &__tagline {
    font-size: 10px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 36px;
  }

  &__link {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background: #fff;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #fff;
      text-shadow: 0 0 12px rgba(255, 255, 255, 0.3);

      &::after {
        width: 100%;
      }
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: 12px;

    span {
      display: block;
      width: 28px;
      height: 2px;
      background: #fff;
      border-radius: 1px;
      transition: all 0.3s ease;

      &:nth-child(2) {
        width: 20px;
        margin-left: auto;
      }
    }

    &:hover span {
      &:nth-child(2) {
        width: 28px;
      }
    }
  }
}

/* ===== Hero content ===== */
.hero__content {
  position: relative;
  z-index: 5;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 48px;
  margin-top: -40px;
}

.hero__title {
  font-size: clamp(48px, 10vw, 120px);
  font-weight: 900;
  color: #fff;
  letter-spacing: 8px;
  line-height: 1.1;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  animation: title-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero__subtitle {
  margin-top: 20px;
  font-size: clamp(12px, 1.6vw, 18px);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 12px;
  text-transform: uppercase;
  animation: subtitle-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

@keyframes title-reveal {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes subtitle-reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
    letter-spacing: 20px;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: 12px;
  }
}

/* ===== Footer indicator ===== */
.hero__footer {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  animation: indicator-reveal 1s ease 0.8s both;
}

.hero__indicator {
  width: 48px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.1);
  }
}

.hero__indicator-text {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
}

.hero__indicator-line {
  width: 1px;
  height: 24px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
  margin-top: 6px;
  animation: line-pulse 2s ease-in-out infinite;
}

@keyframes line-pulse {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.3; transform: scaleY(0.6); }
}

@keyframes indicator-reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .nav {
    padding: 20px 24px;

    &__links {
      gap: 16px;
    }

    &__link {
      font-size: 10px;
      display: none;
    }

    &__tagline {
      display: none;
    }
  }

  .hero__content {
    padding: 0 24px;
  }

  .hero__subtitle {
    letter-spacing: 6px;
  }
}
</style>
