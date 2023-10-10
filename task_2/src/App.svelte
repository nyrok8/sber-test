<script lang="ts">
  import { onMount } from "svelte";
  import { codes } from "../public/codes";
  import { getExchangeRate } from "../public/api";

  $: base = {
    code: "USD",
    value: 1,
  };

  $: target = {
    code: "EUR",
    value: 1,
  };

  $: rate = 1;

  async function changeRate() {
    rate = await getExchangeRate(base.code, target.code);
    target.value = base.value * rate;
  }

  onMount(changeRate);
</script>

<main>
  <div class="card">
    <select bind:value={base.code} on:change={changeRate}>
      {#each codes as code}
        <option value={code}>{code}</option>
      {/each}
    </select>
    <input
      type="number"
      min="0"
      bind:value={base.value}
      on:input={() => {
        target.value = base.value * rate;
      }}
    />
  </div>

  <div class="card">
    <select bind:value={target.code} on:change={changeRate}>
      {#each codes as code}
        <option value={code}>{code}</option>
      {/each}
    </select>
    <input
      type="number"
      min="0"
      bind:value={target.value}
      on:input={() => {
        base.value = target.value / rate;
      }}
    />
  </div>
</main>

<style>
</style>
