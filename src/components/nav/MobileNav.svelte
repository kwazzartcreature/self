<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Menu } from "lucide-svelte";
  import { checkPath } from "./utils";

  interface Props {
    lang: string;
    currentPath: string;
    hrefs: string[];
  }
  let { lang, currentPath, hrefs }: Props = $props();

  const check = (path: string) => {
    return checkPath(lang, currentPath, path);
  };
</script>

<Dialog.Root>
  <Dialog.Trigger><Menu /></Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Description>
        <nav>
          <ul class="text-2xl">
            {#each hrefs as href}
              {@const content = href.split("/")}
              <li class={check(href) ? "underline" : ""}>
                <a {href}> {content.at(content.length - 2) || "about"} </a>
              </li>
            {/each}
          </ul>
        </nav>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
