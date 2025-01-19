<script lang="ts">
  import { onMount } from "svelte";
  import Moon from "../assets/Moon.svelte";
  import Circle from "../assets/Circle.svelte";
  import Sun from "../assets/Sun.svelte";

  let body: HTMLElement | null = null;
  let mount = $state(false);
  let theme = $state("");

  onMount(() => {
    theme = getTheme();
    setTheme(theme);
    mount = true;
  });

  const getTheme = () => {
    const localStorageTheme = localStorage.getItem("theme") ?? "";
    if (["dark", "light"].includes(localStorageTheme)) {
      return localStorageTheme;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  };

  const setTheme = (newTheme: string) => {
    theme = newTheme;
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      body?.classList.add("dark");
    } else {
      body?.classList.remove("dark");
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

<svelte:body bind:this={body} />

{#if !mount}
  <Circle size={20} />
{:else}
  <button onclick={handleThemeToggle}>
    <div>
      {#if theme === "dark"}
        <Sun />
      {:else}
        <Moon />
      {/if}
    </div>
  </button>
{/if}
