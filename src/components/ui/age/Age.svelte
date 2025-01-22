<script>
  import { onMount } from 'svelte';

  let age = calculateAge();

  function calculateAge() {
    const birthDate = new Date(2003, 10, 7); // Month is 0-indexed
    const now = new Date();
    const ageInMilliseconds = now - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears.toFixed(4);
  }

  onMount(() => {
    const interval = setInterval(() => {
      age = calculateAge();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  });
</script>

<p>Your age is: {age} years</p>
