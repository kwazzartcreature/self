<script lang="ts">
  import { onMount } from "svelte";

  let age = $state(calculateAge());

  function calculateAge() {
    const birthDate = new Date(2003, 10, 7);
    const now = new Date();
    const ageInMilliseconds = now.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears.toFixed(6);
  }

  onMount(() => {
    const interval = setInterval(() => {
      age = calculateAge();
    }, 20000);

    return () => clearInterval(interval);
  });
</script>

<p>({age} y.o.)</p>
