<script>
  import IssueCard from '../IssueCard.svelte';

  let { name, color, issues } = $props();
</script>

<div class="flex-1 p-4 border-r border-gray-300" style="background-color: {color}10;">
  <h2 class="text-lg font-bold mb-4">{name}</h2>
  {#each issues as issue (issue.id)}
    <IssueCard issue={issue} />
  {/each}
</div>