<script lang="ts">
  interface Props {
    lang: string;
    currentPath: string;
  }

  let { lang, currentPath }: Props = $props();

  const langs = [
    { value: "en", label: "EN" },
    { value: "ru", label: "RU" },
  ] as const;

  let currentLang = $state(langs.find((l) => l.value === lang)?.value ?? "en");

  function handleLanguageChange(newLang: "en" | "ru") {
    if (currentLang === newLang) return;

    const prevLang = currentLang;
    currentLang = newLang;

    if (newLang === "en") {
      const finalPath = currentPath.replace(`/${prevLang}`, "");
      history.pushState({}, "", finalPath);
      window.location.href = finalPath;
    } else {
      history.pushState({}, "", `/${newLang}${currentPath}`);
      window.location.href = `/${newLang}${currentPath}`;
    }
  }
</script>

<div class="flex items-center gap-x-1 select-none">
  {#each langs as { value, label }}
    <button
      class="px-2 py-1 rounded transition-colors {currentLang === value
        ? 'text-primary font-bold'
        : 'hover:text-primary/80'}"
      onclick={() => handleLanguageChange(value)}
    >
      {label}
    </button>
    {#if value === "en"}
      <span class="text-muted-foreground">|</span>
    {/if}
  {/each}
</div>
