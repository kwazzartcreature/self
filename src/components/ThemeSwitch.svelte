<script lang="ts">
  import { onMount } from "svelte";
  import Moon from "../assets/icons/Moon.svelte";
  import Circle from "../assets/icons/Circle.svelte";
  import Sun from "../assets/icons/Sun.svelte";

  let mount = $state(false);
  let theme = $state("");

  onMount(() => {
    theme = localStorage.getItem("theme") ?? "light";
    mount = true;
  });

  const setTheme = (newTheme: string) => {
    theme = newTheme;
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document?.documentElement.classList.add("dark");
    } else {
      document?.documentElement.classList.remove("dark");
    }
  };

  const handleThemeToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
</script>

{#if !mount}
  <Circle size={24} />
{:else}
  <button onclick={handleThemeToggle}>
    <div class="hover:text-primary transition">
      {#if theme === "dark"}
        <Sun />
      {:else}
        <Moon />
      {/if}
    </div>
  </button>
{/if}
