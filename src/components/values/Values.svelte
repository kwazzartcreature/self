<script lang="ts">
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import * as Carousel from "$lib/components/ui/carousel";
  import * as Card from "$lib/components/ui/card/index.js";
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress";

  interface Props {
    lang: "en" | "ru";
    values: any[];
  }

  let { values, lang }: Props = $props();

  let emblaApi: CarouselAPI | undefined = $state();

  let interval: ReturnType<typeof setInterval> | null = null;
  let timeInterval: ReturnType<typeof setInterval> | null = null;

  const maxTimeSeconds = 10;
  let timeSeconds = $state(0);

  function resetInterval() {
    timeSeconds = 0;
    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      timeSeconds = 0;
      if (emblaApi) emblaApi.scrollNext();
    }, maxTimeSeconds * 1000);
  }

  $effect(() => {
    emblaApi?.on("select", () => {
      resetInterval();
    });
  });

  onMount(() => {
    resetInterval();

    timeInterval = setInterval(() => {
      timeSeconds++;
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
      if (timeInterval) clearInterval(timeInterval);
    };
  });
</script>

<Carousel.Root
  bind:api={emblaApi}
  opts={{
    align: "start",
    loop: true,
  }}
  class="mx-auto w-4/5"
>
  <Carousel.Content class="basis-1/3 flex items-center">
    {#each values as value, i (value.id)}
      <Carousel.Item>
        <div>
          <Card.Root>
            <Card.Content class="flex items-center justify-center p-6">
              <span class="text-xl font-semibold"
                >{value.data.content[lang].content}</span
              >
            </Card.Content>
          </Card.Root>
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>

  <Carousel.Previous />

  <Carousel.Next />

  <!-- <Button onclick={handlePrevClick}><ChevronRight class="rotate-180" /></Button> -->

  <!-- <Button onclick={handleNextClick}><ChevronRight /></Button> -->

  <Progress value={timeSeconds} max={maxTimeSeconds} />
</Carousel.Root>
