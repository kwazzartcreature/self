<script lang="ts">
  import { onMount } from "svelte";

  let { lang, roles, speed = 1 } = $props();

  let currentRoleIndex = $state(0);
  onMount(() => {
    const interval = setInterval(() => {
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    }, 5000);

    return () => clearInterval(interval);
  });

  const typewriter = (node: HTMLElement, { speed = 1 }) => {
    const text = node.textContent || "";
    const duration = text.length / (speed * 0.01);

    return {
      duration,
      tick: (t: number) => {
        const i = Math.trunc(text.length * t);
        node.textContent = text.slice(0, i);
      },
    };
  };
</script>


{#key currentRoleIndex}
  <span in:typewriter={{ speed }} out:typewriter={{ speed: speed * 4 }}>
    {roles[currentRoleIndex].data.content[lang].content}
  </span>
{/key}
