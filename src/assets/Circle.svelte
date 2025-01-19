<script lang="ts">
  interface Props {
    size?: number;
    width?: number;
    height?: number;
  }

  let { width = 24, height = 24, size }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size || width}
  height={size || height}
  viewBox="0 0 24 24"
  ><path fill="currentColor" d="M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2" /></svg
>
