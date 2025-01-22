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
    if (timeInterval) {
      clearInterval(timeInterval);
      timeInterval = setInterval(() => {
        timeSeconds += 2.5;
      }, 2500);
    }

    interval = setInterval(
      () => {
        timeSeconds = 0;
        if (emblaApi) emblaApi.scrollNext();
      },
      maxTimeSeconds * 1000 + 500
    );
  }

  $effect(() => {
    emblaApi?.on("select", () => {
      resetInterval();
    });
  });

  onMount(() => {
    resetInterval();

    timeInterval = setInterval(() => {
      timeSeconds += 2.5;
    }, 2500);

    return () => {
      if (interval) clearInterval(interval);
      if (timeInterval) clearInterval(timeInterval);
    };
  });
</script>

<div class="w-[calc(100vw-100px)] md:w-full mx-auto">
  <Carousel.Root
    bind:api={emblaApi}
    opts={{
      align: "start",
      loop: true,
    }}
    class="mx-auto md:w-4/5 max-w-md"
  >
    <Carousel.Content class="flex items-center">
      {#each values as value (value.id)}
        <Carousel.Item>
          <Card.Root class="md:w-full mx-auto">
            <Card.Content class="flex items-center justify-center md:p-6">
              <span class="text-lg md:text-xl font-semibold"
                >{value.data.content[lang].content}</span
              >
            </Card.Content>
          </Card.Root>
        </Carousel.Item>
      {/each}
    </Carousel.Content>

    <Progress value={timeSeconds} max={maxTimeSeconds} />

    <Carousel.Previous />

    <Carousel.Next />
  </Carousel.Root>
</div>
