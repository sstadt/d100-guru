<script>
  /**
    usage:

    transition-expand
      div(v-if="expanded") Enough text/content to run more than a couple lines...
  */

  export default {
    name: `TransitionExpand`,
    functional: true,
    render(createElement, context) {
      const data = {
        props: {
          name: `expand`,
        },
        on: {
          afterEnter(element) {
            element.style.height = `auto`;
          },
          enter(element) {
            const { width } = getComputedStyle(element);
            element.style.width = width;
            element.style.position = `absolute`;
            element.style.visibility = `hidden`;
            element.style.height = `auto`;

            const { height } = getComputedStyle(element);
            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height;
            requestAnimationFrame(() => {
              element.style.height = height;
            });
          },
          leave(element) {
            const { height } = getComputedStyle(element);

            element.style.height = height;

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height;
            requestAnimationFrame(() => {
              element.style.height = 0;
            });
          },
        },
      };
      return createElement(`transition`, data, context.children);
    },
  };
</script>

<style scoped>
  * {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: height 1s ease-in-out;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }
</style>
