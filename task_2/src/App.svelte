<script lang="ts">
  import { writable } from "svelte/store";
  import type { Writable } from "svelte/store";
  import { onMount } from "svelte";
  import { codes } from "../public/codes";
  import { getExchangeRate } from "../public/api";

  const base: Writable<string> = writable("USD");
  const target: Writable<string> = writable("EUR");

  const baseValue: Writable<number> = writable(1);
  const targetValue: Writable<number> = writable(1);

  const rate: Writable<number> = writable(1);

  onMount(async () => {
    rate.set(await getExchangeRate($base, $target));
    targetValue.set($baseValue * $rate);
  });

  async function handleChange(e: Event, param: Writable<string>) {
    param.set((e.target as HTMLInputElement).value);
    rate.set(await getExchangeRate($base, $target));
    targetValue.set($baseValue * $rate);
  }

  function handleValueChange(e: Event, paramValue: Writable<number>) {
    paramValue.set(parseFloat((e.target as HTMLInputElement).value));
    switch (paramValue) {
      case baseValue:
        targetValue.set($baseValue * $rate);
        break;
      case targetValue:
        baseValue.set($targetValue / $rate);
        break;
      default:
        break;
    }
  }
</script>

<main>
  <div class="card">
    <select bind:value={$base} on:change={(e) => handleChange(e, base)}>
      {#each codes as code}
        <option value={code}>{code}</option>
      {/each}
    </select>
    <input
      type="number"
      min="0"
      value={$baseValue}
      on:input={(e) => handleValueChange(e, baseValue)}
    />
  </div>

  <div class="card">
    <select bind:value={$target} on:change={(e) => handleChange(e, target)}>
      {#each codes as code}
        <option value={code}>{code}</option>
      {/each}
    </select>
    <input
      type="number"
      min="0"
      value={$targetValue}
      on:input={(e) => handleValueChange(e, targetValue)}
    />
  </div>
</main>

<style>
</style>
