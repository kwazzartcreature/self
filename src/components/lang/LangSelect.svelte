<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";

  interface Props {
    lang: string;
    currentPath: string;
  }

  let { lang, currentPath }: Props = $props();

  const langs = [
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" },
  ];

  let currentLang = $state(langs.find((l) => l.value === lang)?.value ?? "en");

  const triggerContent = $derived(
    langs.find((l) => l.value === currentLang)?.value
  );
</script>

<Select.Root
  name="lang"
  onSelectedChange={(e) => {
    if (currentLang === e?.value) return;
    const prevLang = currentLang;

    currentLang = e?.value as string;

    if (currentLang === "en") {
      const finalPath = currentPath.replace(`/${prevLang}`, "");
      history.pushState({}, "", finalPath);
      window.location.href = finalPath;
    } else {
      history.pushState({}, "", `/${currentLang}${currentPath}`);
      window.location.href = `/${currentLang}${currentPath}`;
    }
  }}
>
  <Select.Trigger class="text-lg px-2 w-[90px]">
    {triggerContent}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      {#each langs as lang}
        <Select.Item value={lang.value} label={lang.label}>
          {lang.label}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
